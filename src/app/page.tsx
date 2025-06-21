import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="bg-black">
      <Navbar/>
      <Hero/>
      <Highlights/>
    </div>
  );
}
