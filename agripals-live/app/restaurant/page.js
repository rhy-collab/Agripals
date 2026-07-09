'use client';

import { useEffect, useRef, useState } from 'react';

export default function RestaurantPage() {
  const [conversation, setConversation] = useState([]);
  const [rfqs, setRfqs] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);
  const pollingRef = useRef(null);

  async function fetchState() {
    try {
      const res = await fetch('/api/restaurant/message', { cache: 'no-store' });
      const data = await res.json();
      setConversation(data.conversation || []);
      setRfqs(data.rfqs || []);
    } catch (e) {
      // ignore transient poll failures
    }
  }

  useEffect(() => {
    fetchState();
    pollingRef.current = setInterval(fetchState, 2500);
    return () => clearInterval(pollingRef.current);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation, sending]);

  async function send() {
    const text = input.trim();
    if (!text || sending) return;
    setInput('');
    setSending(true);
    setConversation((c) => [...c, { id: 'temp-' + Date.now(), role: 'user', text, ts: Date.now() }]);
    try {
      const res = await fetch('/api/restaurant/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setConversation(data.conversation || []);
      setRfqs(data.rfqs || []);
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="app-shell">
      <header className="app-topbar">
        <a href="/" className="back-link">←</a>
        <div>
          <strong>Rosa's Kitchen</strong>
          <span>Chat with AgriPal</span>
        </div>
      </header>

      <div className="chat-body">
        {conversation.map((m) => (
          <div key={m.id} className={`bubble ${m.role === 'user' ? 'user' : 'assistant'}`}>
            {m.text}
          </div>
        ))}
        {sending && (
          <div className="bubble assistant typing">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <footer className="compose">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') send();
          }}
          placeholder="Message AgriPal…"
          disabled={sending}
        />
        <button onClick={send} disabled={sending} aria-label="Send">
          ↑
        </button>
      </footer>

      {rfqs.length > 0 && (
        <aside className="rfq-panel">
          <h3>My RFQs</h3>
          {rfqs.map((r) => (
            <div key={r.id} className="rfq-card">
              <span>
                {r.item} — {r.quantity}
              </span>
              <span>
                {r.quote ? (
                  <strong style={{ marginRight: 8 }}>{r.quote.price}</strong>
                ) : null}
                <span className={`status ${r.status}`}>{r.status}</span>
              </span>
            </div>
          ))}
        </aside>
      )}
    </main>
  );
}
