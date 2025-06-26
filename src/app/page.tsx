import { CarouselSection } from "@/components/CarouselContent";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";

import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="bg-black">
      <Navbar/>
      <Hero/>
      <Highlights/>
      <CarouselSection/>
      <Footer/>
    </div>
  );
}
