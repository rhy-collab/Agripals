# Agripals — Live Demo

A real (not clickable-mockup) version of the restaurant ↔ AgriPal ↔ wholesaler
flow. AgriPal is actually powered by Claude here — it reads what you type,
decides when it has enough detail, asks permission, and only then creates a
live RFQ that shows up in the wholesaler's inbox. The wholesaler's replies are
also handled by Claude, and once a quote is confirmed it's relayed straight
back into the restaurant's chat.

This is a **same-machine live demo**: one Next.js server, two browser tabs
(`/restaurant` and `/wholesaler`) sharing the same in-memory data. There's no
database and no hosting yet — perfect for showing the loop working end to
end on your laptop, not yet for a remote demo to investors (that's the next
step once this is proven out).

## Setup

```bash
cd agripals-live
npm install
cp .env.local.example .env.local
# then edit .env.local and paste your key from https://console.anthropic.com/settings/keys
npm run dev
```

Open two tabs:
- http://localhost:3000/restaurant
- http://localhost:3000/wholesaler

## How the loop works

1. On `/restaurant`, message AgriPal like you'd text a person — e.g. "I need
   about 15 lbs of prawns a week." AgriPal (Claude) asks clarifying questions
   until it has a clear item + quantity, then asks permission to reach out to
   wholesalers.
2. Say yes. AgriPal creates an RFQ and seeds a new conversation on the
   wholesaler side, opening with a message summarizing what the customer
   needs.
3. Switch to `/wholesaler` (it polls every ~2.5s, so it'll show up on its own,
   or just reload). Open the new RFQ, reply with a price. AgriPal keeps
   negotiating until it has a clear price and confirmed delivery days, then
   records the quote.
4. Switch back to `/restaurant` — within a couple seconds AgriPal tells you
   the quote came back and asks if you want to lock it in.

## What's real vs. simulated

- **Real:** the chat itself, Claude actually deciding what to ask and when
  enough information exists, the RFQ handoff between the two sides, and the
  quote relay back to the restaurant.
- **Simulated:** there's one hardcoded restaurant ("Rosa's Kitchen") and the
  wholesaler name is just a text field you can type anything into — there's
  no real login, no real wholesaler directory, and no persistence (restarting
  `npm run dev` wipes all conversations and RFQs, since it's stored in memory
  only).

## Natural next steps

- Swap the in-memory store for a real database (Postgres/Supabase) so state
  survives restarts and multiple wholesalers/restaurants can exist.
- Add the Google sign-in + onboarding flow from the clickable prototype
  (`../App-Prototype`) in front of `/restaurant`.
- Deploy (e.g. to Vercel) once you want to demo this to someone who isn't on
  your machine.
