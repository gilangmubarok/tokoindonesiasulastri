function StarRating({ rating }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  const empty = 5 - full - (half ? 1 : 0)
  return (
    <div className="flex items-center gap-0.5 transition-opacity duration-250" aria-label={`Rating: ${rating} dari 5`}>
      {Array.from({ length: full }, (_, i) => (
        <span key={`f-${i}`} className="text-[#F4C430] text-sm">★</span>
      ))}
      {half && <span className="text-[#F4C430] text-sm opacity-80">★</span>}
      {Array.from({ length: empty }, (_, i) => (
        <span key={`e-${i}`} className="text-gray-300 text-sm">★</span>
      ))}
      <span className="text-[#222222]/50 text-xs ml-1">{rating.toFixed(1)}</span>
    </div>
  )
}

export default StarRating
