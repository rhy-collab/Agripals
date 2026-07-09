import './globals.css';

export const metadata = {
  title: 'Agripals — Live Demo',
  description: 'AgriPal talks to a restaurant, then talks to a wholesaler on its behalf.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
