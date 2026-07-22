# Agripals Automation — investor pitch

**Positioning line:** *Choco automated the distributor's order desk. We're automating the restaurant's back office — and using it to sell them food.*

---

## 1. The one-slide version

Choco built a **$1.2B** company by pointing AI at the messiest data in food: the orders that arrive at distributors as emails, texts, voicemails, photos and handwritten notes. They now process **8.8M+ orders a year** for **21,000+ distributors** and **100,000+ buyers**, cutting manual order entry by **up to 50%**.

They won the **sell side**.

The **buy side** — the 100,000+ independent restaurants receiving those invoices — is still running on a shoebox of paper, a spreadsheet, and a quarterly panic. Same messy inputs. Same AI unlock. Nobody has claimed it.

Agripals Automation is the buy-side counterpart: **text us a photo of any invoice and we run your back office.** And because we also source food farm-direct, every invoice we read tells us exactly what that restaurant buys, from whom, and at what price — which is the best demand signal in the industry.

**Software gets us in the door. Supply is how we get paid twice.**

---

## 2. Why now — Choco de-risked our core technical bet

Three years ago this product was not buildable. The hard part was never OCR; Choco's own VP Engineering named the real problem precisely:

> "The real problem was implicit context: customer-specific SKU mappings, unit preferences, delivery patterns. That knowledge lived in the heads of order desk reps, and we needed to encode it into inference layers that resolve ambiguity at the point of order capture."

That is now a solved category of problem, and Choco has proven it at production scale — **200B+ tokens in production, error rates below 1–5%**, with an "Autopilot" mode that automates once confidence thresholds are met and routes edge cases to humans.

We are not betting on whether messy food paperwork can be turned into structured data. **That bet has already been won.** We are betting on *who owns the restaurant side of it.*

Two further things Choco validated for us:

- **The channel is messaging, not software.** They built a VoiceAgent because the industry orders by phone and text. Their stated adoption lesson: *"Customers didn't need to change how they ordered."* Our entire wedge is that same principle applied to the buyer.
- **Trust arrives through the customer's own data.** Their CEO: *"Once customers saw it working with their own orders, trust followed quickly."* Hence our CTA is "send us your last invoice" — not "book a demo."

---

## 3. The problem (buy side)

An independent restaurant with 20–80 covers has no finance team. Concretely:

- Invoices arrive by email, text, photo and paper, and get filed in a drawer until the accountant asks.
- **Price creep is invisible.** Salmon goes up 8% and they find out weeks later — in aggregate, in a P&L, long after they could have changed the menu or the supplier.
- **They don't know their real food cost per dish** until someone manually costs a menu, which almost nobody does more than once a year.
- **Traceability is a folder.** If there's a recall, reconstructing which lot went onto which plate is a night of digging.
- **Cash flow is guesswork.** What's owed, what's due, what can be paid early for a discount — all in the owner's head.

Restaurants run at thin margins and fail for exactly this reason: not because the food was bad, but because nobody had time to look at the numbers until it was too late.

---

## 4. The product

**One interface: text.** No app, no onboarding, no migration, no staff training.

| Capability | What it does |
|---|---|
| Invoice capture | Photo or forward → every line item, price, quantity, lot number extracted and filed against the right supplier |
| Price movements | "Salmon is up 8% · +$19.40 this week" — *before* it lands on the next invoice, with alternatives |
| Menu costing | Photograph the menu once; invoice lines are matched to dishes → true food cost and margin per plate |
| Traceability | Lot ↔ farm ↔ invoice ↔ dishes served, recall-ready and exportable |
| Cash flow & credit | What's owed, what's due when, what to pay early for a discount |
| QuickBooks | Categorised and synced as you go, not rebuilt at quarter end |
| The assistant | Ask it anything about your business, like an accountant who never sleeps |

Live product surface: **agripals.com/automation**

**The technical moat is the same one Choco identified:** per-venue implicit context. Every invoice teaches us that restaurant's supplier quirks, unit conventions, SKU aliases and ordering rhythm. Month three is materially better than day one, and that accumulated context is not portable to a competitor.

---

## 5. The second act — why this is not just SaaS

This is the part a generalist SaaS investor will miss.

Every invoice we process is a **priced, dated, real transaction** between a named supplier and a named restaurant. At any scale, that becomes:

1. **A live price index** for regional food — the most granular, least public pricing data in the industry.
2. **Perfect demand signal** — we know precisely what each venue buys, how often, and what they pay.
3. **Aggregated buying power** — we can bundle demand across venues and go direct to farms.

Agripals already operates the farm-direct wholesale side (`agripals.com`). So the automation product isn't only a subscription — it's the **customer acquisition and demand-sensing layer for a supply business**. We can tell a chef "you're paying 14% over market for oysters," and then be the ones who supply them.

**Choco structurally cannot do this.** Their customer is the distributor; their revenue depends on distributor goodwill. Ours is the buyer, so our incentive is to drive the buyer's cost down — including by disintermediating the distributor. Aligned with the buyer is a different, and currently vacant, position.

---

## 6. Business model — three layers

