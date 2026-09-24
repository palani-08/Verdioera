# Simply Paper — corporate website

**Better Materials. Better Everyday Products.**

This is the B2B website for Simply Paper, a manufacturing-led business making paper bags, tissue, hygiene products, thermal rolls and kitchen rolls, with an innovation pipeline of alternative-material products. The site builds credibility, presents the catalogue and turns visits into qualified enquiries. It is **not** an e-commerce store.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, React Hook Form, Zod and Lucide.

---

## Quick start

```bash
npm install
cp .env.example .env.local      # then edit values
npm run dev                     # http://localhost:3000
```

To try the enquiry form locally without an email provider, set `ENQUIRY_DEV_LOG=true` in `.env.local`. Submissions are then printed to the terminal, and the success screen says clearly that nothing was emailed.

### Scripts

| Command             | Purpose                        |
| ------------------- | ------------------------------ |
| `npm run dev`       | Development server             |
| `npm run build`     | Production build               |
| `npm start`         | Serve the production build     |
| `npm run lint`      | ESLint (Next.js + TypeScript)  |
| `npm run typecheck` | `tsc --noEmit`                 |

---

## Project structure

```
src/
  app/                      Routes (server components by default)
    page.tsx                Home
    about/ products/ products/[slug]/ innovation/ manufacturing/
    industries/ build-with-us/ contact/ privacy/ terms/
    api/enquiry/route.ts    Enquiry API (validation, spam checks, rate limit, delivery)
    sitemap.ts robots.ts opengraph-image.tsx icon.svg
  components/
    ui/                     Design system primitives (Container, Section, Button, typography, StatusBadge, Pending)
    layout/                 Header, mobile navigation (native <dialog>), footer, logo
    sections/               Page building blocks (PageHero, CtaBand, cards, PhilosophySteps…)
    media/                  MediaFrame + illustrated ProductArt
    forms/                  EnquiryForm (client) and Field
    products/               Catalogue with industry filter (client)
  lib/
    config/company.ts       ← All business facts (contact, facility, legal). Unconfirmed = null.
    config/site.ts          Site URL, navigation, indexing flag
    data/                   products, innovation, industries, services, enquiry options
    validation/enquiry.ts   Shared Zod schema (client + server)
    server/                 Enquiry delivery (Resend / webhook) and rate limiter
    seo.ts                  Metadata + JSON-LD helpers
```

Only interactive parts are client components: the header's active link state, the mobile menu, the catalogue filter and the enquiry form.

---

## Content and configuration

### Business information: `src/lib/config/company.ts`

Every business fact lives here. Anything not yet confirmed is `null` or an empty array, and **nothing is ever faked**:

- In production, `null` values are simply hidden. For example, the footer shows only "Send an enquiry" until an email or phone number is set.
- On staging, set `NEXT_PUBLIC_SHOW_CONTENT_PLACEHOLDERS=true`. Each missing item then shows a dashed "To confirm: …" chip naming the file to edit.

Fields: legal name, email, phone, WhatsApp, address, hours, social profiles, manufacturing model, locations, capacity statement, quality process, certifications, and legal review status and retention period.

### Products: `src/lib/data/products.ts`

Each product has an overview, applications, related industries, customisation options, an optional compliance note, SEO copy and a visual.

- `specifications` is **empty on purpose**. Until Quality verifies values, the page lists `specParameters` (for example "Roll width") as "Confirmed at quotation". Add `{ label, value }` rows once they are approved, and the page switches to a specification table automatically.
- Never add prices, stock status, capacities or certifications here.

### Innovation: `src/lib/data/innovation.ts`

All four items have `status: "under-development"` and appear with an "Under Development" badge everywhere. Keep claims (biodegradability, compostability, food safety) out of the copy until testing and certification are approved.

### Industries and services

`industries.ts` maps each sector to relevant products and pipeline items. `services.ts` defines the five Build With Us offers and the enquiry type each one preselects.

### Imagery

Photos of Simply Paper's own products were not available, so every visual is currently a flat, brand-palette **illustration** (`components/media/product-art.tsx`). This means the site never shows broken images or misleading stock photos. To switch to licensed photography:

1. Add the optimised files to `public/images/products/`. Use a 4:5 ratio for cards and 4:3 or wider for heroes.
2. Add an `image` to the item's `visual`:

   ```ts
   visual: {
     art: "paper-bags",
     artAlt: "…",
     image: { src: "/images/products/paper-bags.jpg", alt: "Kraft paper bags with twisted handles", width: 2400, height: 3000, credit: "Photo: …, licensed to Simply Paper" },
   }
   ```

