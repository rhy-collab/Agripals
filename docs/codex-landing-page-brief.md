# Brief for Codex — Improve the AgriPal Mascot & Enrich the Landing Page

You're picking up work on **Agripals**, a food-procurement startup. This brief gives you everything you need to update the landing page inside the clickable prototype without any other context. Read it fully before touching code.

---

## 1. Where the file lives

**Edit this file directly:** `/Users/rhys/Downloads/Projects/Agripals/App-Prototype/index.html`

This is a single self-contained HTML file (inline `<style>` and `<script>`, no build step, no external JS/CSS dependencies except system fonts). It's a clickable, mobile-first prototype — open it directly in a browser to preview.

Do not introduce a build step, a framework, or external asset files that the HTML depends on via relative path. **Important lesson learned:** an earlier pass tried referencing external PNG mascot files from `assets/agripal-mascot/transparent-sizes/` via relative `<img src="../assets/...">` paths. This broke — the images didn't render wherever the file was actually being viewed from, showing broken-image icons instead of the mascot. Whatever you do with the mascot artwork must be **self-contained inside `index.html`** — either genuinely inline SVG, or a base64 data-URI (`data:image/png;base64,...`) embedded directly in the HTML if you want to use a raster asset. Never a relative file path to an external image.

---

## 2. What this prototype is

A clickable mobile app/website prototype, built as one HTML file with a phone-frame UI. At the top of the page is a role-switcher with four tabs — **this structure must not change**:

```html
<div class="role-tabs">
  <div class="role-tab active" id="tab-app-landing" onclick="showApp('app-landing')">🌾 Landing</div>
  <div class="role-tab" id="tab-app-restaurant" onclick="showApp('app-restaurant')">🍽️ Chef</div>
  <div class="role-tab" id="tab-app-wholesaler" onclick="showApp('app-wholesaler')">🚚 Wholesaler</div>
  <div class="role-tab" id="tab-app-admin" onclick="showApp('app-admin')">📊 Admin</div>
</div>
```

Tapping a tab calls `showApp('app-<id>')`, which shows/hides `.app-panel` divs and toggles the `.active` class. Each panel contains a `.phone` → `.phone-screen` → `.screens` → `.screen` structure (narrow, max-width 430px, no phone bezel — the app fills edge-to-edge, this was an explicit earlier design decision, do not add padding/margin/rounded corners around the `.phone`/`.phone-screen` elements).

**Your work is scoped to the Landing panel** (`<div class="app-panel active" id="app-landing">`, currently lines ~621–707) and the mascot artwork wherever it appears elsewhere in the file. Do not restructure the tab bar, do not rename the tabs, do not touch the Chef/Wholesaler/Admin panels' functionality (their internal chat/RFQ/messaging flows are already built and working — leave the JS functions `showApp()`, `showScreen()`, `advanceChat()`, `captureMenu()` etc. alone).

---

## 3. The design system already in the file (reuse these, don't invent new ones)

CSS custom properties (in `:root`):
```
--green-900:#123024   --green-700:#2E8564   --green-600:#37A278   --green-500:#4CC499   --green-100:#DCEFE1
--orange-500:#FF9F4D  --orange-100:#FCEBD8
--bg:#F4F7F6  --card:#FFFFFF  --text:#12201A  --muted:#68786F  --border:rgba(18,32,26,.09)
--radius:22px  --shadow:0 6px 20px rgba(24,51,45,0.10)

/* glassmorphism tokens */
--glass-light:rgba(255,255,255,.58)
--glass-light-strong:rgba(255,255,255,.78)
--glass-border:rgba(255,255,255,.55)
--glass-dark:rgba(14,26,21,.55)
--glass-dark-strong:rgba(10,20,16,.72)
--glass-dark-border:rgba(255,255,255,.14)
--glass-shadow:0 12px 36px rgba(15,35,28,.14), inset 0 1px 0 rgba(255,255,255,.55)
--blur:22px
```

Reusable component classes already defined and used throughout the file: `.card`, `.pill` / `.pill-green` / `.pill-orange` / `.pill-gray`, `.btn` / `.btn-primary` / `.btn-secondary` / `.btn-outline` / `.btn-orange`, `.stat-grid` / `.stat-box` / `.stat-box.alt`, `.list-item` / `.icon-badge` / `.icon-badge.orange` / `.grow` / `.title` / `.desc`, `.checkitem`, `.muted`. The overall aesthetic is "iOS glass" — frosted translucent cards over an animated green/orange gradient-mesh dark background (see `body` and `body::before` styles near the top of the `<style>` block). Match this style; don't introduce a different visual language.

The whole app is mobile-first and narrow (max-width: 430px, centered). Design everything for a phone screen first.

---

## 4. The mascot — "AgriPal" — current state and what to improve

AgriPal is the friendly AI character/agent that chats with chefs and wholesalers inside the app (see the chat screens `r-chat` / `w-chat`, where the assistant identifies itself as "AgriPal" — `<strong id="r-chat-title">AgriPal</strong>`).

