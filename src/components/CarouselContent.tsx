'use client';
import { Carousel } from '@/components/ui/carousel';


export function CarouselSection() {
  const slides = [
    {
      title: "Product Demo",
      button: "Try Now",
      src: "/assets/images/c1.jpg" // You can use local images too
    },
    {
      title: "Features Overview", 
      button: "Learn More",
      src: "/assets/images/c8.jpgg"
    },
    {
      title: "Get Started",
      button: "Sign Up",
      src: "/assets/images/c3.jpg"
    },
    {
      title: "Get Started",
      button: "Sign Up",
      src: "/assets/images/c4.jpg"
    },
    {
      title: "Get Started",
      button: "Sign Up",
      src: "/assets/images/c5.jpg"
    },
    {
      title: "Get Started",
      button: "Sign Up",
      src: "/assets/images/c6.jpg"
    },
    
  ];

  return (
    <section className="py-20 bg-white pb-25">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-900 dark:text-white">
          Get to Know Iphone
        </h2>
        <Carousel slides={slides} />
      </div>
    </section>
  );
}

