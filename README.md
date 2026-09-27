# Verdioera — Static HTML Website

**Better Materials. Better Everyday Products.**

A single-file, self-contained HTML website for **Verdioera Sustainable Solutions** — a
manufacturing-led B2B business making paper packaging, tissue & hygiene products, thermal
rolls, food packaging and next-generation biodegradable products.

- **One file:** [`index.html`](index.html) — HTML5 + inline CSS + vanilla JS, with all
  imagery embedded as base64 data URIs. No frameworks, no build step, no server.
- **Hosted on:** AWS Amplify (see below).

---

## How enquiries reach you (RFQ form)

The RFQ form posts to **FormSubmit**, which emails each submission to your inbox. **No
backend code.**

1. In [`index.html`](index.html), search for `RFQ_EMAIL` (top of the `<script>` block,
   under `CONFIG`) and set it to your inbox — that's the **only** thing to change.
2. After deploying, submit one test RFQ. FormSubmit emails a one-time **activation link**
   to that inbox — click it once.
3. From then on, every RFQ arrives there as a formatted email (subject
   `New RFQ — Verdioera website`) with Name, Company, Email, Phone, Product, Quantity
   and Requirement.

---

## Deploy a new app on AWS Amplify (do this fresh)

1. Push this repo to GitHub (`main` branch).
2. **AWS Amplify console** → **Create new app** → **Host web app** → **GitHub**.
3. Authorize GitHub if prompted → choose **palani-ND/simply-paper-website** → branch **main**.
4. Amplify reads [`amplify.yml`](amplify.yml) from the repo. Keep it as-is — it performs
   **no build** and serves the repo root, so `index.html` is the site. (If the "App build
   specification" radio appears, leave it on **Resolved from amplify.yml**.)
5. Click **Create app / Save and deploy**. The first build takes ~1 minute.
6. Open the generated URL (e.g. `https://main.dxxxxxxxx.amplifyapp.com`).
7. Submit a **test RFQ**, then click the **FormSubmit activation link** in your inbox.
8. Optional: attach your domain under **Hosting → Custom domains**.

---

## Local preview

```bash
python3 -m http.server 8080    # open http://localhost:8080
```

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The entire website (site + styles + JS + embedded images) |
| `amplify.yml` | Amplify build spec — no build, serves repo root |
| `README.md` | This file |
| `.gitignore` | Minimal ignores |