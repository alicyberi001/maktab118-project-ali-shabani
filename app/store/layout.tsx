import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Poppins } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

// export default function STORELayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <div className="min-h-screen bg-[#D4D9D5]">
//       <Navbar />
//       {children}
//       <Footer />
//     </div>
//   );
// }

export default function STORELayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#D4D9D5]">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
