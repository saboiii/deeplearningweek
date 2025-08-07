import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from '@/components/Footer';
import { GoogleAnalytics } from '@next/third-parties/google'
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "Deep Learning Week | Home",
  description: "Join us for the Deep Learning Week, a week-long event focused on the latest advancements in deep learning and AI.",
  openGraph: {
    title: "Deep Learning Week | Home",
    description:
      "Join us for the Deep Learning Week, a week-long event focused on the latest advancements in deep learning and AI.",
    url: "https://dlweek.com",
    siteName: "Deep Learning Week",
    images: [
      {
        url: "/images/og-image.png",
        width: 800,
        height: 800,
        alt: "Deep Learning Week Photo",
      },
    ],
    locale: "en_SG",
    type: "website",
  },
};


export default function RootLayout({ children }) {
  return (
    <ClerkProvider afterSignOutUrl="/">
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
    </ClerkProvider>
  );
}
