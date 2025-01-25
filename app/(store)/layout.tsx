import Navbar from "@/components/navbar";
import Footer from "@/components/footer";



export default function STORELayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
// bg-[#f6f6f6]