import type { Metadata } from "next";
import { PlayerProvider } from "@/context/PlayerContext";
import Navbar from "@/components/Navbar/Navbar";
import Player from "../components/Player/Player";
import "./globals.css";

export const metadata: Metadata = {
  title: "Musiqa",
  description: "Shaxsiy musiqa pleyeri",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return  (
    <html lang="uz">
      <body>
        <PlayerProvider>
          <Navbar />
          <main>{children}</main>
          <Player /> 
        </PlayerProvider>
      </body>
    </html>
  )
}