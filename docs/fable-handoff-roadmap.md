# Agripals — Handoff Roadmap for Fable

**From:** Rhys (founder), via Claude (Sonnet 5)
**To:** Fable
**Purpose:** Take Agripals from "working proof of concept" to "the thing that makes a restaurant owner say *whoa, I need this*." You have a long runway on this pass — use it. Go as deep as you can on the restaurant app and the supplier (wholesaler) app specifically. Everything else is secondary.

Read this whole document before writing code. It tells you what exists, what's locked in, what's genuinely open for you to decide, and what "done" looks like.

---

## 1. What Agripals is

**One-liner:** Agripals is the AI that haggles with your food suppliers so you don't have to.

**The pitch a restaurant owner hears:** *"20 seconds to save 20% or more. Scan your menu or last invoice, and AgriPal — our AI ordering assistant — goes out and gets wholesalers bidding against each other for your business. You get the best price on oysters, prawns, tuna, salmon, produce — whatever you buy — without ever picking up the phone."*

**The wedge:** seafood and fresh produce, starting in San Francisco. The founder has real domain expertise and supply relationships in oysters specifically — that's the beachhead. From there it expands into every ingredient a restaurant buys.

**Why it's different from a normal ordering app:** there's no menu of wholesalers to browse. You just talk to AgriPal like you'd text a person. AgriPal figures out what you need, gets permission, and goes and does the actual negotiating — with real back-and-forth, not just a static price list.

**The mission underneath the app:** Agripals is building toward being the MCP server for food — a single endpoint that lets any AI agent send a food request from anywhere to anywhere and have it sourced, negotiated, and fulfilled, regardless of what channel or system is on the other end. The restaurant and supplier apps you're building this pass are the first two "channels" into that system; WhatsApp and SMS (see Section 9) are the next two. This isn't a distant rebrand — it should shape how you build the message/RFQ/quote data model now, even though the actual MCP server surface itself is future work. See Section 9 for the concrete architecture and what to build now vs. later.

**The full business thesis** lives in `docs/business-model.md` — read it if you want the "why now," the market structure argument (why small wholesalers are the eager early adopters, not the big incumbent distributors), and the farm-drop group-buying concept for later. The 35-day fundraising sprint plan is in `docs/founder-roadmap-35-days.md`.

---

## 2. Brand direction: make this trendy

This is the part the founder cares most about right now. Current state is functional but looks like a solid enterprise agtech tool. **That is not the vibe.** The vibe is: the AI-native startup everyone's talking about this month. Think less "farm-to-table B2B SaaS," more "the Arc browser / Linear / Perplexity energy applied to restaurant procurement." Confident, fast, a little irreverent, obviously AI-native — not a form with a chatbot bolted on.

Concretely, lean into:

