# Agripals — Business Model

## Thesis

**First-principles framing (2 → 1 → 0):** the traditional farmer-to-restaurant chain runs through at least one middleman — a wholesaler domestically, or an exporter *and* an importer *and* a wholesaler for imported product — and that middleman typically marks the price up roughly 2x. Applying the same first-principles thinking SpaceX used to price a rocket off its raw materials instead of a contractor's quote: cut the middleman out, go direct from farmer to restaurant, and the price converges on the actual cost of growing, handling, and moving the food — call that **1** relative to today's **2**. Food costs are trending toward zero over the longer run on top of that, driven by automation across the supply chain: robotics in farming and packing, autonomous/solar-powered trucking, and AI-coordinated logistics strip cost out of the physical production and movement of food itself, not just the markup — that's the **1 → 0** move. Agripals' near-term goal is proving 2 → 1 works, market by market and product by product; the long-term goal is 1 → 0. Full detail in `docs/go-to-market-strategy.md`.

The wedge is oysters, where the founder already has domain knowledge and supply relationships — and specifically, oysters go **direct from farmer to restaurant, with no wholesaler at all**, not just a better-negotiated wholesaler relationship. Launch market is San Francisco: recruit roughly 10 oyster farmers as direct supply, 10–20 SF restaurants as demand, and one SF-based logistics partner capable of the farm-to-restaurant leg. Trust and grading — traditionally a wholesaler's job — are handled instead by AI photo-grading (farm-side and delivery-side photos compared) and an escrow payment mechanism that only releases funds to the farmer once delivery and grading are confirmed. The long-term product is a procurement engine (the RFQ system) that generalizes across every ingredient a restaurant buys, for the categories where a direct farmer relationship isn't yet available.

**Supply intelligence via Databricks:** as orders and grading data accumulate, a Databricks pipeline replaces the judgment a human wholesaler used to provide — which farmers are consistently reliable, which logistics providers perform best, who has stock and when — solving the consistent-supply problem with data instead of relationships. This can be supplemented by proactively texting farmers for stock/grade/availability updates, since farmers, wholesalers, and trucking providers all respond well to plain SMS.

**Expansion path:** Phase 1 is SF oysters direct. Phase 2 extends the same direct-sourcing model to other gradable seafood in SF (shrimp, lobster, crab) — as many direct farm-to-restaurant lines as physically possible in one metro area before expanding geography. Phase 3 applies the identical logic to imported product, cutting out *both* the exporter and importer layers (working example: direct-from-fishery crab from Norway) — Agripals organizes logistics and customs documentation directly rather than through human importers/exporters, and it's worth researching whether any import/export logistics providers already expose an MCP server worth integrating with directly.

The mission underneath the product is bigger than the app: Agripals becomes the MCP server for food — a single endpoint that lets any AI agent send a food request from anywhere to anywhere and have it sourced, negotiated, and fulfilled, regardless of what channel or system is on the other end. Freshworks' Marketplace MCP Gateway is a working proof of this pattern at scale (one MCP endpoint abstracting hundreds of third-party API contracts so any AI agent can act without knowing which specific app it's actually talking to); Agripals is the food-specific version of that gateway, with wholesalers, farmers, and logistics partners reachable underneath over whatever channel each of them actually lives on — app, WhatsApp, SMS, or eventually direct agent-to-agent MCP calls.

---

## How It Works

### 1. The hook: 20 seconds to save 20%

A rep (initially the founder) walks into a café or restaurant and says: "I can save you 20% or more on input costs. It takes 20 seconds — just let me photograph your menu or your last supplier invoice."

The photo is fed to an AI model that extracts the products, quantities, and frequency the restaurant is likely buying (e.g. milk, oysters, produce).

### 2. Instant RFQ generation

For each extracted product, Agripals generates a Request for Quote (RFQ) — how many liters/units, what days, what grade/quality. This RFQ is sent two ways:

- **Direct match:** to wholesalers already on the platform who supply that product, so a quote can come back within a day or two.
- **Open broadcast:** a version of the RFQ visible to all wholesalers on the platform (even ones not yet connected to that restaurant), notifying them a new buyer wants that product. This is how the wholesaler side of the marketplace grows without Agripals having to manually recruit every supplier.

### 3. Land and expand, one category at a time

Once a wholesaler has earned trust on one product (oysters), Agripals cross-sells the relationship into adjacent categories for the same restaurant (milk, produce, etc.), and — separately — recommends that same trusted wholesaler to other restaurants nearby. Trust and supply relationships compound across the network instead of resetting with every new customer.

### 4. Farm drop (group buying)

Where it makes sense, Agripals clusters multiple restaurants in the same area into a single "farm drop" — one truck run from the farm gate that serves 5 restaurants instead of 1. This is the mechanism that gets closest to true farm-gate pricing:

- Farmer sells direct, cutting out one or more middlemen
- Logistics costs are shared across 5 orders instead of 1, making the delivery route economically viable for the driver
- Each restaurant pays less than they would sourcing individually
- Everyone in the chain — farmer, driver, restaurant — comes out ahead, which is what makes the model sustainable rather than a race-to-the-bottom on margin

### 5. Voice/SMS as the interface for non-technical suppliers

Many farmers and small wholesalers don't use apps or email. Agripals leans on phone-based interfaces (SMS today, per the existing oyster MVP; a callable LLM phone line as a future extension) so a wholesaler or restaurant can call a number and get real-time answers on stock and pricing without ever touching software.

---

## Why It Works

