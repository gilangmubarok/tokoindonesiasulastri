import { useState, useEffect } from 'react'
import { getWaOrderLinkWithDetails } from '../constants'
import StarRating from './StarRating'

function ProductDetailModal({ product, isOpen, onClose, onAddToCart, onBuyNow }) {
  const [quantity, setQuantity] = useState(1)
  const stock = typeof product?.stock === 'number' ? product.stock : 10
  const outOfStock = stock === 0
  const maxQty = Math.max(0, stock)

  useEffect(() => {
    if (isOpen && product) {
      setQuantity(1)
    }
  }, [isOpen, product?.id])

  useEffect(() => {
    if (!isOpen) return
    const next = Math.min(Math.max(1, quantity), maxQty)
    if (next !== quantity) setQuantity(next)
  }, [maxQty, isOpen])

  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [isOpen])

  if (!product) return null

  const { id, name, price, rating, imageUrl } = product
  const total = quantity * price

  const handleIncrease = () => setQuantity((q) => Math.min(q + 1, maxQty))
  const handleDecrease = () => setQuantity((q) => Math.max(1, q - 1))
  const handleAddToCart = () => {
    onAddToCart?.(id, quantity)
    onClose?.()
  }
  const handleBuyNow = () => {
    onBuyNow?.(id, quantity)
    window.open(
      getWaOrderLinkWithDetails({ productName: name, quantity, unitPrice: price }),
      '_blank',
      'noopener,noreferrer'
    )
    onClose?.()
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose?.()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose?.()
  }

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-detail-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onKeyDown={handleKeyDown}
    >
      <div
        className="absolute inset-0 bg-[#222222]/60 backdrop-blur-sm animate-fade-in-fast"
        aria-hidden
        onClick={handleBackdropClick}
      />
      <div
        className="relative w-full max-w-lg max-h-[90vh] sm:max-h-[85vh] overflow-hidden bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/90 text-[#222222] shadow-md hover:bg-white transition-colors"
          aria-label="Tutup"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="overflow-y-auto flex-1">
          <div className="aspect-square w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            {imageUrl ? (
              <img src={imageUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="text-6xl" aria-hidden>📦</span>
            )}
          </div>
          <div className="p-4 sm:p-6">
            <h2 id="product-detail-title" className="text-xl sm:text-2xl font-bold text-[#222222] pr-10">
              {name}
            </h2>
            {typeof rating === 'number' && (
              <div className="mt-2">
                <StarRating rating={rating} />
              </div>
            )}
            <p className="mt-3 text-[#C62828] font-extrabold text-2xl">
              Rp {Number(price).toLocaleString('id-ID')}
            </p>
            <p className="mt-1 text-sm text-[#222222]/60">
              Stok: {stock}
            </p>

            <div className="mt-5">
              <span className="block text-sm font-medium text-[#222222]/80 mb-2">Jumlah</span>
              <div className="inline-flex items-center rounded-xl border border-gray-200 bg-gray-50 overflow-hidden">
                <button
                  type="button"
                  onClick={handleDecrease}
                  disabled={quantity <= 1 || outOfStock}
                  className="flex items-center justify-center min-w-[48px] min-h-[48px] text-[#222222] hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors"
                  aria-label="Kurangi jumlah"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span
                  className="min-w-[3rem] text-center font-semibold text-[#222222] text-lg tabular-nums"
                  aria-live="polite"
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={handleIncrease}
                  disabled={quantity >= maxQty || outOfStock}
                  className="flex items-center justify-center min-w-[48px] min-h-[48px] text-[#222222] hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors"
                  aria-label="Tambah jumlah"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            <p className="mt-3 text-sm text-[#222222]/70">
              Subtotal: <span className="font-semibold text-[#222222]">Rp {Number(total).toLocaleString('id-ID')}</span>
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-6 border-t border-gray-100 bg-white space-y-3">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={outOfStock}
            className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 rounded-xl bg-[#222222] text-white font-semibold shadow-md hover:bg-[#333333] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Tambah ke Keranjang
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            disabled={outOfStock}
            className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-white font-semibold shadow-md hover:bg-[#20BD5A] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Beli sekarang via WhatsApp"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.865 9.865 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Beli Sekarang via WhatsApp
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailModal
