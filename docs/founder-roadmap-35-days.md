# Agripals — 35-Day Founder Roadmap (SF Sprint)

**Goal:** Get Agripals funded within 35 days.
**Location:** San Francisco.
**Daily rhythm:** Code/build in the day → walk into restaurants and onboard them midday/afternoon → pitch VCs in the evening. Repeat.

---

## Week 0 (Days 1–3): Admin & Foundations

Basic setup that everything else depends on. Do this first so it's not a distraction later.

- [ ] Register a business entity (Delaware C-corp is standard for VC fundraising — confirm with a startup lawyer or use Stripe Atlas/Clerky)
- [ ] Buy the domain (agripals.com or similar) and set up Google Workspace on it (email, calendar, docs)
- [ ] Open a business bank account (Mercury or similar — fast for early-stage startups)
- [ ] Set up a cap table tool (Carta or a simple spreadsheet for now)
- [ ] Get a basic landing page live — you already have Landing-page / Hamburger-landing-page components in the repo, ship the simplest version that explains the pitch and captures restaurant + wholesaler emails
- [ ] Set up a simple CRM or spreadsheet to track: restaurants contacted, wholesalers contacted, RFQs sent, deliveries completed
- [ ] Decide your SF base of operations for the sprint (co-working space, café you'll work from) and lock in VC meetings on the calendar early — pitch slots fill up fast

## Week 1 (Days 4–10): Prove the Oyster Wedge

Continue and tighten the existing SMS-first MVP (see README.md) while layering in the RFQ mechanic.

- [ ] **Go direct, not through a wholesaler:** the oyster line is farm-to-restaurant with no middleman — see `docs/go-to-market-strategy.md` for the full first-principles pricing thesis (middlemen ≈ 2x cost; direct ≈ 1x cost)
- [ ] Recruit ~10 oyster farmers as direct supply (start with a Tomales Bay, CA contact)
- [ ] Recruit 10–20 San Francisco pilot restaurants
- [ ] Find and lock in **one SF-based logistics partner** capable of the full farm → restaurant leg — this is the single biggest open blocker right now
- [ ] Get to 10 clean oyster deliveries using the SMS + photo-grading + escrow flow in `docs/agripals-sms-first-order-flow.md` — this is the proof-of-concept milestone the README already defines
- [ ] In parallel, start building the "photo-to-RFQ" flow for categories that *aren't* going direct yet (milk, produce, etc.): photograph a menu or invoice → AI extracts products/volumes → generates a draft RFQ
- [ ] For those non-direct categories, identify and shortlist 5–10 small/independent wholesalers (not the big incumbents) who are hungry for new restaurant demand — these are your early RFQ responders
- [ ] Walk into SF cafes/restaurants with the pitch: "20 seconds to save 20% or more on your input costs." Take the photo, generate the RFQ, follow up in 24–48 hours with a wholesaler quote (for direct-sourced oysters, the pitch is even stronger: "half the price, straight from the farmer")

## Week 2 (Days 11–17): Systemize the RFQ Engine

- [ ] Automate the manual steps from Week 1: menu/invoice photo → structured product list → RFQ generation → wholesaler notification
- [ ] Build the "open RFQ" mechanic — once a restaurant requests a quote, any wholesaler on the platform (not just the ones you tee up) can see and respond to it
- [ ] Track which wholesalers win RFQs and start cross-referring them to other restaurants in the same area (this is your supply-side network effect)
- [ ] Start scoping the "farm drop" concept: cluster 3–5 restaurants in the same neighborhood, source directly from a farmer, share one truck/logistics run
- [ ] Keep pitching VCs each evening — use the oyster deliveries + first RFQ conversions as traction proof

## Week 3 (Days 18–24): Expand Beyond Oysters

- [ ] Take the trust you've built via oysters and cross-sell 1–2 more categories per restaurant (milk, produce) using the same RFQ flow
- [ ] Run a first real farm-drop pilot if 3+ restaurants in one area are willing
- [ ] Document conversion metrics: photo scans → RFQs generated → wholesaler responses → deals closed → measured cost savings %
- [ ] Refine the pitch deck with real numbers (this matters far more to investors than the concept alone)

## Week 4–5 (Days 25–35): Close the Round

- [ ] Have a clear, numbers-backed pitch: X restaurants onboarded, Y RFQs generated, Z% average savings, N deliveries completed
- [ ] Push hardest on VC meetings — aim to have term sheet conversations in motion by day 30
- [ ] Line up at least one reference restaurant and one reference wholesaler who'll vouch for the model on a call with investors
- [ ] Target: signed term sheet or committed funding by day 35

---

## Standing To-Dos (ongoing throughout)

- [ ] Keep the ops spreadsheet (order-tracker.csv / tracking-spreadsheet-spec.md) current — investors will ask for real data
- [ ] Log blockers as they come up (packaging, logistics gaps, wholesaler pushback) — you already track this pattern in README.md, keep it up
- [ ] Note anything a large wholesaler tells you about why they won't join — this is useful objection-handling data for the pitch

---

*This roadmap assumes the existing oyster SMS-first MVP (see README.md) as the base layer, with the RFQ/photo-scan mechanic layered on top as the scalable product engine.*
