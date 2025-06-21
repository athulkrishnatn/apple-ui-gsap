"use client"

import { rightImg, watchImg } from "@/utils"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import Image from "next/image"
import VideoCarousel from "./VideoCarousel"


const Highlights = () => {
  useGSAP(()=> {
    gsap.to('#title', { opacity:1, y:0})
    gsap.to('.link', {opacity:1, y:0, duration:1, })
  },[])


  return (
    <section id="highlights" className=" bg-zinc-900 w-screen overflow-hidden h-full ">
      
      <div className="mx-auto relative max-w-[1120px]">
        <div className="mb-12 w-full md:flex items-end justify-between">
          <h1 id="title" className="text-gray lg:text-6xl md:text-5xl text-3xl lg:mb-0 mb-5 font-medium opacity-0 translate-y-20
  ">Get the highlights</h1>

        <div className="flex flex-wrap items-end gap-5">
          <p  className="link text-blue hover:underline cursor-pointer flex items-center text-xl opacity-0 translate-y-20">
            Watch the film
            <Image src={watchImg} alt="watch" className="ml-2" width={20} height={20} />
          </p>
          <p  className="link text-blue hover:underline cursor-pointer flex items-center text-xl opacity-0 translate-y-20">
            Watch the Event
            <Image src={rightImg} alt="rightImg" className="ml-2" width={10} height={10} />
          </p>
        </div>

        </div>

        <VideoCarousel/>

      </div>
    </section>
  )
}

export default Highlights
