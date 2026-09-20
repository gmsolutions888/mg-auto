import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BasketProvider } from "@/context/BasketContext";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <BasketProvider>
      <div className="bg-white text-gray-900 flex flex-col flex-1">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </BasketProvider>
  );
}
