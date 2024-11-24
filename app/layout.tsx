import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Poppins } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <div className="min-h-screen bg-[#D4D9D5]">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
