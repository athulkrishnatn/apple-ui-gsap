import React from 'react'

const Content = () => {
  return (
    <div className='bg-white text-black py-8 px-12 h-full w-full flex flex-col justify-between'>
      <Section1 />
      <Section2 />
    </div>
  )
}

const Section1 = () => {
  return (
    <div>
      <Nav />
    </div>
  )
}

const Section2 = () => {
  return (
    <div className='flex justify-between items-end'>
      <h1 className='text-[14vw] leading-[0.8] mt-10 text-black font-semibold max-w-[80%]'>
        Think Different
      </h1>
      <p className='text-sm whitespace-nowrap ml-4 '> <span>© 2025 Apple Inc.</span> </p>
    </div>
  )
}

const Nav = () => {
  return (
    <div className='flex shrink-0 gap-20 mt-15'>
        <span className='absolute font-bold'>iPhone</span>
      <div className='flex flex-col gap-2 mt-10'>
        <h3 className='mb-2 uppercase text-[#00000080] font-medium'>Explore</h3>
        <p>Overview</p>
        <p>Tech Specs</p>
        <p>Compare Models</p>
        <p>Buy iPhone</p>
      </div>
      <div className='flex flex-col gap-2 mt-10'>
        <h3 className='mb-2 uppercase text-[#00000080] font-medium'>Support</h3>
        <p>iPhone Support</p>
        <p>iOS 18 Features</p>
        <p>Trade-In</p>
        <p>Find a Store</p>
      </div>
    </div>
  )
}

export default Content
