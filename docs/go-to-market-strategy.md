# Agripals — Go-to-Market Strategy

**Tagline:** Sunlight is the best transparency.

**One-line thesis:** Food supply chains are opaque by design, and middlemen keep them that way because opacity is where their margin lives. Agripals applies first-principles thinking — the way SpaceX priced a rocket by pricing its raw materials instead of accepting a quoted price built on layers of contractor markup — to food: strip out the wholesalers, importers, and exporters who add cost without adding value, and go direct from farmer to restaurant.

---

## The pricing thesis: 2 → 1 → 0

This is the number that should anchor every pitch, every piece of marketing copy, and every product decision.

- **Today, with middlemen: 2.** A wholesaler in the middle of a farmer-to-restaurant chain typically marks the product up roughly 2x. The restaurant pays close to double what the farmer actually received.
- **Direct, at first-principles cost: 1.** Cut the wholesaler out — go straight from farmer to restaurant — and the price converges on the actual cost of growing, handling, and transporting the food. That's the number Agripals is driving toward first.
- **Long-term, as automation removes cost from the physical supply chain itself: 0.** Robotics in farming and packing, autonomous and solar-powered trucking, AI-coordinated logistics — as these strip labor and inefficiency out of the *production and movement* of food (not just the markup), the true cost trends toward zero.

