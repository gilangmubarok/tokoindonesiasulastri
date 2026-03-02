import { useMemo } from "react"
import { formatRupiah } from "../utils/format"

function CartModal({
  isOpen,
  onClose,
  cart = [],
  products = [],
  onUpdateQuantity,
  onRemoveItem,
}) {
  const items = useMemo(
    () =>
      cart
        .map((entry) => {
          const product = products.find((p) => p.id === entry.productId)
          if (!product) return null
          return { ...product, quantity: entry.quantity }
        })
        .filter(Boolean),
    [cart, products]
  )

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const handleCheckout = () => {
    if (!items.length) return

    const phoneNumber = "6289525506868"

    let message = "Halo, saya ingin memesan:\n\n"

    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`
      message += `   ${item.quantity} x ${formatRupiah(item.price)}\n`
      message += `   Subtotal: ${formatRupiah(
        item.price * item.quantity
      )}\n\n`
    })

    message += `Total: ${formatRupiah(total)}\n\n`
    message += "Mohon diproses ya. Terima kasih 🙏"

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`

    window.open(url, "_blank")
  }

  if (!isOpen) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose?.()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={handleBackdropClick}
    >
      <div className="absolute inset-0 bg-[#222222]/60 backdrop-blur-sm animate-fade-in-fast" />
      <div
        className="relative w-full max-w-lg max-h-[90vh] sm:max-h-[85vh] overflow-hidden bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/90 text-[#222222] shadow-md hover:bg-white transition-colors"
        >
          ✕
        </button>

        <div className="px-4 pt-4 pb-2 sm:px-6 sm:pt-6 border-b border-gray-100">
          <h2 className="text-lg sm:text-xl font-semibold text-[#222222]">
            Keranjang Belanja
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#222222]/60">
            Tinjau produk yang telah Anda tambahkan ke keranjang.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3 sm:px-6 sm:py-4">
          {items.length === 0 ? (
            <p className="py-10 text-center text-sm text-[#222222]/55">
              Keranjang Anda masih kosong.
            </p>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white shadow-sm px-3 py-3"
                >
                  <div className="h-12 w-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center shrink-0">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span>📦</span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[#222222] line-clamp-2">
                      {item.name}
                    </p>
                    <p className="mt-0.5 text-xs text-[#222222]/60">
                      {formatRupiah(item.price)} × {item.quantity}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm font-semibold text-[#222222]">
                      {formatRupiah(item.price * item.quantity)}
                    </span>

                    <div className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 overflow-hidden">
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateQuantity?.(
                            item.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="w-7 h-7 text-xs hover:bg-gray-200"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateQuantity?.(
                            item.id,
                            item.quantity + 1
                          )
                        }
                        className="w-7 h-7 text-xs hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveItem?.(item.id)}
                      className="text-[11px] text-[#222222]/50 hover:text-red-600"
                    >
                      Hapus
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-gray-100 bg-white px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-[#222222]/70">Total</span>
            <span className="text-base sm:text-lg font-bold text-[#222222]">
              {formatRupiah(total)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCheckout}
            className="w-full min-h-[44px] rounded-xl bg-[#222222] text-white text-sm font-semibold shadow-md hover:bg-[#333333] active:scale-[0.98] transition-all duration-200"
          >
            Lanjutkan
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartModal