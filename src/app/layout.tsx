import type { Metadata } from "next";
import { DM_Sans, Mulish } from "next/font/google";
import Providers from "@/components/Providers";
import 'leaflet/dist/leaflet.css';
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eco-Flood",
  description: "Aplikasi Prediksi Banjir Berbasis Deforestasi dan Simulasi Lingkungan",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${mulish.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
