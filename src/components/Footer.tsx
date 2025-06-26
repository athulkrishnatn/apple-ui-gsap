import React from 'react'
import Content from './Content'

const Footer = () => {
  return (
    <div className='bg-black relative h-[800px]'
    style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
    >
        <div className='fixed w-full h-[800px] bottom-0'>
            <Content/>
        </div>
      
    </div>
  )
}

export default Footer
