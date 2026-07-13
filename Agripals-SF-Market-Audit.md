# Agripals — San Francisco Market-Sizing Audit
### An adversarial VC / market-sizing / unit-economics review
*Prepared as a deliberately skeptical diligence memo. Goal: stop weak, inflated, or embarrassing numbers reaching investors. Figures labelled **[hard]** come from primary datasets/filings; **[est]** are reasoned estimates; dataset dates and links are in §15.*

---

## 1. Executive verdict

**The model is arithmetically consistent but rests on three assumptions that do not survive scrutiny: 40% penetration, ~$3B SF restaurant food spend, and a "5 lines × $100/week" build-up. Correct those and the honest San Francisco outcome is roughly one-tenth of the headline: ~$300k–$900k of Agripals revenue by Year 5, not $2.08M.**

- SF has **~4,000 dine-in restaurants** — that specific number is *fine* [hard-ish]. The total food-service universe (incl. QSR, cafés, bars, caterers, trucks, institutional) is larger, ~4,900; the **realistically addressable** base for a farm-direct produce/seafood platform is **~3,000**.
- SF restaurants buy **~$1.8–2.0B of food & beverage inputs per year** [est, triangulated], **not $3B**. $3B is only defensible if you mean *all* SF foodservice (adding hotels + institutional + catering).
- **40% penetration is implausible.** No funded comparable has shown ~40% *active-transaction* share in a single city. A farm-direct model wins **one of a restaurant's 3–5 supplier slots**, faces ~60% three-year restaurant churn, and competes with Chefs' Warehouse ($3.8B) already occupying the SF specialty lane. Realistic: **3–8% by Year 3, 8–15% by Year 5, ~15–25% terminal.**
- **"$500/week across 5 lines" double-counts.** A farm-direct platform addresses **~2 of the 5 categories** (produce + seafood ≈ 20–35% of food spend) and captures only part of those. Realistic captured GMV ≈ **$250–$800/week** for a committed full-service restaurant; much less for cafés/bars.
- **A 5% take rate is a defensible *price*, but not a *margin*.** The four public food distributors net **1.3–4.4% operating** on 11–24% gross. Payment processing alone (~2.9% of GMV) consumes >half a 5% take. Nearly every food-ordering comp (Choco, BlueCart, Pepper, Cut+Dry, Local Line) monetises via **SaaS, not a percentage rake.**

**Net:** SF alone cannot fund the company. It is a *proof-of-concept beachhead*. The equity story is national rollout + the services/data layer — not the SF GMV number.

---

## 2. Original-assumptions audit (graded)

Grades: **Unsupported · Plausible-but-unverified · Reasonable · Aggressive · Implausible · Mathematically-correct-but-commercially-unrealistic (MCCU)**

| # | Assumption | Grade | Why |
|---|---|---|---|
| 1 | ~4,000 restaurants/cafés/bars | **Reasonable** | Matches GGRA's 3,974 *dine-in* (2021) [hard]. Understates the *total* food-service universe (~4,900) but fine as "restaurants." |
| 2 | ~$3B/yr food spend | **Aggressive (overstated ~50%)** | Restaurant-only food COGS ≈ $1.8–2.0B base. $3B ≈ *all SF foodservice*, not restaurants. |
| 3 | Reach 40% of SF restaurants | **Implausible** | No comp shows ~40% active per-city share; farm-direct wins ≤1 supplier slot; ~60% 3-yr churn; entrenched incumbents. |
| 4 | Each restaurant buys across 5 product lines | **MCCU** | Farm-direct addresses ~2 of 5 (produce+seafood). Dry goods, chemicals, disposables, most dairy/pantry are out of scope. |
| 5 | $100/week per line (= $500/wk) | **Aggressive** | Reasonable only for a committed full-service account; overstated as a blended average; the "5 independent lines" framing inflates the denominator. |
| 6 | 5% take rate | **Plausible-but-unverified (as price); Implausible (as net margin)** | 5% gross is at the top of the B2B-food band; net 5% exceeds what any public food distributor earns. |
| 7 | $41.6M GMV / $2.08M revenue | **MCCU** | Arithmetic is right; it just requires assumptions 3–5, which fail. Realistic SF Y5 revenue ≈ $150k–$900k. |

