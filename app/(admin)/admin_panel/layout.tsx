import type { Metadata } from "next";
import localFont from "next/font/local";
// import "./globals.css";
import { Poppins } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import AdminLayout from "@/components/adminLayout";

export default function ADMINLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div dir="rtl" className="min-h-screen bg-[#D4D9D5] pt-24 overflow-y-auto">
      <AdminLayout />
      {children}
    </div>
  );
}
