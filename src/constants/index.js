export const WA_NUMBER = '6289525506868'
export const WA_LINK = `https://wa.me/${WA_NUMBER}`

export const getWaOrderLink = (productName) => {
  const text = encodeURIComponent(`Halo, saya ingin memesan: ${productName}`)
  return `${WA_LINK}?text=${text}`
}

/**
 * Build a formatted order message for WhatsApp (product name, quantity, unit price, total).
 * @param {{ productName: string, quantity: number, unitPrice: number }} opts
 * @returns {string} Plain text message (caller should encode for URL).
 */
export const formatWaOrderMessage = ({ productName, quantity, unitPrice }) => {
  const total = quantity * unitPrice
  return [
    'Halo, saya ingin memesan produk berikut:',
    '',
    `📦 *${productName}*`,
    `Jumlah: ${quantity}`,
    `Harga satuan: Rp ${Number(unitPrice).toLocaleString('id-ID')}`,
    `*Total: Rp ${Number(total).toLocaleString('id-ID')}*`,
    '',
    'Terima kasih.',
  ].join('\n')
}

/**
 * WhatsApp link with pre-filled order message (name, quantity, unit price, total).
 */
export const getWaOrderLinkWithDetails = ({ productName, quantity, unitPrice }) => {
  const text = encodeURIComponent(formatWaOrderMessage({ productName, quantity, unitPrice }))
  return `${WA_LINK}?text=${text}`
}

export const CATEGORIES = [
  { id: 'all', label: 'Semua' },
  { id: 'pakaian', label: 'Pakaian' },
  { id: 'aksesoris', label: 'Aksesoris' },
  { id: 'kebutuhan-rumah', label: 'Kebutuhan Rumah' },
  { id: 'elektronik', label: 'Elektronik' },
]

export const PRODUCTS = [
  { id: 1, name: 'Baju Batik Wanita', price: 189000, category: 'pakaian', rating: 4.5 },
  { id: 2, name: 'Tas Rajut Handmade', price: 95000, category: 'aksesoris', rating: 4.8 },
  { id: 3, name: 'Sarung Bantal Set', price: 75000, category: 'kebutuhan-rumah', rating: 4.2 },
  { id: 4, name: 'Kabel Data Type-C', price: 35000, category: 'elektronik', rating: 4.0 },
  { id: 5, name: 'Kerudung Segi Empat', price: 45000, category: 'pakaian', rating: 4.7 },
  { id: 6, name: 'Gelang Kayu', price: 28000, category: 'aksesoris', rating: 4.3 },
  { id: 7, name: 'Tempat Tisu Rotan', price: 55000, category: 'kebutuhan-rumah', rating: 4.6 },
  { id: 8, name: 'Charger Fast Charging', price: 89000, category: 'elektronik', rating: 4.4 },
  { id: 9, name: 'Kemeja Lengan Panjang', price: 165000, category: 'pakaian', rating: 4.1 },
  { id: 10, name: 'Kalung Manik', price: 32000, category: 'aksesoris', rating: 4.9 },
]
