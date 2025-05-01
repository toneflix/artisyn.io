'use client'
import React, { useState } from 'react';
import Nav from '@/components/comon/nav';
import Search from '@/components/form/search';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';

function Header() {
  const [seach, setSeach] = useState('')
  return (
    <div className='p-4 min-h-svh'>
      <Nav />

      <div
        className='absolute inset-0 flex flex-col items-center justify-end z-10
        py-20 px-10 text-center text-white max-w-3xl mx-auto pointer-events-none'>
        <h1 className='text-4xl md:text-[80px] font-bold'>Hire Skilled Artisans for Every Job</h1>
        <p className='mt-6 text-xl font-medium text-[#D9D9D9]'>
          From repairs to renovations, find trusted local experts ready to bring your project to life. Seamless hiring, quality service, every time.
        </p>

        <div className='space-y-4 mt-16 pointer-events-auto'>
          <Search
            value={seach}
            onChange={setSeach}
            placeholder='Who are you looking for?'
            button='Find Artisan'
          />

          <Button variant='link' asChild>
            <Link href='/dashboard' className='text-white text-xl'>
              How to become an Curator?
              <ArrowRightIcon className='w-4 h-4' />
            </Link>
          </Button>
        </div>
      </div>

      <div className='absolute inset-0 p-4'>
        <video
          autoPlay
          loop
          muted
          playsInline
          className='rounded-xl w-full h-full object-cover'
        >
          <source src="/videos/befe0f091330efca4015d2ea6a2f74ab33d15bef.mp4" type="video/mp4" />
        </video>

        <div className='absolute inset-0 bg-[#0B0C1B]/[47%] mix-blend-multiply' />
      </div>
    </div>
  )
};

export default Header;