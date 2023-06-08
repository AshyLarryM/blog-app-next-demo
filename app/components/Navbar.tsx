import React from 'react'
import Link from 'next/link'
import { FaLaptopCode, FaGithub, FaLinkedin } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

export default function Navbar() {
  return (
    <nav className='bg-slate-800 p-4 sticky top-0 drop-shadow-xl z-10'>
        <div className='prose prose-xl mx-auto flex justify-between flex-col sm:flex-row'>
          <h1 className='text-3xl font-bold text-white grid place-content-center mb-2 md:mb-0'>
            <Link href='/' className='text-white/90 no-underline hover:text-white'>
              Lawrence Markel
            </Link>
          </h1>
          <div className='flex flex-row justify-center sm:justify-evenly align-middle gap-4 text-white text-2xl lg:text-3xl'>
              <Link className="text-slate-300 hover:text-slate-100" href="https://www.lawrencemarkel.com/">
                <FaLaptopCode />
              </Link>
              <Link className="text-slate-300 hover:text-slate-100" href="https://github.com/AshyLarryM">
                <FaGithub/>
              </Link>
              <Link className="text-slate-300 hover:text-slate-100" href="https://www.linkedin.com/in/lawrence-markel-9687a721b/">
                <FaLinkedin />
              </Link> 
              <Link href='/newsletter' className='text-slate-300 no-underline hover:text-slate-100'>
                <MdEmail />
            </Link>
          </div>
        </div>
    </nav>
  )
}
