import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from '@/components/Footer';

export const metadata = {
  title: "Deep Learning Week",
  description: "Coming soon.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
