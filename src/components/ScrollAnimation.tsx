//@ts-nocheck

'use client'
import { useScroll, useTransform, motion } from 'framer-motion';
// import Picture1 from '../../public/assets/images/scroll1.jpg'
// import Picture2 from '../../public/assets/images/scroll2.jpg'
// import Picture3 from '../../public/assets/images/scroll3.jpg'
import Lenis from 'lenis';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function ScrollAnimation() {

  const container = useRef();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start']
  })

  useEffect( () => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  return (
    <main className="overflow-hidden bg-white">
      <div className='h-[80vh]'/>
      <div ref={container}>
        <Slide src="/assets/images/logoapple.webp" direction="left" left="-40%" progress={scrollYProgress} />
<Slide src="/assets/images/logoapple.svg" direction="right" left="-25%" progress={scrollYProgress} />
<Slide src="/assets/images/logoapple.svg" direction="left" left="-75%" progress={scrollYProgress} />

      </div>
      <div className='h-[100vh]' />
    </main>
  );
}

const Slide = (props) => {
  const direction = props.direction == 'left' ? -1 : 1;
  const translateX = useTransform(props.progress, [0, 1], [150 * direction, -150 * direction])
  return (
    <motion.div style={{x: translateX, left: props.left}} className="relative flex whitespace-nowrap">
      <Phrase src={props.src}/>
      <Phrase src={props.src}/>
      <Phrase src={props.src}/>
    </motion.div>
  )
}

const Phrase = ({src}) => {

  return (
    <div className={'px-5 flex gap-5 items-center'}>
      <p className='text-[7.5vw] text-black'>iPhone reimagined.</p>
      <span className="h-[8.5vw] aspect-[4/4] flex items-center justify-center">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="w-full h-full stroke-black fill-white"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
    <path d="M10 2c1 .5 2 2 2 5" />
  </svg>
</span>

    </div>
  )
}