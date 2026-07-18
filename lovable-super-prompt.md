# Lovable super-prompt — Agripals landing page

> Paste everything below into Lovable. The attached screenshots are the source of truth for look & feel; the spec below gives you the exact tokens, sizes, and behaviour so you can match them precisely.

---

Build a **single-screen, mobile-first landing page** for a wholesale-food brand called **Agripals**. It has exactly one job: show **today's rotating wholesale deal** and capture a **phone number** ("TEXT US"). Match the attached screenshots pixel-for-pixel. Do not add extra sections, nav menus, or scrolling — it is one viewport that fills the screen.

## Stack & libraries
- React + Vite + Tailwind (your defaults).
- **lucide-react** for all icons.
- **Inter** font (Google Fonts, weights 400/500/600/700/800). Use Inter everywhere.
- No router, no backend, no auth. One page component.
- Respect `prefers-reduced-motion`.

## Design tokens (use these exact values)
- Brand green: `#078539`
- Ink (near-black, text + button bg): `#0b1326`
- Slate text (the claim): `#334155`
- Product line color: `#1d2a3f`
- Muted / labels: `#64748b` (also `#65738d` / `#64738b` for the header link & note)
- Hairline / input underline / inactive dots: `#dfe5ef` (dots inactive `#dce4ef`)
- Underline accent under "Fresher/Cheaper": `#83efa8`
- Faint background icons: `#f3f6fa`
- Page background behind the card: `#1f1f1f` (dark). Card itself: `#ffffff`.
- Input placeholder: `#8da0bd`

## Overall frame
- The whole page is a **centered white card** on a dark (`#1f1f1f`) background: `max-width: 560px`, `min-height: 100svh`, `border-radius: 24px`, subtle `box-shadow: 0 0 0 1px rgba(15,23,42,.06)`, `overflow: hidden`, vertical flex column.
- On phones (`max-width: 480px`) the card goes **full-bleed**: no max-width, no border-radius, full height.
- Two stacked regions: a flexible **hero** (top, grows to fill) and a fixed **CTA** block pinned to the bottom.

## Section 1 — Header (top of hero)
- Left: brand lockup = a green **leaf** icon (lucide `leaf`, ~43px, stroke-width 2.3) + the word **"Agripals"** in green `#078539`, weight 800, ~34px, `letter-spacing: -.04em`.
- Right: a plain text button reading **"Wholesaler"** (match the screenshot for exact wording), color `#65738d`, weight 800, ~21px, no background/border.

## Section 2 — Faint background icons (decorative, behind everything)
Three large lucide outline icons in very light `#f3f6fa`, `pointer-events:none`, sitting behind the content in the top-right/lower-right of the hero:
- `beef` — ~340px, top-right, off the edge, rotated `-12deg`.
- `fish` — ~120px, upper area, rotated `15deg`.
- `apple` — ~118px, lower-right, rotated `-15deg`.
Keep them subtle — they should read as a watermark, not compete with the text.

## Section 3 — The deal (bottom-anchored in the hero)
The hero content is pushed to the **bottom** of the hero region (use margin-top:auto). It contains, top to bottom:
1. **Price** — huge: ~102px, weight 800, `line-height: .84`, `letter-spacing: -.075em`, color ink `#0b1326`. e.g. `75¢` or `$3.30`.
2. **Product line** — ~35px, weight 800, color `#1d2a3f`, e.g. `Royal Miyagi Oysters.` followed by a lighter **unit** (weight 500, muted, e.g. `per pc.` / `per lb.`).
3. **Slider dots** — a row of pill dots (~12×9px, rounded). Inactive = `#dce4ef`; the **active** dot is elongated (~48px wide) and brand green. One dot per deal.
4. **Claim headline** (h1): **"Fresher. Cheaper. No Middleman."** — ~38px, weight 600, color slate `#334155`, `max-width: 440px`. "Fresher." and "Cheaper." are each **bold green** (weight 800, `#078539`) with a thick light-green underline (`text-decoration: underline; decoration-color:#83efa8; thickness ~3px; underline-offset ~6px`). "No Middleman." stays slate/regular.

### Deal slider behaviour
- The price + product line is a **carousel** that auto-advances every **~3.5s**, looping. Smooth slide/crossfade transition. The dots sync to the active slide (active dot = elongated green).
- Pause auto-advance if `prefers-reduced-motion: reduce`.
- Deals to rotate through (use these):
  1. `75¢` — `Royal Miyagi Oysters.` `per pc.`
  2. `$3.30` — `PEI Mussels.` `per lb.`
  3. `$6.95` — `Wild-Caught Prawns.` `per lb.`
  4. `$16.00` — `Yellowfin Tuna.` `per lb.`
  5. `$5.20` — `Meyer Lemons.` `per kg.`
- Make the deals a simple array/config at the top of the component so they're trivial to edit later.

## Section 4 — CTA block (pinned to bottom)
- White background, a hairline **top border** (`#dfe5ef`), generous padding (~48px 40px 36px).
- A form with two stacked elements, gap ~25px:
  - **Phone input**: underline style only (no box) — transparent background, **3px bottom border** `#dfe5ef`, square corners, ~27px, weight 700, ink text. Placeholder `e.g. 555-123-4567` in `#8da0bd`. On focus the underline turns ink `#0b1326`. `type="tel"`, `inputmode="tel"`, `autocomplete="tel"`, required.
  - **Submit button**: full-width, **square corners**, ink background `#0b1326` (hover → black), white text, ~26px, weight 800, `letter-spacing: .02em`, `min-height: 72px`, subtle shadow. Label: **"TEXT US"**.
- Helper note under the form (`#64738b`, ~20px, weight 800): **"Text our sales team for today's wholesale deals."**

### CTA behaviour
- On submit: prevent default; if the field is empty, focus it and stop. Otherwise replace the helper note text with **"Thanks! We'll text today's deals to {number} shortly."** in brand green `#078539`, and clear the input. (No real network call — just the inline confirmation.)

## Responsive
- `≤480px`: card full-bleed (no radius/max-width); reduce hero padding (~32px 28px 40px); price ~80px; product ~28px; claim ~31px (max-width ~330px); CTA padding ~38px 28px 30px; input ~23px; button ~22px / min-height 64px; note ~17px; shrink the background icons a touch.
- `≤370px`: shrink one more step (price ~72px, product ~25px, claim ~28px, input ~21px, button ~20px).

## Accessibility
- `aria-label`s on the hero ("Agripals wholesale deal"), the deal region, and the CTA. Background icons `aria-hidden`. Keyboard-focusable input & button with visible focus.

## Meta & favicon
- Page `<title>`: **Agripals**.
- Favicon: the green **leaf** mark (lucide `leaf` in `#078539`) as an SVG.
- Meta description: "Agripals — wholesale food, farm-direct. Text our sales team for today's wholesale deals."

## Do / Don't
- **Do** keep it to a single non-scrolling viewport that matches the screenshots exactly.
- **Do** make colors, deals, and copy easy to edit (tokens + a deals array).
- **Don't** add hero images, testimonials, feature grids, footers, cookie banners, or navigation. Nothing beyond what's specified.
- **Don't** change the wording, the two-line claim, or the "TEXT US" label.
