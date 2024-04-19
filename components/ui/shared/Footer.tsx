import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='border-t'>
      <div className='flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row'>
        <Link href={'/'}>
          <Image 
          src={'/assets/images/linkup_logo.svg'} 
          alt='logo'
          width={58}
          height={38}
          />
        </Link>
        <p>&copy; 2024 LinkUp. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer