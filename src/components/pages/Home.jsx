import { useState, useMemo } from 'react'
import { CATEGORIES } from '../../constants'
import ProductCard from '../ProductCard'
import ProductDetailModal from '../ProductDetailModal'

const SORT_OPTIONS = [
  { id: 'default', label: 'Default' },
  { id: 'price-asc', label: 'Harga: rendah → tinggi' },
  { id: 'price-desc', label: 'Harga: tinggi → rendah' },
]

function Home({ products = [], onOrderProduct, reduceProductStock, addToCart }) {
  const [category, setCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const [selectedProduct, setSelectedProduct] = useState(null)

  const filtered = useMemo(() => {
    let list =
      category === 'all'
        ? [...products]
        : products.filter((p) => p.category === category)
    const q = searchQuery.trim().toLowerCase()
    if (q) {
      list = list.filter((p) => p.name.toLowerCase().includes(q))
    }
    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => b.price - a.price)
    }
    return list
  }, [category, searchQuery, sortBy, products])

  return (
    <>
      {/* Hero - soft gradient, mobile-first */}
      <section
        id="beranda"
        className="relative overflow-hidden bg-white"
        aria-label="Beranda"
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#C62828]/[0.08] via-[#C62828]/[0.04] to-transparent pointer-events-none"
          aria-hidden
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
          <div className="text-center max-w-2xl mx-auto animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#222222] tracking-tight mb-4 sm:mb-5 leading-tight">
              Selamat Datang di Toko Indonesia Sulastri
            </h1>
            <p className="text-lg sm:text-xl text-[#222222]/80 font-normal leading-relaxed mb-6 sm:mb-8 max-w-xl mx-auto">
              Koleksi pakaian, aksesoris, kebutuhan rumah, dan elektronik berkualitas dengan harga terjangkau.
            </p>
            <a
              href="#produk"
              className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 sm:px-8 sm:py-3.5 sm:min-h-0 rounded-xl bg-[#C62828] text-white font-semibold text-sm sm:text-base shadow-md shadow-[#C62828]/25 hover:shadow-lg hover:shadow-[#C62828]/30 hover:bg-[#B71C1C] active:scale-[0.98] transition-all duration-300"
            >
              Lihat Produk
            </a>
          </div>
        </div>
      </section>

      {/* Products section */}
      <main
        className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10"
        id="produk"
      >
        <div className="mb-4 sm:mb-5">
          <h2 className="text-xl sm:text-2xl font-bold text-[#222222] tracking-tight">
            Produk
          </h2>
          <p className="mt-1 text-sm sm:text-base text-[#222222]/70">
            Pilih kategori atau lihat semua produk
          </p>
        </div>

        {/* Search - real-time filter */}
        <div className="mb-4 sm:mb-5">
          <label htmlFor="product-search" className="sr-only">
            Cari produk
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#222222]/40" aria-hidden>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </span>
            <input
              id="product-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari produk..."
              className="w-full min-h-[44px] sm:min-h-[42px] pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-[#222222] placeholder:text-[#222222]/40 text-sm sm:text-base shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#C62828]/30 focus:border-[#C62828]"
              autoComplete="off"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-[#222222]/50 hover:text-[#222222] hover:bg-gray-100 transition-colors"
                aria-label="Hapus pencarian"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Category filter - horizontal scroll on mobile, clean pills */}
        <div className="mb-4 sm:mb-5 -mx-4 sm:mx-0">
          <div className="flex gap-2 overflow-x-auto pb-2 px-4 sm:px-0 scrollbar-hide scroll-smooth">
            {CATEGORIES.map((c) => {
              const isActive = category === c.id
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id)}
                  className={`shrink-0 min-h-[40px] sm:min-h-0 px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? 'bg-[#C62828] text-white border border-[#C62828] shadow-sm'
                        : 'bg-white text-[#222222]/80 border border-gray-200 hover:bg-gray-50 hover:border-[#C62828]/50 hover:text-[#C62828]'
                    }`}
                >
                  {c.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Sort by price */}
        <div className="mb-4 sm:mb-5 flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-[#222222]/70">Urutkan:</span>
          <div className="flex flex-wrap gap-2">
            {SORT_OPTIONS.map((opt) => {
              const isActive = sortBy === opt.id
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSortBy(opt.id)}
                  className={`
                    shrink-0 min-h-[40px] sm:min-h-0 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActive
                      ? 'bg-[#222222] text-white shadow-sm'
                      : 'bg-gray-100 text-[#222222]/80 hover:bg-gray-200'}
                  `}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Product grid - smooth transition when filtering */}
        {filtered.length > 0 ? (
          <div
            key={`${category}-${searchQuery}-${sortBy}`}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 animate-product-grid-in"
          >
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onOrderProduct={onOrderProduct}
                onOpenDetail={() => setSelectedProduct(p)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-[#222222]/60 py-10 sm:py-12 text-sm sm:text-base animate-fade-in-fast">
            {searchQuery.trim() ? 'Tidak ada produk yang cocok dengan pencarian.' : 'Belum ada produk di kategori ini.'}
          </p>
        )}
      </main>

      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
        onBuyNow={reduceProductStock}
      />
    </>
  )
}

export default Home
