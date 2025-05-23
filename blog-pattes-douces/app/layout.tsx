import Navbar from "./Components/navigation/Navbar";
import Footer from "./Components/navigation/Footer";
import Posts from "./Components/Posts/Posts";
import Feedhome from "./Components/feed";

import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pattes Douces",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}