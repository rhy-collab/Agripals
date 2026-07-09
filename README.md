# Agripals

**Mission:** Sunlight is the best transparency. Food supply chains are opaque by design — middlemen roughly double the price between farmer and restaurant, and they keep it that way on purpose. Agripals goes first-principles: cut out the wholesalers, importers, and exporters that add markup without adding value, and go direct from farmer to restaurant. That takes the true cost of food from **2 (today, with middlemen) to 1 (direct, at first-principles cost)**. As robotics, AI, and automation strip cost out of farming and logistics themselves, we drive it from **1 toward 0**. Long-term, Agripals becomes the MCP server for food — so any AI agent (a restaurant's, a wholesaler's, a farmer's, or someone else's entirely) can send a food request from anywhere to anywhere and have it sourced, quoted, and delivered without caring what system, channel, or human is on the other end. Once we're structurally the cheapest way to get food, connecting to Agripals' MCP server becomes as fundamental to running a restaurant or grocery business as having a bank account.

---

## What is Agripals?

Agripals is a food logistics platform that connects farmers, transporters, and chefs using AI agents and simple communication tools (initially SMS).

We start with oysters sourced from Tomales Bay, California, proving the model with **10 successful deliveries** into San Francisco before scaling globally.

---

## The SMS-First MVP

**Why SMS-first?**  
Farmers often don't use email or apps. SMS is universal, simple, and reliable.

**How it works:**
1. **Chef** places a weekly order via SMS (e.g., "5 dozen Grade A oysters").
2. **Agripals** confirms availability with the farmer.
3. **Farmer** confirms stock and prepares oysters.
4. **Driver** picks up from the farmer (Tomales Bay) and delivers to the depot (Petaluma).
5. **Depot** forwards to San Francisco.
6. **Final driver** delivers to chef.
7. Each step is confirmed via SMS with a simple 10-digit order number.

**No printers. No labels. Just texts, handwritten order numbers, and photos.**

---

## Early Users

- **Chef:** TBD — target is a pilot restaurant in San Francisco (see App-Prototype demo persona "Rosa's Kitchen, Mission St")
- **Farmer:** TBD — Tomales Bay, CA oyster farmer to be secured during the SF sprint
- **Transport:** TBD — Bay Area cold-chain logistics partner (Petaluma depot)
- **Agripals Operator:** Rhys, based in San Francisco (securing supply, coordinating SMS, ensuring deliveries)

---

## Milestone 1: First 10 Deliveries

Prove the model works. Track:
- Order success rate
- Delivery time
- Communication bottlenecks
- Farmer/chef satisfaction

**Success = 10 clean deliveries** → then we approach VCs for $300K seed funding.

---

## What's Manual Now vs Automated Later

### Manual (MVP):
- Rhys personally secures supply from 3+ Northern California farmers
- SMS messages are sent manually
- Order numbers are handwritten on bags
- Photos confirm each handoff
- Spreadsheet tracks status

### Automated (Post-MVP):
- AI agent handles SMS routing
- QR codes replace handwritten numbers
- Auto-generated labels
- Real-time tracking dashboard
- Farmer network auto-balances supply

---

## Repo Structure

```
/docs       - Decision logs, meeting notes, operational playbooks
/ops        - Spreadsheets, templates, status trackers
/prompts    - SMS templates, AI agent prompts
/scripts    - Automation scripts (future)
/data       - Sample order data (no real customer info)
```

---

## What Makes This Different?

1. **AI-native from day one:** We design for a future where agents coordinate logistics, not humans.
2. **Farmer-first design:** Simple tools that work for people who don't use apps.
3. **Trending to zero:** As automation scales (robots farming, packing, delivering), food costs drop toward zero.
4. **Jack Dorsey parallel:** Just like his payment MCP server moves money anywhere, Agripals's MCP server moves food anywhere — restaurant to wholesaler, wholesaler to farmer, agent to agent, regardless of whether either side is on our app, WhatsApp, SMS, or someone else's software entirely.
5. **Channel-agnostic by design:** the same request/quote/order primitives work whether they arrive as a chat message in our app, a WhatsApp text, an SMS, or (eventually) a direct call from another AI agent over MCP. The channel is just transport — the mission is the movement of food itself.

---

## Next Actions

- [ ] Onboard first SF pilot restaurant (WhatsApp or SMS)
- [ ] Secure a Tomales Bay, CA oyster farmer contact
- [ ] Line up a Bay Area cold-chain logistics partner (Petaluma depot)
- [ ] Design first SMS templates
- [ ] Build ops spreadsheet
- [ ] Execute first delivery

---

## Blockers

- Supply reliability (solved by Rhys personally managing 3+ Northern California farmers initially)
- Logistics partner not yet secured (needs a meeting with a Bay Area cold-chain transport operator)
- Packaging (currently using hessian bags + plastic; cool-chain boxes later)

---

## Funding Plan

**After 10 deliveries:**  
Approach VCs with proof of concept → raise $300K seed → hire team → automate → scale to prawns, vegetables, etc.

---

## Long-Term Vision: the Agripals MCP Server

In a world with 2 billion AI agents, Agripals becomes the MCP server for food — a single endpoint any agent can call to move a food request anywhere:
- Tracking
- Sourcing
- Pricing
- Grading
- Logistics
- Delivery

**What "from anywhere to anywhere" actually means:** today, a request enters through one of a handful of channels — our app, WhatsApp, SMS — and gets routed to a wholesaler through whichever channel *they* actually use. That's Choco's model (orders converted into the supplier's format of choice: email, WhatsApp, text, fax, ERP) and it's the right one. The next step is exposing that same routing layer as an MCP server: instead of only a human or our own chat UI initiating a request, *any* AI agent — a restaurant's own ordering agent, a wholesaler's own inventory agent, a farmer's agent, a completely unrelated third party's agent — can call a small set of tools (`send_rfq`, `get_quote`, `place_order`, `check_stock`, `confirm_delivery`) and have Agripals handle sourcing, negotiation, and fulfillment underneath, regardless of what channel or system is actually on the other end.

Freshworks has already validated this pattern at scale: their Marketplace MCP Server Gateway gives any AI agent a single MCP endpoint that abstracts hundreds of different third-party API contracts, so an agent doesn't need to know or care which specific app it's actually talking to. Agripals's version of that gateway is food-specific — the tools are about sourcing and moving food, and the "third-party apps" underneath are wholesalers, farmers, and logistics partners, reachable over whatever channel each of them actually lives on.

When robots produce and deliver food end-to-end, this same infrastructure — one MCP endpoint, many channels underneath — ensures equitable access to near-free, quality nutrition globally.

---

**Status:** Pre-launch MVP setup  
**Repository:** https://github.com/rhy-collab/agripals  
**Lead:** Rhys  
**Contact:** Discord (Herbie), Hermes Desktop, Obsidian Sync
