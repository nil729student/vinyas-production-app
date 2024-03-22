import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">Grup Viñas</span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v15z"/></svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          
          <Link href="/admin" passHref className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              admin
          </Link>
          <Link href="/escandalls" passHref className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            Escandalls
          </Link>
          <Link href="/panel" passHref className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            Panell de control
          </Link>
          <Link href="/formArticles" passHref className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            Form Articles
          </Link>
          <Link href="/contact" passHref className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
              Contact
          </Link>
        </div>
      </div>
    </nav>
  )
}