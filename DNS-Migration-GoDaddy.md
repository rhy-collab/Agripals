# Moving agripals.com off Cloudflare → GoDaddy (DNS) + Vercel (site) + Google Workspace (email)

End state: GoDaddy hosts the DNS, Vercel keeps serving the website, Google Workspace keeps handling email. Cloudflare goes away entirely.

## Step 1 — Add these records in GoDaddy's DNS manager (Domain Settings → DNS → Records)

Do this first, before touching nameservers. Cloudflare is still live at this point so nothing changes for visitors yet — you're just pre-loading GoDaddy with the same setup.

**Website (Vercel):**
- Type CNAME, Name `www`, Value `76a0adfa5200b599.vercel-dns-017.com`
- Type CNAME, Name `@` (root), Value `76a0adfa5200b599.vercel-dns-017.com`
  - If GoDaddy won't let you put a CNAME on the root, use an A record instead: Type A, Name `@`, Value `76.76.21.21`

**Email (Google Workspace) — five MX records, all Name `@`:**
- Priority 1 → `aspmx.l.google.com`
- Priority 5 → `alt1.aspmx.l.google.com`
- Priority 5 → `alt2.aspmx.l.google.com`
- Priority 10 → `alt3.aspmx.l.google.com`
- Priority 10 → `alt4.aspmx.l.google.com`

**Email verification/security TXT records:**
- Type TXT, Name `@`, Value `google-site-verification=NvOe1fowJZHjdZN3o7FQmma8-HW9359xQfPlWlPbudU`
- Type TXT, Name `@` (SPF) — use this instead of the old Cloudflare one: `v=spf1 include:_spf.google.com ~all`
  (Your current SPF points at a Cloudflare-hosted flattening service — it'll likely break once Cloudflare's gone, so switch to Google's own record.)
- Type TXT, Name `_dmarc`, Value `v=DMARC1; p=quarantine; adkim=r; aspf=r; rua=mailto:dmarc_rua@onsecureserver.net;`
- Type TXT, Name `google._domainkey`, Value (one continuous string, no line breaks):
  `v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArmdrB+axxMTRtBlN+4Tgdba7TmO1A2cUJQ18/WjEcffF+URt6h5YyteXMBWLC8C3BKfnpHWiyNXwhNAYDLgNKLDexSA21+TyutCbnaof1i/4HV8hj/RQzGw/V3ksP104gjXy0QJ6bdnHfwNdSg/Q0AyWnei/1efh6K1l3zb7OQ0uC+ekpxp6uZHPA0tFN9+HjeDmoQGJ4fBiS164BT4448ZbqVUT/amvYlGBQUIr6LIeDw6/bR1pPH00zgfkmmaltzV6vofmqQPVZ5HWt+t5vSkV4ODwpNYaxwUxn0Zjn+o3m7zj2u5TEoJp6sTlWtqq7z6htINHyCnpkYGFUXXUkwIDAQAB`

Skip `_domainconnect` — GoDaddy manages that itself once it's authoritative again.

## Step 2 — Double-check the records saved correctly

Reload the GoDaddy DNS page and confirm all of the above show up as entered (GoDaddy sometimes wraps long TXT values — check nothing got truncated, especially the DKIM key).

## Step 3 — Switch nameservers

In GoDaddy: Domain Settings → Nameservers → change from Cloudflare's (`holly.ns.cloudflare.com`, `jay.ns.cloudflare.com`) to GoDaddy's default nameservers. This is the actual cutover. It can take anywhere from a few minutes to ~48 hours to fully propagate.

## Step 4 — Verify

Once it's propagated: check the site loads at agripals.com and www.agripals.com, and send/receive a test email through info@agripals.com.

## Step 5 — Remove Cloudflare

Remove agripals.com from your Cloudflare account, then cancel/close the Cloudflare account itself.
