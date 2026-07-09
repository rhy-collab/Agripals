'use client';

import { useEffect, useRef, useState } from 'react';

export default function WholesalerPage() {
  const [rfqs, setRfqs] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [wholesalerName, setWholesalerName] = useState("Steve's Oyster Farm");
  const bottomRef = useRef(null);
  const activeIdRef = useRef(null);

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  async function fetchList() {
    try {
      const res = await fetch('/api/wholesaler/message', { cache: 'no-store' });
      const data = await res.json();
      const list = data.rfqs || [];
      setRfqs(list);
      if (activeIdRef.current) {
        const active = list.find((r) => r.id === activeIdRef.current);
        if (active) setConversation(active.conversation);
      }
    } catch (e) {
      // ignore transient poll failures
    }
  }

  useEffect(() => {
    fetchList();
    const interval = setInterval(fetchList, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation, sending]);

  function openRfq(rfq) {
    setActiveId(rfq.id);
    setConversation(rfq.conversation);
  }

  async function send() {
    const text = input.trim();
    if (!text || sending || !activeId) return;
    setInput('');
    setSending(true);
    setConversation((c) => [...c, { id: 'temp-' + Date.now(), role: 'user', text, ts: Date.now() }]);
    try {
      const res = await fetch('/api/wholesaler/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rfqId: activeId, text, wholesalerName }),
      });
      const data = await res.json();
      setConversation(data.conversation || []);
      if (data.rfq) {
        setRfqs((prev) => prev.map((r) => (r.id === data.rfq.id ? data.rfq : r)));
      }
    } finally {
      setSending(false);
    }
  }

  const active = rfqs.find((r) => r.id === activeId);

  return (
    <main className="app-shell wholesaler-shell">
      <header className="app-topbar">
        <a href="/" className="back-link">←</a>
        <div>
          <input
            className="name-input"
            value={wholesalerName}
            onChange={(e) => setWholesalerName(e.target.value)}
          />
          <span>Wholesaler inbox</span>
        </div>
      </header>

      {!activeId && (
        <div className="inbox-list">
          {rfqs.length === 0 && (
            <p className="empty">No RFQs yet — waiting on a restaurant to send one.</p>
          )}
          {rfqs.map((r) => (
            <div key={r.id} className="inbox-row" onClick={() => openRfq(r)}>
              <div className="meta">
                <span className="who">{r.restaurantName}</span>
                <span className={`badge-new ${r.status}`}>{r.status}</span>
              </div>
              <h3>{r.item}</h3>
              <p className="subject-line">
                {r.quantity}
                {r.grade ? ` · ${r.grade}` : ''}
              </p>
            </div>
          ))}
        </div>
      )}

      {activeId && (
        <>
          <div className="thread-header">
            <button className="back-btn" onClick={() => setActiveId(null)}>
              ← Inbox
            </button>
            <strong>{active ? active.item : ''}</strong>
          </div>
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
              placeholder="Reply…"
              disabled={sending}
            />
            <button onClick={send} disabled={sending} aria-label="Send">
              ↑
            </button>
          </footer>
        </>
      )}
    </main>
  );
}
