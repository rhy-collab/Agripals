# Agripals — Restaurant Automation

**Read this first if you're an agent/bot picking up this product.** It is the source of truth for the Restaurant Automation line of Agripals. If anything in the local checkout contradicts this file, trust this file and ask Rhys.

---

## 1. What this product is

Agripals **Restaurant Automation** is a separate product from the core Agripals wholesale business.

- **Core Agripals** (`/` — the homepage) = farm-direct wholesale. Chefs text us, we supply product. Positioning: *Fresher. Cheaper. No Middleman.*
- **Restaurant Automation** (`/automation`) = an **AI back office for restaurants**. The chef texts photos of invoices, deliveries, stock and waste. We read them and turn them into answers about ordering, spend, price movements, cash flow, waste and food-chain traceability.

**One-liner:** *Text us a photo of any invoice — we'll do the rest.*

**Why it exists:** restaurants don't fail because the food is bad. They fail because nobody has time to look at the numbers until it's too late. This product removes the paperwork barrier between a chef and their own numbers.

**Who it's for:** independent restaurant owners/head chefs, ~20–80 covers, no finance team, currently doing invoices in a shoebox or a spreadsheet and reconciling at quarter end.

**The wedge is SMS.** No app, no portal, no onboarding, no migration. If they can text a photo, they're live. Never design a flow that requires installing software.

---

## 2. Where it lives

| Thing | Path / URL |
|---|---|
| Live page | https://agripals.com/automation |
| Source | `automation.html` (repo root, single self-contained file) |
| Codex's richer original | `automation-codex.html` (kept for reference — chat mockup, spend-alert cards) |
| Earlier simple draft | `automation-alt.html` |
| Deploy | push to `main` on `rhy-collab/agripals` → auto-deploys |

`automation.html` is **one file** — inline `<style>`, inline `<script>`, lucide from CDN, Inter from Google Fonts. Keep it that way. No build step, no framework, no bundler for this page.

---

## 3. Design system (non-negotiable)

This page deliberately mirrors the Agripals homepage. Rhys signed off on the hero as "perfect" — **do not redesign the first screen.**

**Colours**
```
--green  #078539   brand green (headings accents, active dot, icon chips at #eaf6ee)
--ink    #0b1326   near-black text + buttons
--muted  #64738b   secondary text
--line   #dfe5ef   hairlines, input underline
underline accent   #83efa8   (3px, offset 6px, under key words)
dark band bg       #0f2a1b
```

**Type** — Inter (400–800) only. Giant numerals: weight 800, tracking `-.075em`, line-height `.84`. Section headings: weight 800, tracking `-.045em`. Body: weight 500, `--muted`.

**Rules**
- Square corners on buttons (ink background, white text). Never rounded pills.
- Inputs are **underline only** — 3px bottom border, no box, no background.
- lucide line icons only. **No emojis, no gradients, no glassmorphism, no drop shadows** beyond the button's subtle one.
- Generous whitespace. Hairline dividers between sections. White background; one dark green band for rhythm.
- Never change **"TEXT US"** or the homepage line **"Fresher. Cheaper. No Middleman."**

**Voice** — short, confident, chef-to-chef. Like texting a mate. No corporate SaaS language, no "leverage/streamline/empower", no exclamation marks.

---

## 4. Page structure (current)

**First screen (locked — 100svh, no scroll):**
1. Header: leaf + `Agripals` in green, right side quiet label `Restaurant Automation`
2. Rotating stat (giant numeral) + thing + muted unit, with dash-dot indicators
3. Claim: `Automate your **operations.**` (green, underlined)
4. Hairline → phone input + `TEXT US` → note: *"Text us a photo of any invoice — we'll do the rest."*
5. Faint fish + apple watermark icons, right side

The rotating stats live in the `ITEMS` array in the inline script — edit there:
```js
{ stat:'5%',   thing:'Saved on supply.',    unit:'last month' }
{ stat:'↑8%',  thing:'Salmon flagged.',     unit:'before the invoice' }
{ stat:'12',   thing:'Invoice lines read.', unit:'from one photo' }
{ stat:'100%', thing:'Traceable.',          unit:'farm to plate' }
```

**Below the fold:**
6. **How it works** — 3 steps (Snap it → We read it → You get answers)
7. **What it handles** — 6 capability rows: price movements, invoices captured, food-chain traceability, weekly stock planning, waste & cash flow, QuickBooks-ready
8. **Dark green band** — "Photos and texts become: Labeled. Planned. Forecast. Followed up."
9. **Why it matters** — the pull-quote
10. **FAQ** — install, accountant, existing suppliers, data, cost
11. **Final CTA** — repeat phone capture
12. Footer with a link back to the wholesale homepage

---

## 5. Honesty rules (important)

This is a **real site for a real company that is pre-launch**. Do not invent social proof.

- ❌ No fake testimonials, customer quotes, restaurant names, or logos.
- ❌ No invented metrics presented as achieved results ("saved 400 restaurants $2M").
- ✅ Capability claims are fine ("we read every line item").
- ✅ Illustrative examples are fine when they read as examples, not case studies.
- Pricing is genuinely undecided — the FAQ says so honestly. Don't publish a price without Rhys.

---

## 6. What's built vs. not

**Built:** the landing page only. It is a static page; the forms show an inline confirmation and do not send anything anywhere.

**Not built:** everything behind it. There is no SMS pipeline, no invoice OCR, no database, no dashboard. Related groundwork that exists in this repo:
- `agripals-live/` — Next.js + Anthropic SDK app with restaurant/wholesaler chat agents and tool use (`lib/claude.js`). In-memory store only; still modelled on the older RFQ/bid flow.
- `docs/agripals-sms-first-order-flow.md` — SMS order-number + status-word spine (`2406200017 DELIVERED`).
- `backend-todo-rag-customer-db.md` — customer DB → conversation persistence → RAG roadmap.
- `ops/dev-dashboard-proposal.md` — ops dashboard routes.

---

## 7. Next steps (suggested order)

1. **Make the CTA real** — right now the phone field goes nowhere. Wire it to a form endpoint, an SMS provider, or at minimum an email/webhook so leads aren't lost.
2. **Get a number** — the whole product promise is "text us". Provision a real inbound number (Twilio or similar) before driving traffic here.
3. **Cross-link** — `/automation` is currently orphaned; nothing on the homepage points to it. Don't add a homepage link without Rhys's sign-off (the homepage is deliberately single-purpose).
4. **Invoice OCR spike** — one photo in, structured line items out. That's the whole demo.
5. **Then** persistence, dashboard, RAG — per the docs in §6.

---

## 8. Hard rules

- Don't redesign the first screen. It's signed off.
- Don't add a framework or build step to `automation.html`.
- Don't invent testimonials, customers, or results.
- Don't publish pricing without Rhys.
- Deploys happen only by committing to `main`. No CLI deploys, no tokens in the repo.
- Don't touch DNS, nameservers, or email config — verify only.
