import StarRating from './StarRating'

function ProductCard({ product, onOpenDetail }) {
  const { id, name, price, rating, image_url, stock } = product
  const outOfStock = typeof stock === 'number' && stock === 0

  const handleCardClick = () => {
    onOpenDetail?.()
  }

  return (
    <article
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick()
        }
      }}
      className="group relative bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 ease-out flex flex-col cursor-pointer min-h-0"
      aria-label={`Lihat detail ${name}`}
    >
      {outOfStock && (
        <span
          className="absolute top-3 left-3 z-10 rounded-full bg-[#222222] px-2.5 py-1 text-xs font-semibold text-white shadow-sm"
          aria-label="Stok habis"
        >
          Out of Stock
        </span>
      )}

      <div className="aspect-square min-h-[120px] sm:min-h-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
        {image_url ? (
          <img
            src={image_url}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-4xl sm:text-5xl" aria-hidden>📦</span>
        )}
      </div>

      <div className="p-4 sm:p-4 flex flex-col flex-1 min-h-[88px] sm:min-h-0 justify-center">
        <h2 className="font-semibold text-[#222222] text-sm sm:text-base line-clamp-2 mb-1.5 leading-snug">
          {name}
        </h2>

        {typeof rating === 'number' && <StarRating rating={rating} />}

        <p className="mt-2 sm:mt-3 text-[#C62828] font-extrabold text-lg sm:text-xl">
          Rp {Number(price).toLocaleString('id-ID')}
        </p>

        {typeof stock === 'number' && (
          <p className="mt-1 text-sm text-[#222222]/60">
            Stok: {stock}
          </p>
        )}
      </div>
    </article>
  )
}

export default ProductCard