---

## 3. Source-quality assessment

- **Strongest (primary):** US Census Economic Census / CBP (SF County Sector 72 sales, 2022) [hard]; NRA California / congressional-district fact sheets (BLS+Census-sourced, 2025) [hard]; NRA 2024 food-cost benchmarks [hard]; SEC 10-Ks for Sysco/US Foods/PFG/Chefs' Warehouse (FY2024) [hard]; SFDPH food-facility permits & DataSF business registry [hard]; SF Travel lodging statistics [hard].
- **Directional (secondary):** private-company GMV/ARR/funding (Choco, Cut+Dry, BlueCart) from aggregators; directory restaurant counts (Yelp/OysterLink) — used only as cross-checks.
- **Not machine-retrievable this session (flagged, not fabricated):** exact SF-County NAICS-722 sub-code CBP tables and CDTFA county × business-type taxable-sales (both need API keys); substituted with two independent methods that converge.
- **Discarded:** the "$36/order" figure that appears in searches — that is **consumer food-delivery AOV, irrelevant to B2B.**

---

## 4. Restaurant-count research (City & County of SF = FIPS 06075; SF city = SF county exactly)

| Source (year) | Measures | Number |
|---|---|---|
| Census QuickFacts — employer establishments, all industries (2023) [hard] | all-industry | 33,378 |
| BLS QCEW via FRED, all private establishments (Q3 2025) [hard] | all-industry ceiling | 69,669 |
| SFDPH food-facility inspections (2018–19) [hard] | permitted food facilities | ~5,946–6,253 |
| GGRA / SF permit data via SF Standard (2021) [hard-ish] | active **dine-in** establishments | **3,974** (down from ~4,520 in 2019) |
| NRA CA-11 congressional district (≈ SF), eating-&-drinking (2025) [hard] | establishments / jobs | 3,757 / 57,886 |
| Directory scrapes (Yelp/OysterLink, 2025) [soft] | "restaurants" listings | 2,862–4,395 |

**Why they differ:** establishments vs firms vs permits vs listings; employer (33k) vs nonemployer (87k) sole-props; active vs licensed (permits lag both ways); NAICS 722 (incl. bars/caterers/trucks/institutional) ≠ "restaurants."

**Best estimates —** total SF food-service (NAICS 722, active): **Low ~4,200 · Base ~4,900 · High ~6,300.**
**Addressable** (independent full- + limited-service + fresh-buying cafés; less locked national chains, pure bars, dormant permits): **Base ~3,000 (range ~2,300–3,600).**

---

## 5. Total food-purchasing market (three methods → reconciled)

SF County Sector-72 (accommodation + food) sales 2022 = **$8.14B** [hard]. Strip hotels (accommodation receipts ≈ room revenue $1.75B ÷ ~0.65 ≈ $2.4–2.9B) → **SF restaurant/bar (722) sales 2022 ≈ $5.2–5.7B** [est]. Adjust to current (food-away CPI +~12% + recovery) → **~$6.0–7.5B, base ~$6.5B** [est].

- **Method 1 — Revenue × food-cost %:** food-cost median **32%** (NRA 2024) [hard].
  - Low $5.5B × 26% = **$1.43B** · Base $6.5B × 30% = **$1.95B** · High $8.0B × 34% = **$2.72B**
- **Method 2 — Establishments × avg purchasing:** ~4,000 × ~$480k food/bev purchasing per establishment (= 30% × ~$1.6M sales) ≈ **~$1.9B** [est].
- **Method 3 — Employment × sales/employee × 30%:** ~58–62k jobs × ~$95–105k sales/employee × 30% ≈ **~$1.7–1.9B** [est] (also validates the sales anchor).

**Reconciled SF restaurant food & beverage purchasing: Low $1.4B · Base ~$1.9–2.0B · High $2.7B.** → **The "$3B" claim is above the high case for restaurants.** $3B is defensible only for *all SF foodservice* (restaurants + hotels + institutional + catering).

*Fresh sub-pool actually served (produce + seafood ≈ 20–35% of food spend): **~$400–650M/yr** — this, not $2–3B, is Agripals' true SF addressable GMV pool.*

