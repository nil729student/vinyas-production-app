'use client'
import React, { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {

  const [activeLink, setActiveLink] = useState('');
  const [showLinks, setShowLinks] = useState(false);

  const handleClick = (path) => {
    setActiveLink(path);
  };

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-color-nav p-6">
      <div className='flex items-center'>
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">Grup Viñas</span>
        </div>
        <div className="block lg:hidden">
          <button onClick={toggleLinks} className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v15z" /></svg>
          </button>
        </div>
      </div>

      
      <div className={` ${showLinks ? 'block' : 'hidden'}  block  lg:flex lg:items-center lg:w-center`}>
        <div className="text-sm lg:flex-grow">
          <Link href="/admin" passHref onClick={() => handleClick('/admin')} className={`block mt-4 lg:inline-block lg:mt-0 ${activeLink === '/admin' ? 'text-neutral-100' : 'text-color-secondary'} hover:text-neutral-100 mr-4`}>
            Admin
          </Link>
          <Link href="/escandalls" passHref onClick={() => handleClick('/escandalls')} className={`block mt-4 lg:inline-block lg:mt-0 ${activeLink === '/escandalls' ? 'text-neutral-100' : 'text-color-secondary'} hover:text-neutral-100 mr-4`}>
            Escandalls
          </Link>
          <Link href="/panel" passHref onClick={() => handleClick('/panel')} className={`block mt-4 lg:inline-block lg:mt-0 ${activeLink === '/panel' ? 'text-neutral-100' : 'text-color-secondary'} hover:text-neutral-100 mr-4`}>
            Panell de control
          </Link>
          <Link href="/formArticles" passHref onClick={() => handleClick('/formArticles')} className={`block mt-4 lg:inline-block lg:mt-0 ${activeLink === '/formArticles' ? 'text-neutral-100' : 'text-color-secondary'} hover:text-neutral-100 mr-4`}>
            Form Articles
          </Link>

          <Link href="/relacioDePesos" passHref onClick={() => handleClick('/relacioDePesos')} className={`block mt-4 lg:inline-block lg:mt-0 ${activeLink === '/contact' ? 'text-neutral-100' : 'text-color-secondary'} hover:text-neutral-100 mr-4`}>
            Relació de pesos
          </Link>
          <Link href="/ia" passHref onClick={() => handleClick('/ia')} className={`block mt-4 lg:inline-block lg:mt-0 ${activeLink === '/ia' ? 'text-neutral-100' : 'text-color-secondary'} hover:text-neutral-100 mr-4`}>
            IA
          </Link>
        </div>
      </div>
    </nav>
  )
}
