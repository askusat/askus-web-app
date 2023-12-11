'use client'

import React, { useState } from 'react'
import { Button, Input } from "@nextui-org/react";

export default function ContactForm() {
    const [firstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [Email, setEmail] = useState('')
    const [Subject, setSubject] = useState('')
    const [Help, setHelp] = useState('')
  return (
      <div className="text-black  max-w-[600px] w-full h-[600px] border-t-primary border-t-[8px] bg-white border-2 rounded-lg shadow-xl pt-10 px-8">

          <div className="flex justify-center  items-center gap-3 ">
              <div className="flex w-full flex-col">
                  <h1 className='text-black font-medium pl-2'>FirstName</h1>
                  <Input type="text" variant='bordered' label="Enter your FirstName" className="" onChange={(e: any) => setFirstName(e.target.value)} />
              </div>
              <div className="flex w-full flex-col">
                  <h1 className='text-black font-medium pl-2'>LastName</h1>
                  <Input type="text" variant='bordered' label="Enter your FirstName" className="outline-" onChange={(e: any) => setLastName(e.target.value)} />
              </div>
          </div>

          <div className="mt-4 flex flex-col">
              <h1 className='text-black font-medium pl-2'>Email</h1>
              <Input type="Email" variant='bordered' label="Email" className="outline-" onChange={(e: any) => setEmail(e.target.value)} />
          </div>
          <div className="mt-4 flex flex-col">
              <h1 className='text-black font-medium pl-2'>Subject</h1>
              <Input type="text" variant='bordered' label="Select" className="" onChange={(e: any) => setSubject(e.target.value)} />
          </div>
          <div className="mt-4 flex flex-col">
              <h1 className='text-black font-medium pl-2'>How can We Help?</h1>
              <Input type="text" variant='bordered' label="Message"  className="w-full h-[150px]" onChange={(e: any) => setHelp(e.target.value)} />
          </div>
          <div className='flex items-center justify-center '>
              <Button
                  className=" bg-primary text-white rounded-[10px]"
                  size="lg"
              >
                  Get started
              </Button>
          </div>
      </div>
  )
}
