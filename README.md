# Verdioera — Static HTML website

**Better Materials. Better Everyday Products.**

A single-file, self-contained HTML website for **Verdioera Sustainable Solutions** — a
manufacturing-led B2B business making paper packaging, tissue & hygiene products, thermal
rolls, food packaging and next-generation biodegradable products. The site is plain HTML5 +
CSS + vanilla JS. **No frameworks, no build step, no server.**

---

## Spec

### Stack
- One file: `index.html` at the repo root.
- Inline CSS (design tokens, responsive layout) and inline vanilla JS.
- All imagery is embedded as base64 data URIs — the site has zero external asset dependencies and never shows a broken image.
- Hosts anywhere static files are served (Vercel, Netlify, GitHub Pages, AWS S3, any web server).

### Page sections
| Section | What it does |
| --- | --- |
| Header / nav | Fixed nav with anchor links + "Contact" CTA |
| Hero | Brand statement, tagline, primary/secondary CTAs |
| Problem | The market problem in 4 cards |
| Manufacturing | "Manufacturer first" differentiator with 3 promises |
| Products | 10 product families in a horizontal-scroll row; each family has expandable sub-products and a "Request a quote →" link that preselects the RFQ product |
| Manufacturing flow | 5-step material → B2B supply diagram |
| RFQ / Request for quotation | Working enquiry form (see below) |
| Cost calculator | Indicative quantity × rate calculator feeding the RFQ CTA |
| Partner | 3 partnership categories |
| FAQ | 10 questions using native `<details>/<summary>` |
| Social | 4 social card placeholders |
| CTA / Contact | "Start a conversation" mailto link |
| Footer | Brand + tagline |
| Quick Chat | Floating widget with links to products, RFQ, calculator, email, partnerships |

### Product families
Paper Bags · Custom Printed & Premium Bags · Tissue & Hygiene Products · Billing &
Thermal Rolls · Food Packaging Essentials · Table & Kitchen Rolls · Biodegradable Cutlery ·
Bagasse Tableware · Paddy Husk Products · Edible Products · Areca Products

### Enquiry workflow (the form actually works)
The RFQ form posts to **FormSubmit** (`https://formsubmit.co/ajax/business@verdioera.com`)
using its client-side AJAX endpoint, so enquiries reach an inbox with **no backend code**:

1. First submission triggers a one-time **activation email** from FormSubmit — click it to
   confirm `business@verdioera.com` and enable delivery.
2. After that, every RFQ lands in that inbox as a table-formatted email with the subject
   `New RFQ — Verdioera website`.
3. The form has a loading state ("Sending…"), a success message, and an error fallback that
   directs the visitor to `business@verdioera.com`.

> **To change the receiving inbox:** replace `business@verdioera.com` in the
> `fetch('https://formsubmit.co/ajax/…')` call inside the `<script>` block of `index.html`
> (search for `formsubmit`). Re-confirm the activation email the first time it is used.
> Other form backends (Web3Forms, Formspree, a CRM/webhook) can be swapped in by editing
> the same fetch call — the rest of the form logic stays the same.

### Rate limiting / spam notes
- HTML-only site has no server-side rate limiting or honeypot.
- FormSubmit provides basic anti-spam/captcha options (`_captcha`, `_honeypot`, `_template`)
  that can be added as `FormData` entries in the submit handler if spam becomes an issue.

---

## Plan

- **Phase 1 — Replace** the legacy Next.js app. The old codebase and its BRD/PRD docs are
  archived (not deleted) under [`_archive/legacy-nextjs/`](_archive/legacy-nextjs/).
- **Phase 2 — Site** — bring the single-page Verdioera HTML into the repo as `index.html`.
- **Phase 3 — Enquiries** — wire the RFQ form to a real delivery channel (FormSubmit) with
  loading / success / error states.
- **Phase 4 — Docs** — rewrite this README as the spec, plan and task list.
- **Phase 5 — Verify** — confirm the page renders and the form posts correctly.
- **Phase 6 — Deploy** — push to GitHub and import into a static host. No environment
  variables are required.

---

## Task list

- [x] Archive legacy Next.js app under `_archive/legacy-nextjs/`
- [x] Add `index.html` (Verdioera single-page site) at repo root
- [x] Give every RFQ field a `name` attribute for the form backend
- [x] Wire RFQ form to FormSubmit → emails `business@verdioera.com`
- [x] Add loading, success and error states to the RFQ form
- [x] Rewrite README as spec + plan + tasks
- [x] Verify `index.html` loads and the inline JS parses
- [ ] Owner: confirm the FormSubmit activation email (first test submission)
- [ ] Owner: point the social card placeholders at live profiles
- [ ] Deploy to a static host and run a live end-to-end RFQ test

---

## Run / deploy

There is nothing to build or install:

```bash
# local preview (any static server)
python3 -m http.server 8080     # then open http://localhost:8080
# or
npx serve .
```

### AWS Amplify (console)

1. Push this repo to GitHub (`main` branch).
2. Amplify console → **Create new app** → **Host web app** → **GitHub**, pick this repository and the `main` branch.
3. Amplify auto-detects [`amplify.yml`](amplify.yml). Keep it as-is — it performs **no build** and serves the repo root, so `index.html` is the site.
4. Create the app, then under **Hosting → Custom domains** attach your domain. Until then, the site is live on Amplify's default domain (`https://main.<branch-id>.amplifyapp.com`).
5. Submit a test RFQ on the live site and confirm the FormSubmit activation email arrives at `business@verdioera.com` (see "Enquiry workflow" above).

### Any static host

Serve the repo root. No build command, no environment variables.