**Current mascot design** (as of this brief): a small inline SVG, self-contained, no external dependencies — a rounded-square robot face with a green gradient fill (light green `--green-500` to deep green `--green-700`), a subtle glossy highlight in the upper-left, two bold white eyes with dark (`--green-900`) pupils, a simple white smile curve, and a small antenna nub on top. It currently appears in **5 places**:

1. Landing page hero (top of the Landing panel, inside a `78×78px` rounded-square badge)
2. Chef app welcome screen (`84×84px` badge)
3. Chef app Google sign-in screen (`72×72px` badge)
4. Chat header avatar in the Chef app's AgriPal chat screen (`48×48px` badge, class `.mini-logo`)
5. Chat header avatar in the Wholesaler app's AgriPal chat screen (same `.mini-logo`, `48×48px`)

Each badge container currently uses a light glass background (`var(--glass-light-strong)` with a `var(--glass-border)` border) so the green mascot has contrast and doesn't blend into a green-on-green badge. Search the file for `agripal-face-grad-` to find all 5 occurrences (each has a unique gradient `id` suffix 1–5 to avoid SVG id collisions — if you regenerate the artwork, keep unique ids per instance for the same reason).

**Design intent for AgriPal** (from the founder, verbatim guidance across iterations):
- Friendly, cheeky but trustworthy — not corporate, not sterile
- A cute robot, explicitly **not** a ghost shape and **not** a generic blue reference character — green is core to the identity
- Should feel "imbued with" the founder's own personality: warm, approachable, a bit playful
- Green must be unambiguous — earlier iterations that were "white shape on a green badge" got feedback that it didn't read as green enough; the character itself should clearly be green
- Must have clearly visible eyes and an expressive, friendly smile — earlier iterations lost the eyes and got explicit negative feedback ("no eyes, no eyes")
- Sized to read clearly at small "emoji" scale (badges range from 48px to 84px) — it needs to work as a small icon, not just as a large hero image

**Your task on the mascot:**
1. Improve/refine the artwork quality — better proportions, a touch more visual polish/dimension (subtle shading, a highlight, rounded friendly geometry), while keeping it unmistakably green, robot-styled (not ghost, not the old blue reference), with clear expressive eyes and a smile. You can rebuild it as a nicer inline SVG, or — if you produce genuinely higher-quality artwork (e.g. a polished vector or raster illustration) — embed it as a **base64 data-URI directly in the HTML** so it has zero external dependencies. Do not link to an external file path.
2. Keep it working at all 5 existing sizes/locations without distortion (the existing pattern sizes the SVG/image to fill most of its rounded-square badge with a small margin — follow that convention).

---

## 5. Task: place AgriPal in more places throughout the landing page

