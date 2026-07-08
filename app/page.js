import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import Emergency from "@/components/landing/Emergency";
import Community from "@/components/landing/Community";
import SafetyMap from "@/components/landing/SafetyMap";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FDF6EC]">
      <Navbar />
      <Hero />
      <SafetyMap />
      <Emergency />
      <Community />
      <Footer />
    </main>
  );
}
