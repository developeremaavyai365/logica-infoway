import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ShopStoreProvider } from "@/components/shop/store";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { BrowseBar } from "@/components/layout/BrowseBar";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Logica Infoway — Enterprise IT Hardware, Networking & Solutions",
  description:
    "Cost-effective computer hardware, networking, and IT solutions for corporate and government. Trusted by R.R. Kabel, South Eastern Railway, and LIC of India.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${sora.variable}`}>
      <body>
        <ThemeProvider>
          <ShopStoreProvider>
            <SiteChrome>
              <AnnouncementBar />
              <Header />
              <BrowseBar />
            </SiteChrome>
            {children}
            <SiteChrome hideOnHome={false}>
              <SiteFooter />
            </SiteChrome>
          </ShopStoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
