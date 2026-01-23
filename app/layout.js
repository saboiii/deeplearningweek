import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ClerkProvider } from "@clerk/nextjs";
import JsonLd from "@/components/JsonLd";

export const metadata = {
  title: "Deep Learning Week | Home",
  description:
    "Join us for the Deep Learning Week, a week-long event focused on the latest advancements in deep learning and AI.",
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
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Deep Learning Week",
      url: "https://dlweek.com",
      logo: "https://dlweek.com/images/logo.png",
      sameAs: ["https://twitter.com/", "https://www.linkedin.com/"],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      url: "https://dlweek.com",
      name: "Deep Learning Week",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://dlweek.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ];
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en">
        <body className="antialiased">
          <JsonLd data={jsonLd} />
          <Navbar />
          {children}
          <Footer />
          <GoogleAnalytics gaId="G-82JFE3XWNX" />
        </body>
      </html>
    </ClerkProvider>
  );
}