Right now AgriPal only appears once on the Landing panel (the hero logo at the top). The founder wants AgriPal to feel like a recurring, present character throughout the landing page, not just a logo mark. Add the mascot (small, appropriately sized per context — don't oversize it relative to the surrounding content) in a few more natural spots on the Landing panel, for example:

- Next to or inside the "Our thesis" mission card (the dark green card with the "☀️ Our thesis" pill and the 2→1→0 stat boxes) — e.g. a small AgriPal peeking in, or a speech-bubble style moment
- Near the "How it works" card, as if AgriPal is walking the chef through the 3 steps
- Near the final CTA buttons at the bottom, as a friendly sign-off — e.g. a small AgriPal with a short first-person line like *"Hi, I'm AgriPal — message me anytime you've got a question."* (this ties directly into the real in-app chat feature, where AgriPal is the chat assistant chefs and wholesalers actually talk to)

Use good design judgment on exact placement and sizing — the goal is "AgriPal feels like a present, friendly character guiding you through the page," not "the same logo repeated 5 times." Vary the context/pose framing if you can (e.g., different small text callouts next to each instance) even if the underlying artwork asset is the same.

---

## 6. Task: enrich the landing page content with the full mission/vision

The Landing panel currently already contains a reasonable first pass (hero, direct-from-farm pitch card, 3 value-prop list items, mission/thesis card, how-it-works, stats, "why it matters" card, CTAs — see current code, lines ~621–707 of `index.html`). Your job is to **enrich and deepen this**, not necessarily replace it wholesale. Use the following as source material — this is the actual mission/vision/business context, condensed from the project's internal docs (`README.md`, `docs/business-model.md`, `docs/go-to-market-strategy.md`):

**Mission statement (verbatim, from README.md):**
> Sunlight is the best transparency. Food supply chains are opaque by design — middlemen roughly double the price between farmer and restaurant, and they keep it that way on purpose. Agripals goes first-principles: cut out the wholesalers, importers, and exporters that add markup without adding value, and go direct from farmer to restaurant. That takes the true cost of food from 2 (today, with middlemen) to 1 (direct, at first-principles cost). As robotics, AI, and automation strip cost out of farming and logistics themselves, we drive it from 1 toward 0. Long-term, Agripals becomes the MCP server for food — so any AI agent can send a food request from anywhere to anywhere and have it sourced, quoted, and delivered without caring what system, channel, or human is on the other end.

**The core pricing thesis — 2 → 1 → 0** (this is the number that should anchor the page):
- **2** — today, with a middleman, a wholesaler roughly doubles the price between farmer and restaurant
- **1** — direct farmer-to-restaurant, cutting the middleman out, converges on the true cost of growing, handling, and moving the food
- **0** — long-term, as robotics, autonomous/solar trucking, and AI-coordinated logistics strip cost out of production and movement itself, true cost trends toward zero

**Corrected core pitch — this is important, get this framing right:** the primary hook is **"we go direct to the farmers — that's our principal thing."** It is explicitly **not** "take a photo and we'll haggle wholesalers for you." The photo-scan mechanic should be framed specifically as: *take a photo of your menu, and we'll identify which of those items can be sourced direct from a farm, and reduce your cost by 20% specifically on those direct-sourceable items.* (There's a separate, secondary wholesaler-RFQ mechanic elsewhere in the app for categories that aren't direct-from-farm yet — don't foreground that on the landing page; the landing page's primary identity is the direct-to-farmer pitch.)

**Values/marketing narrative to weave in** (from `docs/go-to-market-strategy.md`):
- Cutting out the middleman reduces environmental harm — fewer handling steps, less redundant cold-chain handling and transport, a shorter, more direct physical path from farm to plate
- It supports local, often family-run farms directly, rather than routing their margin through a wholesaler
- It gives full provenance — a chef knows exactly which farm their food came from, not just which wholesaler's truck it arrived on
- The combined effect: sourcing through Agripals is an environmentally responsible, locally-supportive, transparently-sourced way to buy food — a values statement, not just a logistics optimization

**Go-to-market context** (useful for a "why now" or "where we're starting" section, optional but adds credibility/specificity):
- Phase 1 (current): San Francisco oysters, direct farm-to-restaurant, ~10 oyster farmers, 10–20 SF restaurants, one SF-based logistics partner for the farm→restaurant leg
- Phase 2: more direct SF seafood lines (shrimp, lobster, crab)
- Phase 3: direct import/export, cutting out exporters and importers too (e.g. direct-from-fishery crab from Norway)
- Trust and grading (traditionally a wholesaler's job) are replaced by AI photo-grading — the farmer photographs a handful of product plus one graded sample before sealing a shipment, the chef photographs the same on delivery, and payment sits in escrow until the two match

**Tone/brand direction:** "the bleeding edge of artificial intelligence meets agriculture" — a high-tech AI aesthetic (glassy, modern, a little futuristic) mixed with warm agricultural motifs (farms, produce, provenance). The vibe should feel like a genuinely revolutionary, trendy AI startup that happens to be pointed at one of the oldest, most old-school industries there is. Directed squarely at chefs — the whole page is about winning the chef's trust and getting them to tap "I'm a Chef — Get Started."

Feel free to add a short "why now" or "our story" moment, expand the values section, or add a light social-proof/stats strip if it strengthens the page — use judgment, but don't drift from the corrected direct-to-farmer framing above, and don't turn this into a dense wall of text. It's a mobile phone screen; keep it scannable, card-based, consistent with the existing component style.

---

## 7. Constraints checklist (must all hold true when you're done)

- [ ] The 4-tab role-switcher at the top is unchanged: 🌾 Landing, 🍽️ Chef, 🚚 Wholesaler, 📊 Admin — same order, same labels, same `onclick="showApp(...)"` wiring
- [ ] `app-landing` is still the panel with `class="app-panel active"` on page load (it's the default/front door)
- [ ] The Chef, Wholesaler, and Admin panels and their JS (`showApp`, `showScreen`, `advanceChat`, `captureMenu`, etc.) are untouched and still work
- [ ] No phone bezel reintroduced — `.phone` and `.phone-screen` stay edge-to-edge (no padding/border-radius/box-shadow added back onto those two classes)
- [ ] Mascot artwork is fully self-contained in `index.html` (inline SVG or base64 data-URI) — no relative `<img src="../...">` paths to external files
- [ ] Mascot reads clearly as green, has visible eyes and a smile, at every size it's used (48px–84px badges plus wherever you add new instances)
- [ ] Core pitch language says "direct from the farmer" as the principal mechanism, not "we haggle wholesalers for you"
- [ ] Page still renders as valid HTML — after editing, verify tag balance (e.g. count `<div`/`</div>` and `<svg`/`</svg>` occurrences and confirm they match) before considering the work done
- [ ] Still mobile-first, max-width ~430px, consistent with the existing glass design system (reuse `.card`/`.btn`/`.pill`/`.stat-box`/`.list-item` rather than inventing new component patterns)

---

## 8. How to verify your own work before finishing

1. Open `App-Prototype/index.html` directly in a browser and click through: Landing tab loads by default → tap each of the 4 role tabs and confirm they still switch correctly → tap into the Landing page's CTA buttons and confirm they still route into the Chef/Wholesaler panels correctly.
2. Confirm AgriPal renders (not a broken image icon) in every location you placed it.
3. Run a simple tag-balance sanity check on the file (e.g. a quick script counting `<div`/`</div>`, `<svg`/`</svg>`) to catch any unclosed tags before handing back.
