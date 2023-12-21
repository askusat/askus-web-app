import React from 'react'

export default function ChatPageV2() {
  return (
    <div className='h-screen w-screen overflow-auto'>
      <div className="bg-primary h-[8vh]"></div>
      <div className="grid lg:grid-cols-[1fr,3fr] md:grid-cols-[1fr,2fr] w-full h-[92vh]">
        <div className="bg-red-600 h-full">
          <div className="h-[88%] bg-gray-600"></div>
          <div className="h-[12%] bg-black"></div>
        </div>
        <div className="bg-green-600">
          <div className="h-[88%] bg-gray-900"></div>
          <div className="h-[12%] bg-orange-600"></div>
        </div>
      </div>
    </div>
  )
}
