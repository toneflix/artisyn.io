'use client'
import Logo from '@/components/comon/logo';
import MaxWidthWrap from '@/components/comon/max-width-wrap';
import { Button } from '@/components/ui/button';
import { MenuIcon } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

function Nav() {
  const navItems = [
    {
      label: 'Find Artisans',
      href: '#'
    },
    {
      label: 'Curator Dashboard',
      href: '/dashboard'
    }
  ]
  const [showMobileNav, setShowMobileNav] = useState(false)

  return (
    <MaxWidthWrap className='w-full p-8 relative z-50'>
      <nav className='flex justify-between items-center'>
        <Link className='md:hidden' href='/'>
          <Logo className='h-6.5 text-white' />  
        </Link>

        <div
          className={`flex gap-6 md:gap-2 items-center
          max-md:flex-col max-md:p-6 max-md:items-start max-md:w-2/3
          ${showMobileNav ? 'max-md:translate-x-0' : 'max-md:translate-x-full pointer-events-none'}
          transition-transform max-md:duration-300 ease-in-out
          max-md:fixed max-md:inset-y-0 max-md:right-0 max-md:bg-black/90 z-10`}>
          <Link href='/'>
            <Logo className='h-6.5 text-white' />  
          </Link>

          {navItems.map((item) => (
            <Button
              variant='ghost'
              key={item.label}
              className='text-white'
              asChild
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </div>

        {showMobileNav && <div onClick={() => setShowMobileNav(false)} className='md:hidden fixed inset-0' />}
        <button
          onClick={() => setShowMobileNav(prev => !prev)}
          className='md:hidden text-white cursor-pointer'>
          <MenuIcon size='40' />
        </button>

        <Button className='max-md:hidden bg-white text-black hover:bg-white/80 cursor-pointer'>
          Connect Wallet
        </Button>
      </nav>
    </MaxWidthWrap>
  )
}

export default Nav