# Codex Follow-Up: Enriched Landing Page and Embedded AgriPal Mascot

## What changed

Codex updated `/Users/rhys/Downloads/Projects/Agripals/App-Prototype/index.html`.

The Landing panel is now a longer, more complete investor/chef-facing page. It leads with Agripals as the chef's AI buyer that goes straight to the farm, then expands the value story across:

- 20-second menu scan
- direct-from-farm sourcing
- chef value props
- AI coordination replacing middleman work
- the 2 -> 1 -> 0 pricing thesis
- first-principles cost explanation
- AI grading, escrow, and delivery trust
- San Francisco oysters as the first wedge
- environmental/local/provenance benefits
- WhatsApp/SMS/Telegram/in-app chat as channels
- the long-term MCP server for food

## Mascot implementation

The mascot is now the generated green AgriPal PNG embedded directly inside the existing inline SVG symbol:

```html
<symbol id="agripal-mascot" viewBox="0 0 48 48">
  <image href="data:image/png;base64,..." x="0" y="0" width="48" height="48" preserveAspectRatio="xMidYMid meet" />
</symbol>
```

This keeps the file self-contained and avoids the previous broken-image problem from relative external asset paths. Do not replace this with `../assets/...` paths unless the prototype is moved into a build system that guarantees those assets resolve.

All visible mascot placements still use:

```html
<svg ... viewBox="0 0 48 48"><use href="#agripal-mascot"/></svg>
```

## Rules for building on it

- Keep the 4 tabs unchanged: Landing, Chef, Wholesaler, Admin.
- Keep `app-landing` as the default active panel.
- Keep the prototype self-contained.
- Preserve the core pitch: direct from farmer is the main mechanism.
- Do not make the landing page sound like the main promise is wholesaler haggling.
- Keep AgriPal as a friendly guide, not just a logo.
- Keep the page mobile-first and card-based.
- Reuse the existing glass design system and landing helper classes.

## Verification already done

Codex checked:

- Div balance: `462/462`
- SVG balance: `26/26`
- Mascot references: `12`
- No external `assets/agripal-mascot` paths in `index.html`
- Local render at `http://127.0.0.1:8765/App-Prototype/index.html`
- Console warnings/errors: none
- Broken images: `0`
- Landing default panel: correct
- Chef tab: works
- Chef CTA: opens the sign-in screen
- Wholesaler tab: works
- Admin tab: works
- Mobile viewport `390x844`: no horizontal overflow

## Suggested next improvements

If continuing this work, the next useful pass is visual polish rather than another strategy rewrite:

- tighten the first viewport so the CTA teaser appears a little sooner
- add one stronger chef-facing CTA halfway down the long page
- consider a tiny sticky "Message AgriPal" action once this becomes a real web app
- convert inline styles into helper classes only if the file starts becoming hard to maintain
