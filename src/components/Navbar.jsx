import { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar({ cartItemCount = 0, onCartClick }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { href: '#beranda', label: 'Beranda' },
    { href: '#produk', label: 'Produk' },
    { href: '#tentang', label: 'Tentang' },
    { href: '#kontak', label: 'Kontak' },
  ]

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm transition-shadow duration-250">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[4.25rem] sm:h-20 gap-4">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <Link
              to="/"
              className="font-semibold text-[#222222] text-base sm:text-lg tracking-tight transition-colors duration-250 hover:text-brand-primary truncate"
            >
              Toko Indonesia Sulastri
            </Link>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={onCartClick}
              className="relative flex items-center justify-center min-h-[40px] min-w-[40px] rounded-full text-[#222222] hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200"
              aria-label="Buka keranjang"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItemCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] rounded-full bg-[#C62828] text-white text-[10px] font-semibold px-1"
                  aria-label={`${cartItemCount} item di keranjang`}
                >
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden flex items-center justify-center min-h-[44px] min-w-[44px] p-2.5 rounded-xl text-[#222222] hover:bg-gray-100 active:bg-gray-200 transition-colors duration-250 aria-expanded:bg-gray-100"
              aria-expanded={menuOpen}
              aria-label="Buka menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-3.5 rounded-lg text-sm font-medium text-[#222222]/80 hover:text-brand-primary transition-all duration-300 after:absolute after:left-4 after:right-4 after:bottom-2.5 after:h-0.5 after:bg-[#C62828] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center after:rounded-full"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-250 ease-out ${
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-gray-100 bg-gray-50/80 px-4 py-3">
          <nav className="flex flex-col gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="min-h-[44px] flex items-center py-3 px-4 rounded-xl text-[#222222] font-medium hover:bg-white hover:text-brand-primary active:bg-gray-100 transition-colors duration-250"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar
