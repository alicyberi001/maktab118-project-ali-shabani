import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "react-hot-toast";
import { Poppins } from "next/font/google";
import { TanstackProvider } from "@/providers/tanstak.provider";

export const metadata: Metadata = {
  title: "techno service",
  description: "Generated by Ali shabani",
};

const myFont = localFont({ src: "./fonts/KalamehWebFaNum-Regular.woff2" });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${myFont.className} antialiased`}>
        <TanstackProvider>
          <Toaster position="top-center" reverseOrder={false} />
          {children}
        </TanstackProvider>
      </body>
    </html>
  );
}
