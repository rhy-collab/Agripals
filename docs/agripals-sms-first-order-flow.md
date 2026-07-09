# Agripals SMS-First Order Flow

## Core Idea

Agripals can avoid QR codes, label printers, and farmer setup costs in the first version by using a short order number that moves through the chain by SMS.

The goal is not to build the perfect logistics system yet. The goal is to make the first 10 oyster deliveries trackable, recoverable, and simple enough that a farmer, driver, depot worker, and chef can all participate without installing anything.

## The 10-Digit Order Number

Each order gets one human-readable code:

`AGP-240620-17`

That gives:

- `AGP`: Agripals
- `240620`: order date
- `17`: daily order number

If SMS length or voice readability matters, use:

`2406200017`

The code is the shipment identity. It replaces the QR code in the first version.

## Minimum Viable Tracking

The shipment does not need a printed label at the beginning. It needs repeated human confirmations at each handoff.

The rule:

Every person who touches the order texts the order number plus one short status word.

Examples:

- `2406200017 READY`
- `2406200017 PICKEDUP`
- `2406200017 PETALUMA`
- `2406200017 SF`
- `2406200017 DELIVERED`
- `2406200017 ISSUE`

The system, or Rhys manually at first, records the latest status in a spreadsheet.

## First Test Flow

### 1. Chef Order

The chef confirms a small test order.

Example SMS:

`Order confirmed: 5 dozen unshucked oysters for Tuesday delivery. Your Agripals order number is 2406200017. Reply YES to confirm.`

### 2. Farmer Supply Check

Agripals checks if the Tomales Bay farmer has stock.

Example SMS:

`Hi [Farmer], can you supply 5 dozen unshucked oysters for Tuesday pickup? Order 2406200017. Reply YES or NO.`

If the farmer says no, the same message goes to the backup farmer list.

### 3. Pickup Coordination

Once supply is confirmed, Agripals sends the driver and farmer the same order number and meeting details.

Farmer message:

`Pickup confirmed for order 2406200017. Please meet the logistics driver at Tomales Bay at [time/place]. Reply READY when packed.`

**Packing instructions (the whole "label" system):** triple-bag the oysters (three plastic bags), tie it off with masking tape, and write `2406200017` on the tape in pen. No printed label, no equipment — this is the same handwritten-number approach as the rest of this doc, applied to the physical parcel.

**Farm-side grading, by photo:** before sealing the bag, ask the farmer for two photos, texted in:

`Before you seal it up — 2 quick photos please: 1) a handful of the oysters so we can check size/consistency, 2) one oyster shucked so we can check the meat. Reply with both and you're done.`

AI grades both photos against the promised grade (size consistency, meat quality/color). This is what replaces a human inspector — see `docs/go-to-market-strategy.md` for how this fits the broader direct-from-farmer model and why grading-by-photo is what makes cutting out the wholesaler (who traditionally did this grading) possible.

Driver message:

`Agripals pickup 2406200017: 5 dozen oysters from [Farmer] at Tomales Bay. Text PICKEDUP once collected. If delayed, text ISSUE.`

### 4. Driver Collection

The driver texts:

`2406200017 PICKEDUP`

If possible, the driver also texts a photo of the parcel or bag. This gives proof without needing a label.

### 5. Depot Handoffs

Every depot contact receives the same instruction:

`Agripals order 2406200017 is moving to [next location]. Please text 2406200017 PETALUMA when received and 2406200017 SENT when forwarded.`

For the first 10 deliveries, Rhys should personally maintain one contact inside the Bay Area logistics partner who can chase the order if a status is missed.

### 6. Chef Delivery

Chef receives:

`Your Agripals oyster order 2406200017 is out for delivery today. Please reply DELIVERED once received, or ISSUE if anything is wrong.`

Completion happens only when the chef replies:

`2406200017 DELIVERED`

### 7. Delivery-Side Grading & Escrow Release

Payment for the order is held in escrow from the moment it's placed — the farmer isn't paid until the order is confirmed delivered *and* the grading checks out on the receiving end. This is what lets a restaurant trust a photo-graded order from a farmer they've never met, and it's a core part of removing the wholesaler (who traditionally provided that trust) from the chain.

