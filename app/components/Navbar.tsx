// import React from 'react'
// import Link from 'next/link'
// import { FaLaptopCode, FaGithub, FaLinkedin } from 'react-icons/fa'
// import { MdEmail } from 'react-icons/md'

// export default function Navbar() {
//   return (
//     <nav className='bg-gradient-to-r from-blue-800 via-purple-800 to-pink-800 p-4 sticky top-0 drop-shadow-xl z-10'>
//         <div className='prose prose-xl mx-auto flex justify-between flex-col sm:flex-row'>
//           <h1 className='text-3xl font-bold text-white grid place-content-center mb-2 md:mb-0'>
//             <Link href='/' className='text-slate-300 no-underline hover:text-sky-100'>
//               Lawrence Markel
//             </Link>
//           </h1>
//           <div className='flex flex-row justify-center sm:justify-evenly align-middle gap-4 text-white text-2xl lg:text-3xl'>
//               <Link className="text-slate-300 hover:text-slate-100" href="https://www.lawrencemarkel.com/">
//                 <FaLaptopCode />
//               </Link>
//               <Link className="text-slate-300 hover:text-slate-100" href="https://github.com/AshyLarryM">
//                 <FaGithub/>
//               </Link>
//               <Link className="text-slate-300 hover:text-slate-100" href="https://www.linkedin.com/in/lawrence-markel-9687a721b/">
//                 <FaLinkedin />
//               </Link> 
//               <Link href='/newsletter' className='text-slate-300 no-underline hover:text-slate-100'>
//                 <MdEmail />
//             </Link>
//           </div>
//         </div>
//     </nav>
//   )
// }
'use client'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/' },
  { name: 'Github', href: 'https://github.com/AshyLarryM' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/lawrence-markel-9687a721b/' },
]

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-gradient-to-r from-blue-900 via-purple-900 to-purple-950 sticky top-0 drop-shadow-xl z-10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
        <Link href='/' className='text-slate-300 font-bold text-xl no-underline hover:text-sky-100'>
          Lawrence Markel
        </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-100"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-slate-300 hover:text-slate-100">
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button className='py-2 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl hover:bg-gradient-to-r hover:from-blue-500 hover:via-purple-500 hover:to-pink-500'>
          <a href="/newsletter" className="text-md font-bold leading-6 text-slate-200">
            Sign up <span aria-hidden="true">&rarr;</span>
          </a>
          </button>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gradient-to-r from-blue-950 to-purple-950 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5 font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              <h1>Lawrence Markel</h1>
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-slate-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-200 hover:bg-gradient-to-r from-blue-800 to-purple-800 hover:text-slate-100"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a
                  href="/newsletter"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-bold leading-7 text-pink-400 hover:bg-gradient-to-r from-blue-800 to-purple-800 hover:text-pink-400"
                >
                  Sign Up For Updates
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