---

## 6. Penetration analysis (share of ~3,900 SF establishments *actively transacting*)

**Market structure [hard]:** top-3 broadliners ≈ **~$122B (Sysco $55.3B + US Foods $37.9B + PFG $29.0B foodservice segments) ≈ 30–35% of the ~$350–400B US market**; the rest fragmented across specialty/local. **Chefs' Warehouse ($3.8B)** already leads the SF specialty/premium lane. Restaurants use **3–5 suppliers** (1 broadline anchor + 1–2 specialty); farm-direct can win **≤1 slot**. Only **~40% of independents** run even a digital POS (a *more essential* tool). Churn: **~26% close in year 1, ~60% by year 3**; SF establishments down ~5% vs 2019. No comp discloses ~40% per-city active share.

| Horizon | Realistic active penetration | ~# restaurants (of ~3,000 addressable) |
|---|---|---|
| Year 1 | **0.5–2%** | ~15–60 |
| Year 3 | **3–8%** | ~90–240 |
| Year 5 | **8–15%** | ~240–450 |
| Terminal max | **15–25%** | ~450–750 |
| *"40%"* | *Implausible* | *~1,200–1,600* |

---

## 7. Spend-per-restaurant analysis

Weekly food purchasing = (annual revenue ÷ 52) × food-cost %. Food-cost % [hard, NRA 2024]; revenue bands [est].

| Segment | Weekly total food purchasing |
|---|---|
| Small café / coffee | ~$1.2k–$3.0k (mostly dairy/pantry/coffee — little addressable) |
| Casual / full-service (independent) | ~$6k–$9.7k |
| Fine dining | ~$9k–$23k |
| Bar-with-food | ~$3k–$6k (food only) |
| High-volume | ~$16k–$30k |

**Category shares [est]:** protein/meat 30–40%, produce 15–25%, dairy 8–15%, pantry 15–20%, seafood ~5–15% (usually a slice *of* protein).

**Capture reality (three haircuts):** (a) addressable categories ≈ **produce + seafood only** → ~$1,400–$2,800/wk ceiling on a ~$7k base; (b) Agripals is a **secondary "specialty slot" supplier** by definition; (c) broadline gravity keeps some produce with the anchor. Realistic capture of the produce+seafood pool: **~20–70%.**

| Scenario | Addressable (produce+seafood) | Capture | **Captured weekly GMV** |
|---|---|---|---|
| Low | ~$1,400 | 20% | **~$280/wk** (~$14.6k/yr) |
| Base | ~$2,000 | 40% | **~$800/wk** (~$41.6k/yr, committed full-service) |
| High | ~$2,800 | 70% | **~$1,960/wk** |

→ **$500/wk is reasonable for a produce/seafood-forward full-service account, but too high as a *blended* average** across a base that includes cafés and bars.

---

## 8. Take-rate & unit-economics analysis

**The ladder:** GMV → ×take = **Revenue** → −cost of revenue = **Gross profit** → −variable per-order = **Contribution** → −fixed (team/CAC) = **EBITDA**.

**Comparable margins [hard, FY2024 10-Ks]:** Sysco 19.4% gross / ~4.1% op; US Foods 17.3% / ~3.0%; PFG ~11.3% / ~1.3%; Chefs' Warehouse ~24% / ~2.5%. **Owning the whole chain nets only 1.3–4.4%.**

**What eats a 5% take (per $100 order = $5.00 revenue):** payment processing ~2.9% of GMV = **~$2.90 (≈58% of revenue)**; refunds/spoilage (~6% industry shrink) ~1%; support ~0.5–1.5%; credit losses (net-30) ~0.5–2%; plus CAC, insurance, compliance, working capital, any delivery subsidy. → **contribution margin realistically ~1–2% of GMV (~20–40% of revenue).**

**Model comps [hard/directional]:** Faire (non-perishable) charges **15%** and still offers **0%** on self-sourced buyers. Choco, BlueCart, Cut+Dry, Pepper, Local Line all monetise via **SaaS/embedded payments, not a rake** (Choco cut ~its whole restaurant team in Apr 2024 after failing to make a take-rate stick).

