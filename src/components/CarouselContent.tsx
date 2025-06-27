'use client';
import { Carousel } from '@/components/ui/carousel';


export function CarouselSection() {
  const slides = [
    {
      title: "A total powerhouse.",
      button: "Buy Now",
      src: "/assets/images/c2.jpg" // You can use local images too
    },
    
    {
      title: "Get Started",
      button: "Buy Now",
      src: "/assets/images/c3.jpg"
    },
    {
      title: "Latest iPhone. Greatest price.",
      button: "Buy Now",
      src: "/assets/images/c4.jpg"
    },
    {
      title: "Minimalistic",
      button: "Buy Now",
      src: "/assets/images/c1.jpg"
    },
    {
      title: "As amazing as ever.",
      button: "Buy Now",
      src: "/assets/images/c6.jpg"
    },
    
  ];

  return (
    <section className="py-20 bg-white pb-25">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-900 dark:text-white">
          Get to Know Iphone
        </h2>
        <Carousel  slides={slides} />
      </div>
    </section>
  );
}

