import Anthropic from '@anthropic-ai/sdk';

const MODEL = 'claude-sonnet-5';

function client() {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error(
      'Missing ANTHROPIC_API_KEY. Copy .env.local.example to .env.local and add your key from console.anthropic.com.'
    );
  }
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

function toApiMessages(conversation) {
  // Anthropic requires alternating user/assistant turns starting with user.
  return conversation.map((m) => ({
    role: m.role === 'user' ? 'user' : 'assistant',
    content: m.text,
  }));
}

function extractTextAndTool(content, toolName) {
  let text = '';
  let toolInput = null;
  for (const block of content) {
    if (block.type === 'text') text += block.text;
    if (block.type === 'tool_use' && block.name === toolName) toolInput = block.input;
  }
  return { text: text.trim(), toolInput };
}

const RESTAURANT_SYSTEM_PROMPT = `You are AgriPal, Agripals' ordering assistant for restaurants.

You are warm, brief, and conversational — text like a helpful person, not a form. Your job:
1. Figure out what product the restaurant needs (item, roughly how much, grade/spec if relevant, delivery days if mentioned).
2. Once you have a clear product and quantity, explicitly ask permission before reaching out to wholesalers on their behalf.
3. Only call the send_rfq_to_wholesalers tool once the restaurant has clearly said yes to that ask. Never call it before they've agreed.
4. After calling the tool, send a short confirmation message telling them you've sent it out and you'll let them know when quotes come back.
5. Keep replies to 1-3 sentences. Ask one question at a time. Use at most one emoji occasionally, don't overdo it.`;

const RESTAURANT_TOOLS = [
  {
    name: 'send_rfq_to_wholesalers',
    description:
      'Send a request for quote out to wholesalers on the restaurant’s behalf. Only call this once you have a clear item + quantity AND the restaurant has explicitly agreed to let you reach out to wholesalers.',
    input_schema: {
      type: 'object',
      properties: {
        item: { type: 'string', description: 'Product name and spec, e.g. "Wild-Caught Prawns, 16/20ct"' },
        quantity: { type: 'string', description: 'e.g. "15 lbs/week"' },
        grade: { type: 'string', description: 'Grade/quality detail if known, otherwise empty string' },
        deliveryDays: { type: 'string', description: 'e.g. "Tue & Thu", otherwise empty string' },
        notes: { type: 'string', description: 'Any other relevant detail, otherwise empty string' },
      },
      required: ['item', 'quantity'],
    },
  },
];

export async function runRestaurantTurn(conversation) {
  const response = await client().messages.create({
    model: MODEL,
    max_tokens: 400,
    system: RESTAURANT_SYSTEM_PROMPT,
    tools: RESTAURANT_TOOLS,
    messages: toApiMessages(conversation),
  });
  const { text, toolInput } = extractTextAndTool(response.content, 'send_rfq_to_wholesalers');
  return { replyText: text, rfqRequest: toolInput };
}

function wholesalerSystemPrompt(rfq) {
  return `You are AgriPal, messaging a wholesaler on behalf of a restaurant customer to get a quote.

Context: the customer is "${rfq.restaurantName}". They need "${rfq.item}", quantity ${rfq.quantity}${
    rfq.grade ? `, grade/spec: ${rfq.grade}` : ''
  }${rfq.deliveryDays ? `, ideally delivered ${rfq.deliveryDays}` : ''}.

You are warm, brief, and efficient. Your job:
1. Get a clear price from the wholesaler for this item at this quantity.
2. Confirm delivery days work (use the customer's preferred days above if given).
3. Once you have both a clear price AND confirmed delivery, call the submit_quote tool.
4. After calling the tool, send a short thank-you confirming you're passing the quote to the customer now.
5. Keep replies to 1-2 sentences. Never invent a price yourself — only record what the wholesaler actually says.`;
}

const WHOLESALER_TOOLS = [
  {
    name: 'submit_quote',
    description:
      'Record the wholesaler’s quote once you have a clear price and confirmed delivery days.',
    input_schema: {
      type: 'object',
      properties: {
        price: { type: 'string', description: 'e.g. "$6.95/lb" or "$18.50/dozen"' },
        deliveryDays: { type: 'string', description: 'Confirmed delivery days' },
        notes: { type: 'string', description: 'Any other relevant detail, otherwise empty string' },
      },
      required: ['price'],
    },
  },
];

export async function runWholesalerTurn(conversation, rfq) {
  const response = await client().messages.create({
    model: MODEL,
    max_tokens: 400,
    system: wholesalerSystemPrompt(rfq),
    tools: WHOLESALER_TOOLS,
    messages: toApiMessages(conversation),
  });
  const { text, toolInput } = extractTextAndTool(response.content, 'submit_quote');
  return { replyText: text, quote: toolInput };
}
