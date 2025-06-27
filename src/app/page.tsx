import { CarouselSection } from "@/components/CarouselContent";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";

import Navbar from "@/components/Navbar";
import ScrollAnimation from "@/components/ScrollAnimation";

export default function Home() {
  return (
    <div className="bg-black">
      <Navbar/>
      <Hero/>
      <CarouselSection/>
      <Highlights/>
      
      <ScrollAnimation/>
      <Footer/>
    </div>
  );
}
