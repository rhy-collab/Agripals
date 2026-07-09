import Link from 'next/link';

export default function Home() {
  return (
    <main className="landing">
      <div className="landing-badge">Live demo · same-machine</div>
      <h1>Agripals</h1>
      <p>
        Open the restaurant app and message AgriPal a couple of times. Once it has
        enough detail, it sends the request to a wholesaler. Open the wholesaler
        app in another tab to receive it, reply, and watch the quote flow back.
      </p>
      <div className="landing-links">
        <Link href="/restaurant" className="landing-btn restaurant">
          🍽️ Restaurant App →
        </Link>
        <Link href="/wholesaler" className="landing-btn wholesaler">
          🚚 Wholesaler App →
        </Link>
      </div>
      <p className="landing-hint">Tip: open each link in its own browser tab side by side.</p>
    </main>
  );
}