**Verdict:** 5% *gross take* = aggressive-but-defensible price; **net 5% = Implausible for food.** For the deck: *"5% take on GMV" ≠ "5% margin."*

---

## 9. Comparable-company research

| Company | Model | Take rate / margin | Scale | Funding | Read |
|---|---|---|---|---|---|
| Sysco | Broadline distributor | 19.4% gross / ~4.1% op | $78.8B | Public | Incumbent; owns supply |
| US Foods | Broadline | 17.3% / ~3.0% | $37.9B | Public | Incumbent |
| PFG | Distributor | ~11.3% / ~1.3% | $58.3B | Public | Thin margins |
| Chefs' Warehouse | Specialty/premium | ~24% / ~2.5% | $3.8B | Public | **Already the SF specialty leader** |
| Faire | Wholesale marketplace (non-food) | 15% (25% first order); 0% Faire Direct | — | ~$1.7B raised | High-margin, non-perishable — still tops ~15% |
| Choco | Restaurant↔supplier app | **SaaS ~$20–25/mo** | ~$900M GMV; ~$50M ARR | ~$301M; $1.2B val | Layoffs 2024; couldn't monetise a take rate |
| BlueCart | B2B ordering SaaS+mktpl | SaaS | 48k–119k restaurants | ~$31M | Modest scale over ~10 yrs |
| Cut+Dry | SaaS for distributors | SaaS | 160k operators via 450+ distributors | small | White-label backbone, not restaurant-direct |
| Pepper | SaaS + payments for distributors | SaaS | 100k+ catalogs | ~$100M+ | SaaS, not rake |
| Cheetah | Wholesale→D2C pivot | markup/delivery | — | $36M+ | Pivoted repeatedly; struggled |
| Local Line | Farm-to-fork SaaS | **Flat $69–319/mo; 0% of revenue** | farms/hubs | small | Deliberately no take rate |

**Pattern:** the durable model in food B2B is **SaaS + embedded payments**, not a percentage take. No player runs a durable ~5%+ *net* take on food GMV.

---

## 10. Rebuilt bottom-up model (SF only)

Formulas: `Active = Addressable × Penetration` · `Annual GMV = Active × WeeklyGMV × 52` · `Net revenue = GMV × TakeRate` · `Gross profit ≈ Revenue − (2.9%×GMV payments) − (0.5%×GMV hosting/support)` · `Contribution ≈ ~20–30% of Revenue` · `EBITDA = Contribution − OpEx`.

| | **Low** | **Base** | **High** |
|---|---|---|---|
| Addressable restaurants | 2,500 | 3,000 | 3,600 |
| Weekly captured GMV/active | $250 | $400 | $650 |
| Take rate | 4% | 5% | 5% |
| **Year 1** — penetration | 0.5% | 1% | 2% |
| Active | 13 | 30 | 72 |
| Annual GMV | $169k | $624k | $2.43M |
| Net revenue | ~$6.8k | ~$31k | ~$122k |
| **Year 3** — penetration | 3% | 5% | 8% |
| Active | 75 | 150 | 288 |
| Annual GMV | $975k | $3.12M | $9.73M |
| Net revenue | ~$39k | ~$156k | ~$487k |
| **Year 5** — penetration | 6% | 10% | 15% |
| Active | 150 | 300 | 540 |
| Annual GMV | **$1.95M** | **$6.24M** | **$18.25M** |
| Net revenue | **~$78k** | **~$312k** | **~$913k** |
| Contribution margin (~1–2% GMV) | ~$20–40k | ~$60–120k | ~$180–360k |
| Est. OpEx (lean SF team) | ~$1.0–1.5M | ~$1.5–2.5M | ~$2.5–4M |
| **EBITDA (SF only)** | **≈ −$1.0–1.5M** | **≈ −$1.5–2.4M** | **≈ −$2–3.5M** |

**Terminal SF ceiling** (22% × 3,000 × $500/wk × 52 × 5%) ≈ **$17.2M GMV → ~$860k revenue.** *Even the SF maximum is under ~$1M revenue.* SF is a beachhead, not the business.

---

## 11. Sensitivity analysis (annual revenue at 5% take = Restaurants × WeeklyGMV × 52 × 5%)

