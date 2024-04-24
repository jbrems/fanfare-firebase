import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "./(layout)/(header)/Header";
import { Footer } from "./(layout)/(footer)/Footer";

const roboto = Roboto({ weight: ['300', '700'], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fanfare Blaasveld",
  description: "Website van de Koninklijke fanfare De Vrienden van 't Recht VZW Blaasveld",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={roboto.className}>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
