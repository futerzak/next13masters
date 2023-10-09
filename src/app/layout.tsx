import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navigation } from "@/ui/molecules/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FUTERZAK sklep",
  description: "Mój pierwszy niekomercyjny większy projekt",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className={inter.className}>
        <Navigation />
        {children}
        <footer>
          <p className="text-center">Made by <a href="https://futerzak.it">@futerzak</a></p>
        </footer>
      </body>
    </html >
  );
}
