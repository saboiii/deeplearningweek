import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from '@/components/Footer';
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata = {
  title: "Deep Learning Week",
  description: "Coming soon.",
  openGraph: {
    title: 'Register | DLW',
    description: 'Deep Learning Week - MLDA @ NTU EEE',
    images: 
    {
      url: 'https://dlweek.com/og-image.png',
      width: 1200,
      height: 630,
      alt: 'DLW Promo Image',
    },
    url: 'https://dlweek.com',
    type: 'website',
    locale: 'en_US',
    siteName: 'dlweek',
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        <Navbar />
        {children}
        <Footer />
        <GoogleAnalytics gaId="G-82JFE3XWNX" />
      </body>
    </html>
  );
}