1. **Subscription (near term).** Per-venue SaaS for the automation product. Pricing is being set with the first cohort — deliberately not published yet.
2. **Supply margin (the big one).** Farm-direct product sold into the venues we already serve. Even thin per-order margin compounds because frequency is high and the acquisition cost is already paid by layer 1.
3. **Financial services (later).** Early-payment discounts, supplier credit, working capital — underwritten by invoice data nobody else holds.

Choco monetises through subscriptions, transaction fees and enterprise contracts. We have that, **plus** physical margin.

---

## 7. Market — built bottom-up, not top-down

We deliberately avoid the "$330B US restaurant food spend" framing; it's true and useless.

The honest unit is: **independent restaurants that (a) buy fresh produce/seafood regularly and (b) have no finance function.** Beachhead is San Francisco.

An internal adversarial audit we commissioned on our own SF numbers concluded that earlier top-down projections were overstated and that a realistic SF-only Year-5 revenue is in the **hundreds of thousands, not millions** — which is exactly why the automation layer matters: it is how one city becomes many without putting a truck in each of them.

**Model to be completed with the first cohort's real pricing and retention.** We would rather show an investor a defensible bottom-up model built on ten real customers than a top-down TAM slide.

---

## 8. Go to market

- **Land with automation.** The CTA is "send us your last invoice." Zero-friction, instantly demonstrable value, no procurement cycle.
- **Text-first, SF-first.** Start where we already have farm relationships (Northern California oyster farms → SF kitchens).
- **Convert to supply.** Once we can see what a venue buys and what they overpay for, the farm-direct offer writes itself.
- **Density over spread.** Restaurants within a few blocks share suppliers and delivery runs — clustering makes both the data and the logistics cheaper.

---

## 9. Competition

| | Who they serve | Why we're different |
|---|---|---|
| **Choco** | Distributors (sell side) | We serve the buyer, and our incentives point the other way |
| **MarketMan / xtraCHEF / Toast** | Restaurants | Require onboarding, POS integration, staff training. We require a text message. |
| **Accountants / bookkeepers** | Restaurants | Retrospective and monthly. We're same-day and forward-looking. |
| **Spreadsheets & the drawer** | — | The actual incumbent, and the one to beat |

The real competitor is inertia. That's precisely why the product cannot require behaviour change.

---

## 10. Status — honest

**Pre-revenue, pre-launch.** What exists today:

- Live landing pages and positioning: `agripals.com` (wholesale) and `agripals.com/automation`
- A working AI agent prototype in-repo (Claude + tool use, restaurant/supplier conversation flows)
- A clickable four-view product prototype
- Farm relationships in Northern California and an SF beachhead thesis
- Written operational specs: SMS order-number spine, customer DB + RAG roadmap, ops dashboard

**Not yet built:** the invoice OCR pipeline, persistence, the SMS number, QuickBooks integration. No paying customers, no LOIs.

We are raising to prove one specific thing: **that a restaurant will text us an invoice, and keep doing it.**

---

## 11. The ask & milestone map

Raise to fund roughly 12–18 months to these de-risking milestones:

1. **Invoice → structured data at production accuracy** with an eval harness from day one (Choco's own lesson: start with a ground-truth set of 10–20 examples).
2. **A live inbound number** and the first 10 restaurants texting invoices weekly.
3. **Retention**, which is the only metric that matters here — does week 8 look like week 1?
4. **First supply conversion** — an automation customer buying farm-direct through us.
5. **Unit economics** on both layers, bottom-up, from real transactions.

*(Raise amount and use-of-funds split to be set with Rhys — deliberately not invented here.)*

---

## 12. Risks we'd rather name than hide

- **Accuracy and trust.** A wrong number in a chef's cash flow is worse than no number. Mitigation: confidence thresholds with human review, exactly as Choco does.
- **Incumbent expansion.** Choco is well-capitalised and could turn toward the buyer. Our defence is incentive alignment and the supply business they can't replicate.
- **The supply side is physical.** Farm-direct needs a depot — a shed with a fridge. That's real capex/opex and the hardest part of the model.
- **Willingness to pay is unproven.** Independent restaurants are famously price-sensitive. This is the core thing the raise tests.
- **Data sensitivity.** We hold a venue's full cost base. Handling and permissions have to be right from day one.

---

## 13. The bet in one paragraph

Choco proved that AI can absorb the food industry's messiest inputs, and built a **$1.2B, 435-person** company doing it for distributors. The identical unlock exists on the buyer's side of the same invoice, where the customer is smaller, more numerous, worse served, and — critically — where the company that wins their trust also learns exactly what they buy and can sell it to them directly. **We're building the buy-side Choco, with a supply business attached.**

---

### Sources

- [Choco automates food distribution with AI agents — OpenAI case study](https://openai.com/index/choco/)
- [Choco — Tracxn company profile](https://tracxn.com/d/companies/choco/__otHGiTPOXMhdmXvthh6B9pDh8O9jKayLeZQFBReSb0E)
- [Choco Achieves Unicorn Status — Choco press](https://choco.com/us/press/choco-achieves-unicorn-status)
- [Choco — Crunchbase profile](https://www.crunchbase.com/organization/choco)
- [Choco — the complete growth platform for food distributors](https://choco.com/us/)
