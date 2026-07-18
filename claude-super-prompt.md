# Claude super-prompt — Agripals (state of the world + what to do)

> Paste this whole file into a fresh Claude session working on the Agripals folder. It tells you exactly what exists, what Codex just shipped, what the infrastructure looks like, and what to do (and not do) next. Treat this as the source of truth over anything stale in the local checkout.

---

## 1. What Agripals is

Agripals is a farm-direct wholesale food company — an "online-only, AI-native wholesaler." Chefs text us (SMS is the wedge, no portals or order forms), and we supply farm-direct product starting with oysters from Northern California farms to San Francisco restaurants. The two AI unlocks are structured order extraction from freeform texts/photos, and last-mile logistics coordination. Positioning line: **Fresher. Cheaper. No Middleman.**

## 2. The repo and where things run

- **GitHub:** `rhy-collab/agripals`, branch `main`. This is the deploy source — pushing to `main` auto-deploys.
- **Vercel:** project `agripals-landing-page` (team `rhycollabs-projects`). Standard URL: https://agripals-landing-page.vercel.app. Production = whatever is on `main`.
- **Domain:** agripals.com serves this same Vercel project. **DNS is mid-migration off Cloudflare → GoDaddy DNS + Vercel site + Google Workspace mail.** The exact runbook (records, MX, SPF, DKIM, DMARC, nameserver cutover) is in `DNS-Migration-GoDaddy.md` in the repo root — read it before touching anything domain- or email-related, and watch for half-finished SPF/DKIM state.
- **Homepage:** `index.html` at the repo root IS the landing page — it's the built Vite/React output of the `agripals landing D/` source folder, inlined into one file. There is no vercel.json rewrite anymore; earlier "optionA/B/C" pages still exist as `optiona.html`, `optionb5.html`, `optionc5.html`, `optiond.html`, etc.
- **Landing source:** `agripals landing D/` is the Vite + React + Tailwind 4 + lucide-react + motion source for the homepage. If you change the landing, change the source AND rebuild/re-inline `index.html` (that's the established pattern — see commit `f639b80`).

## 3. What Codex just shipped (commit `7409b52`, Jul 18 2026)

1. **`automation.html`** — new standalone "Restaurant Automation" landing page. Sparse header, single promise ("Automate your restaurant operations."), full-width text-capture strip ("TEXT ME A DEMO"), proof section with six capabilities: photo & text assistant, weekly stock planning, food-chain traceability, invoice & spending insight, waste & cash flow, QuickBooks-ready. Live at `/automation`.
2. **`DNS-Migration-GoDaddy.md`** — the DNS migration runbook described above (GoDaddy records → verify → nameserver switch → verify → remove Cloudflare).
3. **`lovable-super-prompt.md`** — a pixel-exact spec for rebuilding the single-screen deal landing page in Lovable (design tokens, deal slider behaviour, CTA, responsive breakpoints). Useful as the canonical written spec of the landing design even if Lovable is never used.
4. **Header CTA change, applied in three places:** "Chef Access" is now **"Wholesaler"**, linking to the Google Form `https://forms.gle/AqFsSnandRwdAaYe9` — changed in `index.html` (built homepage), `agripals landing D/src/App.tsx` (source), and `optiond.html`. Keep these three in sync if you touch the header.

## 4. What Claude shipped just before that (commit `ac5ab3d`)

**`App-Prototype-D/index.html`** — a single-file, four-view interactive prototype (Landing / Chef / Wholesale / Admin) rebuilt in the landing-D design language. Live at https://agripals.com/App-Prototype-D. The older emoji-heavy prototype still exists at `App-Prototype/index.html` (live at `/App-Prototype`). Prototype-D is the current one; treat App-Prototype as legacy reference.

## 5. Design system (use this exactly, everywhere)

- Font **Inter** (400–900), white background, `#fafafa` outer frame.
- Brand green `#078539` (Tailwind `green-700` `#15803d` is used in Prototype-D — match whichever file you're editing), light-green underline accent (`green-300` / `#83efa8`) under key words, `green-50` icon chips.
- Ink/near-black text and buttons (`#0b1326` / slate-900 `#0f172a`), slate-500 muted text, hairline slate-100/200 borders.
- Giant black-weight numerals with tight tracking for prices/metrics; **square corners** on buttons ("TEXT US" style, ink background); inputs are underline-only (bottom border, no box).
- **lucide** line icons only. No emojis, no gradients, no glass effects, no clutter. Minimal chrome, generous whitespace.
- Copy voice: short, confident, chef-to-chef ("like texting a mate"). Never change "Fresher. Cheaper. No Middleman." or "TEXT US".

## 6. Known state issues to fix first

- **The local working folder is stale**: local `main` is ~28 commits behind `origin/main` and 2 ahead (two old B.5/C.5 landing commits that were superseded remotely), with some uncommitted local files (decks, `.nojekyll`, `.gitignore` edit, `App-Prototype-D/`, `claude-super-prompt.md` — this file). Before doing new work: fetch, then reconcile — the remote is the truth for the landing pages; the local-only commits are almost certainly safe to drop, but confirm with Rhys before discarding anything.
- **A PR exists**: `cloudflare/workers-autoconfig` (PR #1, opened by Cloudflare's bot). Since the plan is to LEAVE Cloudflare, this PR should probably be closed, not merged — confirm with Rhys.
- `.env.example` lists planned integrations (SMS API, Postgres, Discord webhook, Herbie/Honcho) — none are wired up; the site is fully static today.

## 7. What to do next (in order)

1. **Sync the local folder** with `origin/main` (see 6) so local work doesn't fork the history again.
2. **Verify Codex's deploy**: check https://agripals.com/automation renders correctly on mobile and desktop, and that the homepage "Wholesaler" link opens the Google Form.
3. **Cross-link the automation page** if asked — it's currently orphaned (nothing on the homepage links to `/automation`). Don't add it to the homepage without Rhys's sign-off; the homepage is deliberately a single-purpose deal page.
4. **DNS migration support**: Rhys executes the GoDaddy steps himself (account access); your job is to verify afterwards — site resolves on both apex and www, MX/SPF/DKIM/DMARC records intact, mail flow works — per `DNS-Migration-GoDaddy.md` Step 4.
5. **Prototype-D iteration**: any new product-demo work goes into `App-Prototype-D/`, keeping the single-file pattern and the design system above.

## 8. Hard rules

- Never redesign the homepage or change its copy without explicit sign-off — it converted as-is and is the reference design.
- Any change to the landing header/CTA must be made in all three files listed in §3.4.
- Don't merge or act on bot PRs without asking.
- Don't touch DNS records, nameservers, or email config yourself — verify only.
- Deploys happen only via commits to `main` (GitHub → Vercel). No CLI deploys, no tokens.
