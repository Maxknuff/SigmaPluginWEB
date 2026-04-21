import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "SigmaSMP – Minecraft Server",
    template: "%s | SigmaSMP",
  },
  description: "Willkommen auf SigmaSMP – dem besten Minecraft Server. Entdecke unser Wiki, News, Shop und mehr.",
  keywords: ["Minecraft", "Server", "SMP", "SigmaSMP", "Wiki", "Shop"],
  openGraph: {
    title: "SigmaSMP – Minecraft Server",
    description: "Willkommen auf SigmaSMP – dem besten Minecraft Server.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
