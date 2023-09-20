import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import { ActiveLink } from "@/ui/atoms/ActiveLink";

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
        <nav className="flex justify-between items-center py-4 px-8 bg-gray-800 text-white">
          <div className="flex items-center">
            <Image src="https://via.placeholder.com/150" alt="Logo" className="h-8 mr-2" width={150} height={150} />
            <p className="text-lg font-bold">My App</p>
          </div>
          <ul className="flex justify-center space-x-4">
            <li>
              <ActiveLink
                className="text-red-300 hover:text-red-900"
                activeClassName="border-b-2 border-red-900"
                href={"/"}
                exact
              >Home</ActiveLink>
            </li>
            <li>
              <ActiveLink
                className="text-red-300 hover:text-red-900"
                activeClassName="border-b-2 border-red-900"
                href={"/products"}
              >All</ActiveLink>
            </li>
          </ul>
        </nav>
        {children}
        <footer>
          <p className="text-center">Made by <a href="https://futerzak.it">@futerzak</a></p>
        </footer>
      </body>
    </html >
  );
}
