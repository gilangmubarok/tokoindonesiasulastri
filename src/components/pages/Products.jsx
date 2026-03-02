import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { formatRupiah } from '../../utils/format'
import { supabase } from '../../supabase'

const NavIconProducts = () => (
  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
  </svg>
)

export default function Products() {
  const { products, setProducts } = useOutletContext()
  const [productName, setProductName] = useState('')
  const [productImageUrl, setProductImageUrl] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productStock, setProductStock] = useState('')
  const [editingProductId, setEditingProductId] = useState(null)
  const [uploading, setUploading] = useState(false)

  // Fungsi untuk handle upload gambar ke Supabase Storage
  const handleUploadImage = async (e) => {
    try {
      setUploading(true)
      const file = e.target.files[0]
      if (!file) return

      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      // Upload file ke bucket 'produk-foto'
      const { error: uploadError } = await supabase.storage
        .from('produk-foto')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // Ambil Public URL
      const { data } = supabase.storage
        .from('produk-foto')
        .getPublicUrl(filePath)

      setProductImageUrl(data.publicUrl)
    } catch (error) {
      alert('Gagal mengunggah gambar: ' + error.message)
    } finally {
      setUploading(false)
    }
  }

  const handleSaveProduct = async (e) => {
    e.preventDefault()

    const name = productName.trim()
    const price = parseFloat(productPrice)
    const stock = parseInt(productStock, 10)

    if (!name || Number.isNaN(price) || price < 0 || Number.isNaN(stock) || stock < 0) {
      alert('Isi data dengan benar')
      return
    }

    const imageUrl = productImageUrl || ''

    if (editingProductId) {
      const { error } = await supabase
        .from('products')
        .update({ name, price, stock, image_url: imageUrl })
        .eq('id', editingProductId)

      if (error) {
        alert('Gagal update produk')
        console.error(error)
        return
      }
    } else {
      const { error } = await supabase
        .from('products')
        .insert([{ name, price, stock, image_url: imageUrl }])

      if (error) {
        alert('Gagal simpan produk')
        console.error(error)
        return
      }
    }

    window.location.reload()
  }

  const handleEditProduct = (p) => {
    setProductName(p.name)
    setProductImageUrl(p.image_url || '')
    setProductPrice(String(p.price))
    setProductStock(String(p.stock))
    setEditingProductId(p.id)
  }

  const handleDeleteProduct = async (id) => {
    if (!confirm('Hapus produk ini?')) return
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (!error) {
      window.location.reload()
    }
  }

  const handleCancelEdit = () => {
    setEditingProductId(null)
    setProductName('')
    setProductImageUrl('')
    setProductPrice('')
    setProductStock('')
  }

  return (
    <>
      <div className="mb-8">
        <h2 className="text-xl font-semibold tracking-tight text-[#222222] sm:text-2xl">Produk</h2>
        <p className="mt-1.5 text-sm text-[#222222]/60">Kelola katalog produk toko.</p>
      </div>

      <section className="mb-10">
        <div className="rounded-xl border border-gray-100/80 bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)] sm:p-6 max-w-xl">
          <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-[#222222] sm:text-lg">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C62828]/10">
              <NavIconProducts />
            </span>
            {editingProductId != null ? 'Edit Produk' : 'Tambah Produk'}
          </h3>
          <form onSubmit={handleSaveProduct} className="space-y-4">
            <div>
              <label htmlFor="product-name" className="mb-1.5 block text-sm font-medium text-[#222222]/80">Nama Produk</label>
              <input
                id="product-name"
                type="text"
                required
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Contoh: Baju Batik Wanita"
                className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-[#222222] placeholder:text-gray-400 focus:border-[#C62828] focus:outline-none focus:ring-2 focus:ring-[#C62828]/20"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#222222]/80">Foto Produk</label>
              <div className="space-y-3">
                {productImageUrl && (
                  <div className="relative h-24 w-24 overflow-hidden rounded-lg border border-gray-200">
                    <img src={productImageUrl} alt="Preview" className="h-full w-full object-cover" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUploadImage}
                  disabled={uploading}
                  className="w-full text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-[#C62828]/10 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-[#C62828] hover:file:bg-[#C62828]/20 cursor-pointer"
                />
                {uploading && <p className="text-xs text-gray-500 animate-pulse">Sedang mengunggah...</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="product-price" className="mb-1.5 block text-sm font-medium text-[#222222]/80">Harga (Rp)</label>
                <input
                  id="product-price"
                  type="number"
                  min="0"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  placeholder="0"
                  className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-[#222222] placeholder:text-gray-400 focus:border-[#C62828] focus:outline-none focus:ring-2 focus:ring-[#C62828]/20"
                />
              </div>
              <div>
                <label htmlFor="product-stock" className="mb-1.5 block text-sm font-medium text-[#222222]/80">Stok</label>
                <input
                  id="product-stock"
                  type="number"
                  min="0"
                  value={productStock}
                  onChange={(e) => setProductStock(e.target.value)}
                  placeholder="0"
                  className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-[#222222] placeholder:text-gray-400 focus:border-[#C62828] focus:outline-none focus:ring-2 focus:ring-[#C62828]/20"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={uploading}
                className="w-full sm:w-auto rounded-lg bg-[#C62828] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#A01E1E] focus:outline-none focus:ring-2 focus:ring-[#C62828] focus:ring-offset-2 disabled:opacity-50"
              >
                {editingProductId != null ? 'Update Produk' : 'Simpan Produk'}
              </button>
              {editingProductId != null && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="w-full sm:w-auto rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-[#222222]/80 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>
      </section>

      <section>
        <h3 className="mb-4 text-base font-semibold text-[#222222] sm:text-lg">Daftar Produk</h3>
        <div className="overflow-hidden rounded-xl border border-gray-100/80 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)]">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead>
                <tr className="bg-gray-50/80">
                  <th scope="col" className="px-4 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-[#222222]/60 sm:px-6">Gambar</th>
                  <th scope="col" className="px-4 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-[#222222]/60 sm:px-6">Nama</th>
                  <th scope="col" className="px-4 py-3.5 text-right text-xs font-medium uppercase tracking-wider text-[#222222]/60 sm:px-6">Harga</th>
                  <th scope="col" className="px-4 py-3.5 text-right text-xs font-medium uppercase tracking-wider text-[#222222]/60 sm:px-6">Stok</th>
                  <th scope="col" className="px-4 py-3.5 text-right text-xs font-medium uppercase tracking-wider text-[#222222]/60 sm:px-6">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-sm text-[#222222]/50 sm:px-6">
                      Belum ada produk. Tambah produk menggunakan form di atas.
                    </td>
                  </tr>
                ) : (
                  products.map((p) => (
                    <tr key={p.id} className="transition-colors hover:bg-gray-50/50">
                      <td className="whitespace-nowrap px-4 py-3.5 sm:px-6">
                        <div className="h-10 w-10 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center shrink-0">
                          {p.image_url ? (
                            <img src={p.image_url} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <span className="text-gray-400 text-lg">📦</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-sm font-medium text-[#222222] sm:px-6">{p.name}</td>
                      <td className="whitespace-nowrap px-4 py-3.5 text-right text-sm font-medium text-[#222222] sm:px-6">{formatRupiah(p.price)}</td>
                      <td className="whitespace-nowrap px-4 py-3.5 text-right text-sm sm:px-6">
                        <span className={p.stock === 0 ? 'text-red-600 font-medium' : 'text-[#222222]/80'}>{p.stock}</span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3.5 text-right sm:px-6">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleEditProduct(p)}
                            className="rounded-lg p-2 text-[#222222]/70 hover:bg-[#C62828]/10 hover:text-[#C62828] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C62828]/30"
                            title="Edit produk"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.897L6 18l.809-2.685a4.5 4.5 0 011.897-1.897l8.932-8.931zm0 0L19.5 7.125" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(p.id)}
                            className="rounded-lg p-2 text-[#222222]/70 hover:bg-red-50 hover:text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/30"
                            title="Hapus produk"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}