- **Chat-first, not form-first.** The whole product is a conversation. Every screen should feel like it's alive and responding to you, not like you're filling out fields. (The agripals-live app already does this for the core loop — extend that feeling everywhere, including onboarding, RFQ status, and quote comparison.)
- **Motion with intent.** Subtle, fast micro-interactions — messages that feel like they're being typed, numbers that count up when a savings figure lands, a quote card that visibly "wins" against the others. Not gratuitous animation, but nothing should feel static or spreadsheet-like.
- **Confidence in the copy.** "20 seconds to save 20%" is the kind of line that should show up everywhere in different forms — in the empty states, in the loading states, in the onboarding. Make the AI sound like it knows exactly what it's doing.
- **A palette that feels current, not agricultural-corporate.** The existing prototype uses a green/orange "fresh produce" palette (`--green-700: #2D6A4F`, `--orange-500: #F0A050` — see `App-Prototype/index.html`'s `<style>` block for the full token set). You are free to keep, evolve, or replace this. If you keep green, make it feel more "fintech-meets-fresh" than "organic farm co-op" — think the confident greens of Cash App or Robinhood's growth-mode UI, not a farmers' market flyer.
- **Dark mode should be a first-class option**, not an afterthought — a lot of "trendy right now" product design leans dark-with-vibrant-accent.

**Signpost for Fable:** the exact visual system (fonts, final palette, iconography, whether to go dark-by-default or light-by-default, animation library choice) is intentionally left to you. Nobody on this end is precious about it. Make a strong opinionated choice and run with it — that's more valuable right now than a safe, committee-designed system.

---

## 3. Scope for this pass

**In scope — go deep:**
- The **restaurant app** (the ordering/chat side).
- The **supplier/wholesaler app** (the receiving/quoting side).
- The **Claude-powered agent logic** that connects them — this is the actual product, not a nice-to-have.
- **WhatsApp + SMS as a real channel into that same agent logic** (Section 9) — not just the web app.

**Explicitly out of scope for this pass** (don't spend time here unless everything above is in great shape with time to spare):
- The admin/ops dashboard (exists as a static mockup in `App-Prototype/index.html` under the "Dashboard" tab — leave it alone).
- Payments, invoicing, real money movement.
- Multi-tenant production auth (real login for arbitrary restaurants/wholesalers) — a single demo restaurant and a nameable demo wholesaler is enough for now, see Phase 5.
- The farm-drop group-buying feature (documented in the business model, not built anywhere yet) — interesting for later, not this pass.
- Voice/phone calls (out of scope for now — text-based channels only).
- The full MCP server / agent-to-agent protocol surface (Section 10) — build toward it, don't build it this pass.

**Note:** WhatsApp and SMS are explicitly **in scope** this pass (see Section 9) — they're not the old manual SMS logistics concept in `docs/agripals-sms-first-order-flow.md` (that doc describes a fully human-operated workflow for the original oyster deliveries and is superseded by this handoff), they're a real automated channel into the same Claude-powered negotiation loop as the web app.

---

## 4. What already exists (read before building)

There are two separate things in this repo. Don't confuse them:

### `App-Prototype/index.html`
A single-file, click-through HTML/CSS/JS mockup. No backend, no real logic — everything is scripted/fake. This is the **visual and UX reference** for tone, screen flow, and interaction patterns (message bubbles, RFQ cards, quote comparison, the Google sign-in + onboarding flow, the bottom nav structure). It is *not* the codebase to build on top of — it's a mood board that happens to be clickable. Skim it for UX ideas, especially:
- The restaurant Messages tab and scripted AgriPal conversation (subject auto-detection, request-understood card).
- The wholesaler Messages tab (AgriPal messaging a wholesaler on the restaurant's behalf).
- The Google sign-in → walkthrough → onboarding (restaurant name + address) sequence at the front of the restaurant app.
- The Scan Menu/Invoice screen copy ("We'll haggle so you don't have to").

### `agripals-live/`
A real Next.js app (App Router, JS not TS) with Claude actually powering both sides of the conversation via tool-use. **This is the real codebase — build on this.**

- `lib/store.js` — in-memory data store (restaurant conversation + an array of RFQs, each with its own wholesaler-side conversation thread). Attached to `globalThis` so it survives dev hot-reload. Explicitly not persisted — resets on server restart. This needs to change in Phase 6 (see below).
- `lib/claude.js` — Anthropic SDK wrapper. Two tool-enabled conversation loops:
  - `runRestaurantTurn()` — AgriPal talks to the restaurant, has a `send_rfq_to_wholesalers` tool it calls once it has a clear item + quantity and the restaurant has explicitly agreed to outreach.
  - `runWholesalerTurn()` — AgriPal (as an intermediary) talks to a wholesaler, has a `submit_quote` tool it calls once there's a clear price and confirmed delivery days.
  - Model is currently `claude-sonnet-5`.
- `app/restaurant/page.js` — real chat UI, text input, polls the API every 2.5s.
- `app/wholesaler/page.js` — inbox of open RFQs + thread view, same polling pattern, wholesaler name is just a free-text field right now (no real accounts).
- `app/api/restaurant/message/route.js` and `app/api/wholesaler/message/route.js` — the two API routes tying it together.
- Current loop is **one restaurant, one wholesaler, one quote per RFQ** — see Phase 4, this is the biggest functional gap versus the "best deal" pitch.

Run it yourself first (`npm install`, copy `.env.local.example` to `.env.local`, add an Anthropic key, `npm run dev`) so you're working from a real understanding of current behavior, not just reading code.

---

## 5. Phased roadmap

Work roughly in this order. Each phase should leave the app in a working, demoable state — don't leave things half-migrated.

### Phase 0 — Foundation hardening (do this first, should be fast)
- Add basic error boundaries / graceful failure states to the chat UIs (what happens if the Claude API call fails mid-conversation — right now there's a basic fallback string, make sure it never looks broken).
- Add loading/typing indicators that feel intentional (see brand direction above) rather than the current minimal dot animation.
- Sanity-check the tool-use prompts in `lib/claude.js` against a range of messy, realistic restaurant inputs (typos, vague quantities, multiple items in one message, someone who's rude or terse) — tighten the system prompts so AgriPal handles those gracefully. This is cheap to test and high-value.

### Phase 1 — Visual & brand system
- Establish the actual design system per Section 2: colors, type scale, spacing, iconography, motion tokens. Document it (even briefly) so it's consistent across both apps.
- Rebuild the restaurant and wholesaler shells (`globals.css` and the two page components) against that system. This is where "trendy" actually gets built, not just described.
- Build a real landing/marketing moment at `/` — right now it's a plain two-link page. This should feel like the front door of a startup people are excited about, not a dev tools index page.

### Phase 2 — Restaurant app feature completion
- Port the Google sign-in → walkthrough → onboarding sequence from `App-Prototype/index.html` into `agripals-live` for real, gating entry to `/restaurant`. It doesn't need real Google OAuth yet (that's Phase 6) — but it should feel real, not like a static mockup screen.
- Menu/invoice photo scan: the prototype has a scripted version of this (camera viewfinder → "AI is reading your document" → extracted item list). Decide whether to build a real version now (actual image upload + Claude vision to extract items) or keep it simulated for this pass — **your call, signposted below** — but if you build it real, this is a genuinely impressive demo moment worth the investment.
- RFQ / order history view: show past and active RFQs with real status (open / quoted / accepted), matching the quality bar of the rest of the app — the current `.rfq-panel` in `app/restaurant/page.js` is a functional but bare-bones starting point.
- Quote comparison UI: when multiple quotes come back for one RFQ (see Phase 4), the restaurant needs a real comparison view — price, wholesaler rating/reliability if you build that concept, delivery days, and a clear "best deal" recommendation with the reasoning visible (not just the lowest number — factor delivery fit and any reliability signal you introduce).

### Phase 3 — Supplier (wholesaler) app feature completion
- Proper inbox with real RFQ cards (item, quantity, customer, urgency/time-since-posted) — reference the prototype's wholesaler inbox for the interaction pattern, rebuild it in the new visual system.
- A lightweight "who am I" concept for the wholesaler — doesn't need real auth (Phase 6), but should feel like a persistent identity rather than a text input that resets. Consider `localStorage` for now.
- Stock/availability toggles (present in the prototype, not yet in `agripals-live`) — lets a wholesaler mark what they currently have, which AgriPal can use when deciding who to route new RFQs to.
- Quote history / past customers view, mirroring the restaurant's order history.

### Phase 4 — The agent upgrade: make "best deal" real
This is the most important functional gap. Right now, one RFQ talks to exactly one wholesaler. The pitch is about **wholesalers competing** for the restaurant's business. To make that real:

- When an RFQ is created, it should be capable of going out to **multiple wholesalers** (in this demo environment, that likely means: multiple wholesaler "identities"/tabs can independently discover and respond to the same open RFQ, similar to how the prototype's wholesaler side showed an RFQ visible to any wholesaler on the network, not just one pre-matched supplier).
- Each wholesaler negotiation should still run through `runWholesalerTurn()` independently — that part of the architecture is sound, it just needs to support N threads per RFQ instead of exactly one.
- Build the actual "best deal" selection logic: once 2+ quotes exist for an RFQ, AgriPal should be able to reason about which one to recommend to the restaurant — not just cheapest, but weighing delivery fit, any reliability/rating signal, and completeness of the offer. This reasoning should be Claude-driven (another tool-use call, or an extension of the restaurant-side turn) so the "why we recommend this one" explanation is genuinely generated, not hardcoded.
- Consider whether AgriPal should proactively counter-negotiate with a wholesaler who's not yet competitive ("I've got a quote of $6.95/lb from someone else — can you beat that?") — this is the "haggling" the whole brand promise is built on, and right now the agent only takes the first number offered. Even a simple one-round counter-offer loop would make the demo dramatically more convincing.

### Phase 5 — WhatsApp + SMS channel (see Section 9 for full detail)
- Port Haggle's `lib/messaging/` provider pattern into `agripals-live`.
- Wire inbound Twilio webhooks to `runWholesalerTurn()` so a wholesaler can negotiate entirely over SMS/WhatsApp, never touching the web app.
- Wire outbound sending so a newly-created RFQ can reach a phone-number-only wholesaler the same way it reaches an in-app one.
- This is a strong demo moment in its own right: send a real WhatsApp message to a real phone during a live pitch and watch AgriPal negotiate.

### Phase 6 — Auth & persistence (lighter touch, don't over-invest)
- Real Google OAuth for the restaurant side (Clerk is already partially set up in the separate Haggle project for a different product — decide whether to reuse that pattern/provider here or pick something else; **signposted below**).
- A real database (Postgres via Supabase, or similar) to replace `lib/store.js`'s in-memory object, so state survives restarts and this can eventually support more than one restaurant and more than one wholesaler concurrently.
- Keep this phase lean — the goal is "doesn't reset when the server restarts" and "doesn't feel fake," not a full production auth system.

### Phase 7 — Real-time upgrade (nice-to-have, only if time remains)
- Replace the 2.5s polling with real-time updates (Supabase Realtime, once Phase 6's database exists) so messages/quotes appear instantly rather than on the next poll tick. Purely a polish item — the polling approach works fine for a demo, this just removes the small lag.

### Phase 8 — Motion & polish pass
- Once everything above works, do a dedicated pass purely on feel: transitions between screens, the savings-counter animation, the "quote just came in" moment, empty states, error states. This is what separates "functional" from "the thing people screenshot and share."

### Phase 9 — Deploy
- Get a hosted version live (Vercel is the obvious choice for a Next.js app) so this can be shown to anyone, not just on the founder's laptop. Needs Phase 6's persistence layer first — don't deploy the in-memory version, state will behave unpredictably across serverless instances.

---

## 6. Feature reference lists

### Restaurant app — full feature set to aim for
- Google sign-in (simulated is fine short-term, see Phase 5 for real)
- Quick onboarding: restaurant name + address only (name/email assumed already known from Google — never ask twice)
- Brief feature walkthrough immediately after sign-in
- Chat-first home: message AgriPal in free text, real Claude-driven responses
- Menu/invoice scan (simulated or real — your call, see Phase 2)
- RFQ list with live status (open / quoted / accepted)
- Multi-quote comparison view with a clear "best deal" recommendation and visible reasoning
- Order/delivery tracking for accepted RFQs (a status stepper exists in the prototype — evolve it)
- Profile/savings summary (lifetime savings, active RFQs — prototype has a version of this)

### Supplier (wholesaler) app — full feature set to aim for
- Lightweight persistent identity (name, no real auth needed yet)
- Inbox of open RFQs, visible across the network (not just ones pre-matched to them)
- Per-RFQ negotiation thread with AgriPal acting as intermediary
- Stock/availability management
- Active customer / quote history list
- Some signal of urgency or competition ("2 other wholesalers have already quoted on this") — this is core to the "wholesalers bidding against each other" pitch and currently doesn't exist anywhere in the real app

### Claude agent — behavior to aim for
- Never asks for information it can reasonably infer or already has
- Always gets explicit permission before contacting a wholesaler
- Handles messy, real, non-form-shaped input gracefully
- On the wholesaler side, never fabricates a price — only records what's actually said
- Reasons explicitly about which of several quotes is the best deal, and can articulate why
- Ideally: capable of a counter-offer round, not just first-offer-wins

---

## 7. Signposted decisions — genuinely open, make the call

These are real, unresolved decisions. Don't wait on approval for these — pick the option that gets you to a better demo fastest, and note what you chose and why so the founder can review it after the fact.

- **Visual system specifics** — exact palette, type, dark vs. light default, animation approach. (Section 2.)
- **Menu/invoice scan: real vision-powered extraction vs. simulated.** Real is a stronger demo moment if time allows; simulated is safer if time is tight.
- **Auth provider for real Google sign-in** — reuse the Clerk setup pattern from the separate Haggle project, or choose independently. They're different products; there's no hard requirement to share infrastructure.
- **Database choice for Phase 5** — Supabase Postgres is a reasonable default (matches patterns already used elsewhere in this founder's other project) but not mandated.
- **How "multiple wholesalers per RFQ" is represented in a single-machine demo** — e.g. multiple named wholesaler sessions/tabs, or a lightweight picker to switch identity within `/wholesaler`. Your call on the simplest thing that credibly demonstrates competition between wholesalers.
- **Whether to keep, retire, or fold in the admin dashboard mockup** at all this pass — default assumption is leave it untouched, but if it's trivial to wire the "RFQ activity" and "wholesaler network" views to real data once the above exists, that's a reasonable stretch goal, not a requirement.

If you hit other ambiguous calls not listed here: make the decision, keep moving, and leave a clear note (in code comments or a short doc) about what you chose and why, so it's easy to review later.

---

## 8. Recommended tech stack

Keep building on what's already working rather than re-platforming:

- **App framework:** Next.js (App Router), as already scaffolded in `agripals-live/`. Deploy to Vercel when you reach Phase 8.
- **Database + Auth + Realtime:** Supabase (Postgres). This replaces `lib/store.js`'s in-memory object in Phase 5, and Supabase Realtime replaces the current 2.5s polling in Phase 6 for free — no custom websocket server needed. This is the same infra pattern already running in the founder's other project (Haggle), so it's a known quantity.
- **Auth:** Clerk, for real Google sign-in. Spin up a separate Clerk app instance from Haggle's — different product, different users, no reason to share.
- **AI:** Claude via `@anthropic-ai/sdk`, tool-use pattern already built in `lib/claude.js`. This is the actual product, not a swappable commodity — don't replace it with a different model/provider without a strong reason.
- **Messaging (WhatsApp + SMS):** don't build this from scratch — copy the pattern already live in Haggle at `lib/messaging/` (a different project by the same founder, but directly reusable). It's a `MessagingProvider` interface with a working `TwilioProvider` (real Twilio SDK integration, handles SMS and WhatsApp through one number, real inbound webhook parsing via `normalizeInboundMessage`) and a stubbed `MetaWhatsAppProvider` for the direct Meta WhatsApp Cloud API later. See Section 9 for how this plugs into Agripals specifically.
- **Monitoring:** Sentry, when you get to it — already a documented env var pattern in the Haggle project's `.env.example`, follow the same convention here (`SENTRY_DSN`).

This is a deliberately boring, proven stack. The differentiation is in the agent behavior and the product feel, not in exotic infrastructure — see the Rekki lesson below.

**A cautionary lesson worth knowing:** Rekki (a direct competitor, WhatsApp-style chat ordering for restaurants) originally built their chat backend in Elixir specifically to get WhatsApp-style presence/typing indicators, because Elixir's concurrency model mirrors Erlang, which WhatsApp itself runs on. They later abandoned it for Go because they couldn't hire Elixir engineers. The lesson: don't chase an exotic stack for chat-presence polish. Supabase Realtime gets you live "message just arrived" behavior without that detour.

---

## 9. WhatsApp + SMS: send from anywhere to anywhere

The mission (Section 1, and see `README.md`'s "Long-Term Vision") is for Agripals to become the MCP server for food — any AI agent should be able to send a food request from anywhere to anywhere. The first concrete step toward that isn't the MCP protocol itself (that's later, see below) — it's making sure a wholesaler who will never open a web app can still fully participate, over WhatsApp or plain SMS, in the exact same negotiation loop as someone using `/wholesaler` in the browser.

**What to build this pass:**
- Port Haggle's `lib/messaging/` pattern into `agripals-live`: a `MessagingProvider` interface, a `TwilioProvider` implementation (real — Haggle's is already working code, not a prototype), and a stubbed `MetaWhatsAppProvider` for later.
- Add inbound webhook routes (e.g. `app/api/webhooks/twilio/route.js`) that receive an SMS/WhatsApp reply from a wholesaler, normalize it via `normalizeInboundMessage`, and feed it into `runWholesalerTurn()` — the *same* Claude negotiation loop the web chat uses. The wholesaler shouldn't be able to tell, and shouldn't need to know, whether they're talking to the app or texting a phone number — same tools, same agent, same "submit_quote" outcome either way.
- Outbound: when an RFQ is created and a wholesaler's contact is a phone number rather than an app session, send the opening AgriPal message over SMS/WhatsApp via the same provider abstraction, rather than only seeding an in-app inbox row.
- This is also the piece that finally makes the founder's original SMS-first oyster logistics concept (`docs/agripals-sms-first-order-flow.md`) real — that doc describes a fully manual, human-operated version of exactly this idea. You're building the automated version of it.

This directly mirrors Choco (a direct competitor): their whole model is orders converted into whatever format the supplier actually uses — email, WhatsApp, text, fax, ERP. Don't make Agripals app-only; the app is one channel among several, not the only front door.

---

## 10. The actual MCP server (future phase — build toward it, don't build it yet)

This is explicitly **not** part of this pass's scope, but it should inform how you shape the data model now, so it's not a rewrite later.

**The end state:** an actual MCP server exposing tools like `send_rfq`, `get_quote`, `place_order`, `check_stock`, `confirm_delivery` — callable by *any* AI agent, not just AgriPal's own chat UI. A restaurant that already has its own AI ordering agent could call these tools directly. A wholesaler's own inventory-management AI could respond to an RFQ programmatically instead of a human typing a reply. Third parties could build entirely different front ends on top of the same underlying sourcing/negotiation engine.

**Why this is credible, not just founder ambition:** Freshworks shipped almost exactly this pattern in 2026 — a Marketplace MCP Server Gateway that gives any AI agent a single MCP endpoint abstracting hundreds of different third-party API contracts, with tenant-aware session context per call. Agripals's version is food-specific: the tools are about sourcing and moving food, and the systems underneath are wholesalers, farmers, and logistics partners, each reachable over whatever channel they actually live on (app, WhatsApp, SMS, and eventually direct agent-to-agent calls).

**What this means for you right now, concretely:** keep the core actions (`send_rfq_to_wholesalers`, `submit_quote`, and whatever you add for the multi-wholesaler/best-deal logic in Phase 4) modeled as clean, well-typed functions with explicit inputs/outputs — not tangled directly into chat-specific UI code. If those functions are already shaped like tools (which they are, since they're built as Claude tool-use handlers), exposing them behind an actual MCP server later is a thin wrapping layer, not a rebuild. That's the only thing this phase asks of you now — everything else about the MCP server itself is future work.

---

## 11. What "done" looks like for this pass

A convincing end-to-end demo where:
1. A restaurant owner signs in, is onboarded in seconds, and lands in a chat that feels alive and current.
2. They describe what they need in plain language, AgriPal asks smart follow-ups, gets permission, and sends it out.
3. On the wholesaler side, at least two independent wholesaler identities can see and respond to the same open request, each negotiating with AgriPal in their own thread.
4. The restaurant sees multiple quotes come back and a clearly reasoned "best deal" recommendation — not just a lowest-price sort.
5. At least one of those wholesalers negotiates entirely over real WhatsApp or SMS, never opening the web app, and it's indistinguishable in quality from the in-app negotiation.
6. The whole thing looks and feels like a product from an up-and-coming AI-native startup, not an enterprise agtech tool.

Everything in Section 3's "out of scope" list should be untouched. Everything in Section 5's phases should be attempted in order, as far as time allows — it's fine to not finish Phase 6 (auth/persistence) onward, it is not fine to skip ahead to polish (Phase 8) while Phase 4's multi-wholesaler competition or Phase 5's WhatsApp/SMS channel still don't exist, since those are the actual core of the product promise.

Good luck — make it look like the thing everyone wishes their restaurant already had.
