import { NextResponse } from 'next/server';
import { getStore, randomId } from '../../../../lib/store';
import { runWholesalerTurn } from '../../../../lib/claude';

export async function GET(req) {
  const store = getStore();
  const { searchParams } = new URL(req.url);
  const rfqId = searchParams.get('rfqId');

  if (rfqId) {
    const rfq = store.rfqs.find((r) => r.id === rfqId);
    if (!rfq) return NextResponse.json({ error: 'not found' }, { status: 404 });
    return NextResponse.json({ rfq });
  }

  return NextResponse.json({ rfqs: store.rfqs });
}

export async function POST(req) {
  const store = getStore();
  const { rfqId, text, wholesalerName } = await req.json();

  const rfq = store.rfqs.find((r) => r.id === rfqId);
  if (!rfq) return NextResponse.json({ error: 'RFQ not found' }, { status: 404 });
  if (!text || !text.trim()) return NextResponse.json({ error: 'text is required' }, { status: 400 });

  rfq.conversation.push({
    id: randomId(),
    role: 'user',
    text: text.trim(),
    ts: Date.now(),
  });

  let replyText;
  let quote;
  try {
    const result = await runWholesalerTurn(rfq.conversation, rfq);
    replyText = result.replyText;
    quote = result.quote;
  } catch (err) {
    replyText =
      err.message && err.message.includes('ANTHROPIC_API_KEY')
        ? "I can't reach my brain yet — the founder still needs to add an ANTHROPIC_API_KEY in .env.local."
        : "Sorry, I hit an error talking to the AI — mind trying that again?";
  }

  const finalWholesalerName = (wholesalerName && wholesalerName.trim()) || 'Wholesaler';

  if (quote) {
    rfq.status = 'quoted';
    rfq.quote = {
      price: quote.price,
      deliveryDays: quote.deliveryDays || rfq.deliveryDays,
      notes: quote.notes || '',
      wholesalerName: finalWholesalerName,
    };

    store.restaurant.conversation.push({
      id: randomId(),
      role: 'assistant',
      text: `Got a quote back on ${rfq.item} — ${quote.price} from ${finalWholesalerName}${
        quote.deliveryDays ? `, ${quote.deliveryDays} delivery` : ''
      }. Want me to lock it in?`,
      ts: Date.now(),
    });

    if (!replyText) {
      replyText = `Perfect — I've passed that quote straight to ${rfq.restaurantName}. Thanks for the quick turnaround!`;
    }
  }

  rfq.conversation.push({
    id: randomId(),
    role: 'assistant',
    text: replyText || 'Thanks!',
    ts: Date.now(),
  });

  return NextResponse.json({ conversation: rfq.conversation, rfq });
}
