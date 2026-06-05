import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold text-indigo-600">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-indigo-600 text-white">S</span>
          ShopEasy
        </Link>
        <ul className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <li><Link to="/" className="hover:text-indigo-600">Home</Link></li>
          <li><Link to="/" className="hover:text-indigo-600">Products</Link></li>
          <li><a href="#" className="hover:text-indigo-600">About</a></li>
          <li><a href="#" className="hover:text-indigo-600">Contact</a></li>
        </ul>
        <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700">
          Sign In
        </button>
      </nav>
    </header>
  )
}