Once the chef texts `DELIVERED`, ask for the same two photos requested from the farmer:

`Thanks for confirming! Two quick photos so we can check the grading matches what was promised: 1) a handful of the oysters in your hand, 2) one shucked. Reply with both.`

AI compares the delivery-side photos against the farm-side photos from step 3. If the grading is within tolerance and there's no complaint from the chef, escrow releases automatically to the farmer — no invoice chasing, no manual reconciliation. If grading looks off, flag it for human review before releasing payment.

Once escrow releases, a real invoice is generated automatically and emailed from the farmer to the chef, so there's a normal paper trail on both sides despite the whole transaction having been coordinated entirely by text.

## Spreadsheet Columns

Use a simple spreadsheet as the operational brain:

- Order number
- Chef name
- Chef phone
- Farmer name
- Farmer phone
- Product
- Quantity
- Pickup place
- Pickup date
- Driver phone
- Current status
- Last update time
- Next action
- Issue notes
- Paid farmer
- Paid transport
- Chef paid
- Farm-side grading photo URLs (handful + shucked)
- Delivery-side grading photo URLs (handful + shucked)
- Grading match (yes / no / flagged for review)
- Escrow status (held / released / disputed)
- Invoice sent (yes/no + timestamp)

This can be manual first. The automation comes later.

## Why This Is Better Than QR Codes First

QR codes are elegant, but they add friction:

- Someone needs to print the label.
- The farmer needs equipment.
- The parcel needs a reliable surface for the label.
- People need to know they are meant to scan it.
- Scanning assumes smartphone behavior from everyone.

SMS order numbers are rougher but much easier:

- Everyone already knows how to text.
- Drivers can forward the code.
- Farmers do not need email or apps.
- Depot workers can participate with almost no explanation.
- Rhys can manually recover the process when something goes wrong.

The QR code can come later once the flow is proven.

## Biggest Risk

The biggest risk is that the physical parcel and the digital order number become separated.

If there is no printed label, the order number must be attached somehow.

Lowest-cost options:

- Write the order number on the bag or box with permanent marker.
- Put a piece of masking tape on the parcel and write the number on it.
- Text a photo of the parcel at pickup.
- Ask the farmer to include a handwritten paper slip inside or on top of the packaging.

The true minimum is not "no label at all." It is "no printed label machine."

## Recommended First Version

Use a handwritten number plus SMS.

The farmer packs the oysters, writes `2406200017` on tape or cardboard, and texts `READY`. The driver texts `PICKEDUP` and sends a photo. Each depot texts the order number when received. The chef texts `DELIVERED`.

That is enough to test whether Agripals can reliably move oysters without buying hardware.

## 10-Delivery Milestone

The first milestone is 10 completed deliveries where:

- Supply was confirmed by SMS.
- Pickup was confirmed by SMS.
- Farm-side grading photos were captured and graded.
- At least one logistics handoff was confirmed.
- The chef confirmed delivery and delivery-side grading photos were captured.
- Escrow released automatically based on grading match, with no manual chasing.
- Any issue was recoverable because the order number was known.

After 10 deliveries, Agripals can decide whether to add:

- Twilio or similar SMS automation
- WhatsApp support for chefs
- QR codes for depots
- Label printers for frequent farmers
- A lightweight web dashboard
- Automated weekly supply checks (texting farmers directly for stock/grade/availability — see `docs/go-to-market-strategy.md`)
- A Databricks pipeline analyzing grading and delivery data across farmers and logistics providers to solve the consistent-supply problem at scale

## Immediate Next Steps

1. Build the spreadsheet.
2. Write the first chef SMS.
3. Write the first farmer SMS.
4. Identify one Bay Area logistics partner contact who can help trace an order.
5. Run one 5-dozen test order.
6. Underwrite the first order so the farmer and chef feel no risk.
7. Record every failure point.
8. Repeat until 10 successful deliveries are complete.

## Core Principle

Agripals does not need to look automated at the start. It needs to make food movement more reliable than the current mess.

If the SMS order number gives Rhys visibility, accountability, and a way to recover broken handoffs, it is good enough for the first version.
