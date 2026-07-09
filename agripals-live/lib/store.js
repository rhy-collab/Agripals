// Simple in-memory store shared across API routes within the same dev server
// process. Good enough for a same-machine live demo (two browser tabs talking
// to the same Next.js server). Not persisted to disk — restarting `next dev`
// resets everything. Attached to globalThis so it survives Next.js hot reload
// in development.

export function randomId() {
  return Math.random().toString(36).slice(2, 10);
}

function freshStore() {
  return {
    restaurant: {
      name: "Rosa's Kitchen",
      conversation: [
        {
          id: randomId(),
          role: 'assistant',
          text:
            "Hey! I'm AgriPal — Agripals' ordering assistant for Rosa's Kitchen. What can I help you find today?",
          ts: Date.now(),
        },
      ],
    },
    // Each RFQ is its own conversation thread between AgriPal (acting on the
    // restaurant's behalf) and a wholesaler.
    rfqs: [],
  };
}

export function getStore() {
  if (!globalThis.__agripalsStore) {
    globalThis.__agripalsStore = freshStore();
  }
  return globalThis.__agripalsStore;
}