**The market structure creates natural early adopters.** The wholesaler market splits into a small number of large, entrenched players and a long tail of smaller, independent wholesalers who don't have strong existing relationships with restaurants. The large players have little incentive to join — full price transparency erodes the opacity that protects their margins, and they already have enough demand. The smaller players are the opposite: starved for restaurant access and willing to compete hard on price to win an RFQ. They are the supply-side beachhead.

**Trust transfers across categories and across customers.** Once a wholesaler has proven reliable on one RFQ, both the trust (from the restaurant) and the relationship (from Agripals) can be reused — for more products with the same restaurant, and for the same product with other restaurants. This is what turns a one-off transaction into a compounding network.

**Farm drops make the unit economics of "skip the middleman" actually work.** Direct-from-farmer sourcing is usually impractical for a single restaurant because the delivery economics don't work for a truck serving one stop. Clustering demand from several nearby restaurants is what makes farm-gate pricing viable for everyone in the chain, not just extractive for one party.

---

## Why Now (vs. 2019)

The founder was offered roughly $300K for 6% for a similar idea in 2019 and passed. What's different now:

- **LLMs remove the labor bottleneck.** The most expensive part of this model has always been the human labor of gathering quotes, calling wholesalers, and coordinating logistics — effectively a sales/procurement job. AI can now read a menu or invoice photo, infer purchasing patterns, draft an RFQ, and route it, without a human doing that work manually for every restaurant.
- **Conversational AI lowers the bar for non-technical participants.** Farmers and small wholesalers who won't install an app or fill out a web form will pick up a phone. LLM-powered voice/SMS interfaces make it possible to bring them into the network without asking them to change behavior.
- **The underlying trend (automation reducing food costs) is now visible and accelerating** — robotics in farming, autonomous and solar-powered trucking — giving the long-term "food toward zero" thesis more credibility with investors than it had in 2019.

This is worth stress-testing directly with investors and industry contacts, since "why now" is usually the first objection a VC will raise on a marketplace idea that's been tried before.

---

## What Can Go Wrong

- **Large wholesalers refuse to participate.** If the biggest suppliers see RFQ transparency as a threat to their margins and don't join, the platform may be structurally reliant on smaller wholesalers only — which could cap quality/reliability options for restaurants on some products.
- **Supply reliability during the MVP phase.** The existing oyster MVP already flags this: relying on 1–2 farmers is fragile. This risk carries forward as more categories are added.
- **RFQ fatigue / low wholesaler response rates.** If wholesalers get flooded with RFQs and response rates drop, the "20 seconds to save 20%" promise breaks down for restaurants waiting on quotes.
- **Farm drop logistics complexity.** Coordinating shared delivery routes across multiple restaurants and one farm requires real operational reliability (timing, quality consistency, dispute resolution) that is much harder to automate than the RFQ matching itself.
- **Restaurant trust and data sensitivity.** Asking to photograph a menu or invoice touches a restaurant's actual cost structure — some owners may be wary of who sees that data, and how it's used (e.g. is Agripals also selling their data or leverage to competitors on the wholesaler side).
- **Regulatory/food safety compliance** varies by product and region (especially seafood) and could slow expansion beyond the initial oyster corridor.
- **Timeline pressure.** A 35-day funding goal is aggressive for a marketplace with two-sided cold-start problems. Investors will want to see real transaction data, not just the concept, which is why the roadmap prioritizes the 10-delivery oyster proof point and RFQ conversion data early.

---

## What Can Go Right

- **The values narrative reinforces the pricing narrative, not just marketing polish.** Cutting out the middleman also means fewer redundant handling/transport steps (environmental benefit), more of the price going directly to the farmer (often a small, family-run operation), and full provenance — a restaurant knows exactly which farm its food came from, not just which wholesaler's truck it arrived on. "Sunlight is the best transparency" is the tagline; the environmental and local-farmer story is the substance behind it, not decoration on top of a pure price play.
- **Compounding trust network.** Each successful RFQ makes the next one easier (referrals across restaurants, cross-selling across categories), which is the kind of flywheel VCs look for in marketplace businesses.
- **Small wholesalers as eager, price-aggressive supply.** The very segment shut out of restaurant relationships today becomes highly motivated distribution for Agripals, potentially undercutting incumbent pricing quickly.
- **Farm drops become a genuinely defensible cost advantage** once there's enough restaurant density in a given area, because the logistics economics only get better as more restaurants join a cluster — a real moat, not just a feature.
- **The SMS/voice-first design lowers the adoption barrier** for exactly the participants (farmers, small wholesalers) that most competitors ignore in favor of app-based platforms, which could be Agripals' clearest differentiation.
- **The category-expansion path is natural**: oysters → other seafood/perishables → dry goods → eventually most of a restaurant's supply chain, all riding the same trust and RFQ infrastructure.
- **Long-term positioning as infrastructure, not just a marketplace** — if AI agents increasingly handle procurement decisions industry-wide, Agripals' RFQ/sourcing/logistics layer could become the backend those agents call into (an MCP server for food), rather than a consumer-facing app competing for restaurant attention. Freshworks reaching for exactly this architecture for enterprise service workflows in 2026 (a unified MCP Gateway sitting between AI agents and hundreds of underlying apps) is a signal that this pattern is becoming the default way agent-native products get built — Agripals doesn't need to invent this shape, just apply it to food.

---

*This document synthesizes founder notes from a mentor session and should be treated as a working thesis to pressure-test with real restaurant, wholesaler, and farmer conversations during the 35-day sprint — not a finished plan.*