`MediaFrame` then serves it through `next/image`, in AVIF or WebP at responsive sizes.

---

## Enquiry workflow

`/contact` accepts `?type=`, `?product=` and `?industry=` so that every CTA preselects the right options. For example, product pages link to `/contact?type=quote&product=thermal-rolls#enquiry`.

**Client side:** React Hook Form with the shared Zod schema. It shows inline errors with `aria-invalid` and `aria-describedby`, and focuses the first invalid field. There is a loading state, an error alert that keeps what the user typed, and a success screen with a reference number. Expected quantity is optional for general, innovation and development enquiries.

**Server side** (`src/app/api/enquiry/route.ts`):

1. Same-origin check (403) and JSON-only requests (415)
2. IP rate limit of 5 requests per 10 minutes (429 with a `Retry-After` header)
3. Body size limit of 16 KB (413)
4. Honeypot field and a minimum fill time of 3 seconds. Bots get a fake success, and nothing is delivered.
5. Zod re-validation (422 with field errors)
6. Delivery with a reference, timestamp, source page, product and consent record

**Delivery channels.** Configure one or both:

| Channel | Variables | Notes |
| --- | --- | --- |
| Email (Resend) | `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL` | `reply_to` is set to the customer. The sender domain must be verified in Resend. |
| Webhook | `ENQUIRY_WEBHOOK_URL`, `ENQUIRY_WEBHOOK_SECRET` | JSON POST for a CRM, Zapier, Make or n8n |

If neither is configured, the contact page shows an honest "Online enquiries aren't connected yet" notice, the submit button is disabled, and the API returns 503. The site never pretends an enquiry was sent.

To use a different email provider, replace `sendWithResend` in `src/lib/server/enquiry-delivery.ts`. The rest of the flow stays the same.

> **Rate limiting note:** the limiter keeps its state in memory for each server instance. On serverless or multi-instance hosting, back it with a shared store such as Upstash Redis for strict limits. The API is in `src/lib/server/rate-limit.ts`.

---

## SEO and accessibility

- Unique titles and descriptions on every page, canonical URLs, Open Graph and Twitter cards, and generated OG images (a site-wide one plus one per product)
- `sitemap.xml` and `robots.txt`. `NEXT_PUBLIC_ALLOW_INDEXING=false` blocks indexing on staging.
- JSON-LD: an Organization on the homepage (only configured fields) and a BreadcrumbList on product pages
- Semantic landmarks, a skip link, one `h1` per page, and visible focus rings
- The mobile menu uses the native modal `<dialog>`: focus stays inside, Escape closes it, and focus returns to the button
- Motion is limited to a short fade-in on load and hover transitions, and is turned off under `prefers-reduced-motion`
- Brand text colours meet WCAG AA. Sage and kraft are used only for surfaces and decoration.
- Security headers: `nosniff`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` and HSTS. `X-Powered-By` is removed.

---

## Deployment

**Vercel (recommended)**

1. Import the repository into Vercel.
2. Add the environment variables from `.env.example` for Production. Add them for Preview too, with `NEXT_PUBLIC_ALLOW_INDEXING=false`.
3. Deploy, then submit a test enquiry and confirm it reaches the sales inbox.

**Any Node host**

```bash
npm ci && npm run build && npm start   # serves on port 3000 (override with PORT)
```

Put it behind HTTPS. The rate limiter reads `x-forwarded-for`, so make sure your proxy sets it.

---

## Before launch: still needed from the business

- [ ] Logo files (the current mark is a placeholder), and the confirmed domain for `NEXT_PUBLIC_SITE_URL`
- [ ] Contact details: sales email, phone, WhatsApp, address and hours (`company.ts`)
- [ ] Legal entity name
- [ ] Manufacturing model (owned, contract or hybrid), locations, and whether a capacity statement may be published
- [ ] Certifications actually held and approved for publication
- [ ] Verified specifications and customisation options for each product
- [ ] Licensed product photography
- [ ] An email provider (Resend account with a verified sending domain) and/or a CRM webhook, plus the authorised sales inbox
- [ ] Privacy policy and terms reviewed by counsel, with the retention period set. Then set `company.legal.reviewed = true`.
- [ ] An analytics provider (privacy-appropriate), if wanted. Update the privacy policy to match.
- [ ] Company story, founders and history for the About page, if leadership wants them published
