'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { headerLinks } from '@/constants'

const NavItems = () => {
  const pathname = usePathname();
  return (
    <ul className='flex md:flex-between w-full flex-col items-start gap-5 md:flex-row'>
      {headerLinks.map((link)=>{
        const isActive = pathname === link.route;
        return (
          <li key={link.route}
          className={`${isActive && 'text-primary-500'} flex-center p-medium-16 whitespace-nowrap`}>
            <Link href={link.route}>{link.label}</Link>
          </li>
        )
      })}
    </ul>
  )
}

export default NavItems