Everything Agripals builds in the near term is about proving the "2 → 1" move works, market by market, product by product. The "1 → 0" move is the multi-year infrastructure bet — the MCP server for food (see `docs/business-model.md` and `README.md`'s Long-Term Vision) is the mechanism for it.

---

## Why now, why this works (the first-principles case)

The traditional chain — for an imported product like bluefin tuna, roughly: farm/catch → domestic port → truck to an exporter → exporter handles transport arrangement, labeling, compliance → ships to an importer on the other side → importer grades and receives → importer distributes to a smaller wholesaler → wholesaler distributes to the restaurant — has as many as five or six intermediary handoffs between the person who caught or grew the food and the person who cooks it. Domestically it's shorter but the same shape: farmer → wholesaler → restaurant.

Every handoff exists historically because someone needed to solve a real coordination problem: who has stock, what grade is it, can it be trusted, how does it physically get from A to B, who pays whom and when. None of those problems require a human intermediary anymore — they require information flow and trust, and AI plus cheap messaging (SMS/WhatsApp) can solve both directly between the two parties who actually need the food to move: the farmer and the restaurant.

Once that coordination problem is solved without a human in the middle, the markup that funded that human disappears. That's the entire thesis.

---

## Phase 1: SF Oysters Direct (now)

**Goal:** prove farm-to-restaurant works, end to end, with real money moving, in one city, with one product.

**Targets:**
- **~10 oyster farmers** onboarded as supply.
- **10–20 participating restaurants** in San Francisco.
- **One logistics partner** based in SF, capable of reliably running the farm → restaurant leg (this is a real gap right now — finding this partner is a near-term priority, see `docs/founder-roadmap-35-days.md`).

**How an order actually works (the operational model):**

1. **Order placed.** A restaurant's request (via the Agripals app, or a plain text) becomes a short order number — a 6 to 10 digit code is enough, no QR codes or label printers needed. (This extends the existing SMS-first design in `docs/agripals-sms-first-order-flow.md`.)
2. **Farmer fulfills by text.** The farmer gets an SMS with the order details. Packing instructions are radically simple: triple-bag the oysters (three plastic bags), tie it off with masking tape, and write the order number on the tape in pen. That's the entire "label."
3. **AI grading, from the farm.** Before sealing the bag, the farmer takes two photos and texts them in: one of a representative handful of oysters in their palm (for size/consistency), and one of a single shucked oyster (for meat quality/grade). AI assesses both against the promised grade. This solves the grading problem without a human inspector.
4. **Logistics, tracked by text.** The order number is the only "system" needed — every handoff (pickup, in-transit, delivered) is a text confirmation, the same pattern already designed for the original 10-delivery oyster milestone.
5. **Delivery-side re-grading.** On arrival, the chef is texted: confirm the order number, then take the same two photos again — the oysters in hand, and one shucked. AI compares the delivery-side grading against the farm-side grading.
6. **Escrow release.** Payment is held in escrow from the moment the order is placed. If the delivery-side grading matches within tolerance and there's no complaint, escrow releases automatically to the farmer — no invoice chasing, no net-30, no manual reconciliation.
7. **Invoice, automatically.** Once escrow releases, a real invoice is generated and emailed from the farmer to the chef, closing the loop with a normal paper trail despite the entire transaction having been coordinated by text.

This flow is a direct extension of the existing SMS-first MVP design (`docs/agripals-sms-first-order-flow.md`) — the grading and escrow mechanics are the new layer that makes it a real transaction system, not just a logistics tracker.

**Supply intelligence (Databricks):** as orders and grading data accumulate, a Databricks pipeline analyzes it to answer the questions that used to require a human wholesaler's relationships and judgment: which farmers are consistently reliable, which logistics providers are fastest/most damage-free, which farmer tends to have stock at which time of year, and how grading claims compare to grading outcomes over time. This is what solves the **consistent supply problem** without reintroducing a middleman — the AI, not a person, is doing the "I know a guy" work a wholesaler used to provide, and it's doing it with real data instead of relationships.

---

## Phase 2: SF product expansion

Once oysters are working with real farmers, real restaurants, and a real logistics partner, extend the same direct-sourcing model to other single-origin, gradable seafood: shrimp, lobster, crab, and whatever other products present a good direct line from a local/regional farm or fishery into SF restaurants. The goal in this phase is simply to build **as many direct farm-to-restaurant lines as are physically possible** in one metro area before expanding geography. Every new product should reuse the same SMS + photo-grading + escrow mechanics — the pattern doesn't change, only the product and the farmer network do.

---

## Phase 3: Import/export — cutting out importers and exporters too

Once the domestic model is proven, apply the identical first-principles logic to imported product. The traditional import chain has *two* middleman layers (exporter on the origin side, importer on the receiving side) instead of one, so the savings opportunity is larger, not smaller.

**The model:** work directly with restaurants to identify what they'd actually want imported (the working example: exceptional crab from Norway, sourced through a company that already focuses on direct-from-farmer/fishery sourcing), then have Agripals — not a human importer or exporter — organize the logistics, customs documentation, and compliance directly, end to end.

**What to research before building this phase:** whether any of the transport, logistics, or customs-documentation providers on the import/export side already expose an MCP server (or a well-documented API that could be wrapped as one) — if so, integrating with them directly is far faster than building customs/compliance automation from scratch. This is a research item for whoever picks up Phase 3, not something to solve now.

---

## Positioning & marketing narrative

**The core line:** *Sunlight is the best transparency.* Food markets are opaque because the people who profit from the opacity — the middlemen — deliberately keep it that way. Agripals' entire value proposition is telling the truth about what food actually costs to grow and move, and once people see that truth, they realize how simple and cheap this can actually be.

**The pricing story:** "The cost of getting an oyster from farmer to restaurant should be 1. Today, with middlemen, it's 2. We're driving it to 1 — and eventually, with automation, toward 0."

**The values/marketing narrative (use this in restaurant-facing and consumer-facing copy alike):**
- **Cutting out the middleman reduces environmental harm** — fewer handling steps, less redundant cold-chain handling and transport, a shorter, more direct physical path from farm to plate.
- **It supports local, often family-run farms** directly, rather than routing their margin through a wholesaler.
- **It gives full provenance** — a restaurant (and eventually a diner) knows exactly which farm their food came from, not just which wholesaler's truck it arrived on.
- The combined effect: sourcing through Agripals should come to be understood as *the* environmentally responsible, locally-supportive, transparently-sourced way to buy food — not a logistics optimization, a values statement.

**The long-term agent-economy narrative:** as AI agents increasingly run the procurement side of restaurants and grocery businesses, those agents will default to whichever supply network is structurally the cheapest and most reliable to connect to. Agripals' MCP server (see `README.md` Long-Term Vision and `docs/business-model.md`) is built to be that default — not because of a lock-in strategy, but because first-principles pricing means we should simply *be* the cheapest option, and agents optimize for cost.

---

## Open questions / next research items

- Who is the right SF logistics partner for the farm→restaurant leg, and are they willing to work off SMS-driven pickup/delivery confirmations rather than their own dispatch software?
- What tolerance should the AI grading system use when comparing farm-side and delivery-side photos before flagging a mismatch for human review, rather than auto-releasing escrow?
- What's the actual mechanism for holding and releasing escrow — a real payments/escrow provider integration, versus a simulated version for the early pilot?
- For Phase 3: which import/export logistics and customs-documentation providers exist that could plausibly expose (or already expose) an MCP server or API worth integrating with directly?

---

*This document should be read alongside `docs/business-model.md` (the full business model and risk analysis), `docs/founder-roadmap-35-days.md` (the near-term execution plan), `docs/agripals-sms-first-order-flow.md` (the SMS mechanics this GTM's operational model builds on), and `docs/fable-handoff-roadmap.md` (the product build brief) — this doc is the "why and in what order," those are the "how."*
