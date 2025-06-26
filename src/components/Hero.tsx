"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useEffect, useRef, useState } from "react"
import { heroVideo, smallHeroVideo } from "@/utils"

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState("")

  const handleVideoSrcSet = () => {
    if (window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo)
    } else {
      setVideoSrc(heroVideo)
    }
  }

  useEffect(() => {
    handleVideoSrcSet() // ✅ Set on initial mount
    window.addEventListener("resize", handleVideoSrcSet)

    return () => {
      window.removeEventListener("resize", handleVideoSrcSet)
    }
  }, [])

  const heroRef = useRef(null)
  useGSAP(() => {
    gsap.to(heroRef.current, {
      opacity: 1,
      delay: 1.5,
    })
  })

  useGSAP(() => {
    gsap.to("#hero", { opacity: 1, delay: 2 })
    gsap.to("#cta", { opacity: 1, y: -50, delay: 2 })
  }, [])

  return (
    <section className="w-full h-[calc(100vh-60px)] bg-black relative">
      <div className="h-5/6 w-full flex justify-center items-center flex-col">
        <p
          ref={heroRef}
          className="text-center font-normal text-xl md:text-4xl text-gray-100 opacity-0 max-md:mb-10"
        >
          Designed to be loved
        </p>
        <div className="md:w-10/12 w-9/12">
          {videoSrc && (
            <video
              className="pointer-events-none"
              autoPlay
              muted
              loop
              preload="auto"
              playsInline={true}
              key={videoSrc}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          )}
        </div>
      </div>

      <div id="cta" className="flex flex-col items-center opacity-0 translate-y-20">
        <a
          href="#highlights"
          className="px-5 py-2 rounded-3xl bg-white my-5 hover:bg-gray-300 text-black ease-in"
        >
          Buy
        </a>
        <p className="font-normal text-xl">From $199/month or $999</p>
      </div>
    </section>
  )
}

export default Hero
