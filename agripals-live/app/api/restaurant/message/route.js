import { NextResponse } from 'next/server';
import { getStore, randomId } from '../../../../lib/store';
import { runRestaurantTurn } from '../../../../lib/claude';

export async function GET() {
  const store = getStore();
  return NextResponse.json({
    conversation: store.restaurant.conversation,
    rfqs: store.rfqs,
  });
}

export async function POST(req) {
  const store = getStore();
  const { text } = await req.json();

  if (!text || !text.trim()) {
    return NextResponse.json({ error: 'text is required' }, { status: 400 });
  }

  store.restaurant.conversation.push({
    id: randomId(),
    role: 'user',
    text: text.trim(),
    ts: Date.now(),
  });

  let replyText;
  let rfqRequest;
  try {
    const result = await runRestaurantTurn(store.restaurant.conversation);
    replyText = result.replyText;
    rfqRequest = result.rfqRequest;
  } catch (err) {
    replyText =
      err.message && err.message.includes('ANTHROPIC_API_KEY')
        ? "I can't reach my brain yet — the founder still needs to add an ANTHROPIC_API_KEY in .env.local."
        : "Sorry, I hit an error talking to the AI — mind trying that again?";
  }

  let createdRfq = null;

  if (rfqRequest) {
    createdRfq = {
      id: randomId(),
      item: rfqRequest.item,
      quantity: rfqRequest.quantity,
      grade: rfqRequest.grade || '',
      deliveryDays: rfqRequest.deliveryDays || '',
      notes: rfqRequest.notes || '',
      restaurantName: store.restaurant.name,
      status: 'open',
      quote: null,
      createdAt: Date.now(),
      conversation: [
        {
          id: randomId(),
          role: 'assistant',
          text: `Hi there — this is AgriPal, messaging on behalf of a customer. ${store.restaurant.name} is after ${rfqRequest.item}, about ${rfqRequest.quantity}${
            rfqRequest.grade ? `, ${rfqRequest.grade}` : ''
          }${rfqRequest.deliveryDays ? `, ideally ${rfqRequest.deliveryDays} delivery` : ''}. What's your best quote?`,
          ts: Date.now(),
        },
      ],
    };
    store.rfqs.push(createdRfq);
    if (!replyText) {
      replyText = `On it — I've sent your request for ${rfqRequest.item} out to wholesalers now. I'll let you know the moment quotes come back.`;
    }
  }

  store.restaurant.conversation.push({
    id: randomId(),
    role: 'assistant',
    text: replyText || "Got it.",
    ts: Date.now(),
  });

  return NextResponse.json({
    conversation: store.restaurant.conversation,
    rfqs: store.rfqs,
    rfqCreated: createdRfq ? { id: createdRfq.id, item: createdRfq.item } : null,
  });
}