| Restaurants ↓ / Weekly GMV → | $100 | $250 | $500 | $1,000 | $2,000 |
|---|---|---|---|---|---|
| 500 | $130k | $325k | $650k | $1.30M | $2.60M |
| 1,000 | $260k | $650k | $1.30M | $2.60M | $5.20M |
| 1,500 | $390k | $975k | **$1.95M** | $3.90M | $7.80M |
| 2,000 | $520k | $1.30M | $2.60M | $5.20M | $10.40M |

*Take-rate scaling vs 5%: 3% = ×0.6, 8% = ×1.6, 12% = ×2.4.* The original **$2.08M** sits at **~1,600 restaurants × $500/wk × 5%** — i.e. it *requires* ~40% penetration.

**Biggest lever:** **active-restaurant count (penetration)** — it is both the widest-swinging input (0.5%→40% = ~80×) and the least defensible. Weekly GMV is second (~8×). Take rate is the narrowest (4×) and the one most constrained by reality.

---

## 12. Investor objections (what they will attack first)

1. **"40% is a fantasy."** Show any comp that hit 40% active in one city. (You can't.)
2. **"$3B isn't restaurant food spend."** Census implies ~$2B for restaurants.
3. **"5 lines × $100 double-counts."** You supply ~2 of 5 categories.
4. **"5% take ≠ 5% margin."** Distributors net 1–4%; payments eat half your take.
5. **"SF revenue is <$1M even at your ceiling — where's the business?"** (Answer must be expansion + services/data.)
6. **"Churn eats your base."** 60% of restaurants gone by year 3.

---

## 13. Defensible VC answer (conservative, hard to challenge)

> "San Francisco restaurants buy roughly **$2 billion of food a year**. The slice we actually serve — fresh produce and seafood for independent, chef-driven kitchens — is about **$400–600 million** of that. There are ~3,000 addressable restaurants; we're not modelling market domination — a credible **8–15% active share by year 5 (~250–450 restaurants)** at ~$400–500/week each is **~$6–10M of GMV**. At a 5% take that's **~$300–500k of SF revenue** — deliberately small, because **SF is our proof-of-concept**. The company is built on (1) rolling the same playbook city by city, and (2) the services and data layer that opens once a previously-offline sector is transacting by text. We'll only put bigger numbers in front of you once pilot data — real captured GMV per restaurant, retention, and take rate accepted — backs them."

**(1) Strongest defensible SF figure:** ~$1.8–2.0B SF restaurant food spend; ~$400–600M fresh (produce+seafood) served.
**(2) Conservative investor-ready:** "$2B market, ~$500M addressable to us."
**(3) Realistic 5-yr SF revenue range:** **~$150k (low) to ~$900k (high), base ~$300–500k.**
**(4) Most-attacked assumptions:** 40% penetration; $3B; 5% net; $500 as 5 lines.
**(5) Pilot data to collect first:** actual captured GMV/restaurant; retention/churn; take rate buyers accept; CAC (both sides); delivery cost per order; gross margin per order; # of suppliers displaced; category mix; net-30 credit-loss rate.

---

## 14. Claims to remove from the pitch deck

- ❌ "**$3B** SF restaurant food market" → replace with "**~$2B** SF restaurant food spend; **~$400–600M** fresh (produce+seafood) addressable to us."
- ❌ "**40%** of SF restaurants" → replace with "**8–15% by Year 5**, ~15–25% terminal."
- ❌ "**$41.6M GMV / $2.08M revenue**" as a near-term SF figure → move to a clearly-labelled *terminal/upside* case, or drop.
- ❌ "**5 product lines × $100/week**" → replace with "produce + seafood ≈ 20–35% of a restaurant's food spend, captured $250–$800/wk."
- ❌ Any implication that "**5% take = 5% margin**" → separate GMV, take, and margin explicitly.
- ⚠️ Keep "~4,000 restaurants" but footnote it as *dine-in restaurants (GGRA, 2021)*; total food-service ~4,900.

---

## 15. Source appendix (with dataset dates)

**Restaurant count / market**
- US Census QuickFacts (CBP employer establishments 2023; Economic Census Sector-72 sales 2022): https://www.census.gov/quickfacts/fact/table/sanfranciscocountycalifornia/PST045225
- BLS QCEW total private establishments, SF County (FRED ENU0607520510, Q3 2025): https://fred.stlouisfed.org/series/ENU0607520510
- SFDPH food-facility inspections (LIVES, 2016–19): https://data.sfgov.org/resource/pyih-qa8i
- GGRA / SF dine-in count 3,974 (2021), SF Standard: https://sfstandard.com/2022/04/07/san-francisco-restaurant-number-market-trend-pandemic/
- NRA California state fact sheet & CA-11 district (2025 data): https://restaurant.org/research-and-media/research/industry-statistics/california-state-fact-sheet/
- SF Travel 2024 lodging statistics (room revenue): https://www.sftravel.com/sites/default/files/2025-07/2024%20San%20Francisco%20City-County%20Lodging%20Statistics.pdf
- Census Economic Census EC2272BASIC (exact 722 table; API key needed): https://data.census.gov/table/ECNBASIC2022.EC2272BASIC

**Food-cost & spend benchmarks**
- NRA — food-cost ratios 2024 (32% median): https://restaurant.org/research-and-media/research/restaurant-economic-insights/analysis-commentary/restaurant-operators-kept-food-cost-ratios-in-check-in-2024/
- NRA — higher-volume lower food-cost 2024: https://www.restaurant.org/research-and-media/research/restaurant-economic-insights/analysis-commentary/higher-volume-restaurants-reported-lower-food-cost-ratios-in-2024/
- VantaInsights food-cost % by segment (2026): https://vantainsights.com/insights/restaurant-food-cost-percentage
- Average restaurant revenue (getsauce, 2024): https://www.getsauce.com/post/average-restaurant-revenue

**Distribution / incumbents / comparables**
- Sysco FY2024 10-K: https://www.sec.gov/Archives/edgar/data/96021/000009602124000128/syy-20240629.htm
- US Foods FY2024 results: https://www.businesswire.com/news/home/20250212387724/en/US-Foods-Reports-Fourth-Quarter-and-Fiscal-Year-2024-Earnings
- PFG FY2024 8-K: https://www.sec.gov/Archives/edgar/data/1618673/000095017024096642/pfgc-ex99_1.htm
- Chefs' Warehouse FY2024: https://www.globenewswire.com/news-release/2025/02/12/3024884/15197/en/The-Chefs-Warehouse-Reports-Fourth-Quarter-2024-Financial-Results.html
- IFDA 2023 Economic Impact Study: https://www.ifdaonline.org/wp-content/uploads/2024/02/2023-IFDA-Foodservice-Distribution-Industry-Economic-Impact-Study-web.pdf
- Faire fees: https://www.faire.com/support/articles/360015893392
- Choco (TechCrunch Series B): https://techcrunch.com/2021/07/19/choco-bites-into-100m-series-b-at-a-600m-valuation-to-build-a-more-transparent-sustainable-food-supply-chain/
- Cut+Dry: https://cutanddry.com/ · BlueCart: https://www.bluecart.com/ · Pepper Series C: https://www.businesswire.com/news/home/20260220742173/en/ · Local Line pricing: https://www.localline.co/suppliers/pricing
- Restaurant failure/churn: https://oysterlink.com/spotlight/restaurant-success-failure-statistics/ · Cornell/Escoffier: https://www.escoffier.edu/blog/food-entrepreneurship/restaurant-failure-analysis/
- POS/tech adoption ~40%: https://www.restroworks.com/blog/restaurant-technology-industry-statistics/
- Payment processing fees (2026): https://www.nerdwallet.com/business/software/learn/credit-card-processing-fees
- Marketplace take-rate benchmarks (a16z / Tidemark): https://a16z.com/13-metrics-for-marketplace-companies/ · https://www.tidemarkcap.com/vskp-chapter/marketplace-take-rates

*Method notes: SF county = SF city (consolidated), so no Bay-Area contamination. 722-vs-721 split and per-restaurant capture rate are the softest links and the biggest swing factors — treat Low/Base/High as the real uncertainty. All arithmetic independently checked; the original $2.08M reproduces at ~1,600 restaurants × $500/wk × 5%.*
