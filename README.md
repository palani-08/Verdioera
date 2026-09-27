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

The RFQ form posts to **Web3Forms**, which emails each submission to your inbox. **No
backend code.** Free tier covers 250 enquiries/month.

**One-time setup (2 minutes):**

1. **Get a Web3Forms access key:** open https://web3forms.com → enter the email you want
   enquiries at → copy the access key from the email it sends you.
2. **Add it to the site:** in [`index.html`](index.html), search for
   `WEB3FORMS_ACCESS_KEY` (top of the `<script>`, under `CONFIG`) and paste your key.
   Commit and push.
3. **Set the recipient email** (optional — it defaults to `Info@verdioera.com`):
   Amplify console → app → **App settings → Environment variables** → add
   `RFQ_EMAIL = Info@verdioera.com` → **Save → Redeploy**. Do not edit the file for this —
   the build substitutes it automatically (see [`amplify.yml`](amplify.yml)).

Every RFQ then arrives as an email with Name, Company, Email, Phone, Product, Quantity
and Requirement, subject `New RFQ — Verdioera website`.

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
7. Submit a **test RFQ** — it arrives at `Info@verdioera.com` (or your `RFQ_EMAIL` env var
   value) within seconds. No activation click needed.
8. **Attach the client's domain:** under **Hosting → Custom domains** add
   **verdioera.com** (and `www.verdioera.com`), then set the DNS records your registrar
   asks for (usually a CNAME to the Amplify URL).

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