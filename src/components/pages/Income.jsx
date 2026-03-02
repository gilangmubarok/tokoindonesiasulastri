import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { formatRupiah, todayStr } from '../../utils/format'

const IconIncome = () => (
  <svg className="w-8 h-8" style={{ color: '#C62828' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

export default function Income() {
  const { transactions, setTransactions } = useOutletContext()
  const [incomeAmount, setIncomeAmount] = useState('')
  const [incomeDescription, setIncomeDescription] = useState('')
  const [incomeDate, setIncomeDate] = useState(todayStr())

  const handleSaveIncome = (e) => {
    e.preventDefault()
    const amount = parseFloat(incomeAmount)
    if (!incomeDescription.trim() || Number.isNaN(amount) || amount <= 0) return
    setTransactions((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: 'income',
        amount,
        description: incomeDescription.trim(),
        date: incomeDate,
      },
    ])
    setIncomeAmount('')
    setIncomeDescription('')
    setIncomeDate(todayStr())
  }

  const incomeList = [...transactions]
    .filter((t) => t.type === 'income')
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <>
      <div className="mb-8">
        <h2 className="text-xl font-semibold tracking-tight text-[#222222] sm:text-2xl">Pendapatan</h2>
        <p className="mt-1.5 text-sm text-[#222222]/60">Tambah dan kelola catatan pendapatan.</p>
      </div>

      <section className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-100/80 bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)] sm:p-6">
          <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-[#222222] sm:text-lg">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C62828]/10">
              <IconIncome />
            </span>
            Tambah Pendapatan
          </h3>
          <form onSubmit={handleSaveIncome} className="space-y-4">
            <div>
              <label htmlFor="income-amount" className="mb-1.5 block text-sm font-medium text-[#222222]/80">Jumlah (Rp)</label>
              <input
                id="income-amount"
                type="number"
                min="1"
                step="1"
                value={incomeAmount}
                onChange={(e) => setIncomeAmount(e.target.value)}
                placeholder="0"
                className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-[#222222] placeholder:text-gray-400 focus:border-[#C62828] focus:outline-none focus:ring-2 focus:ring-[#C62828]/20"
              />
            </div>
            <div>
              <label htmlFor="income-description" className="mb-1.5 block text-sm font-medium text-[#222222]/80">Deskripsi</label>
              <input
                id="income-description"
                type="text"
                value={incomeDescription}
                onChange={(e) => setIncomeDescription(e.target.value)}
                placeholder="Contoh: Penjualan produk A"
                className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-[#222222] placeholder:text-gray-400 focus:border-[#C62828] focus:outline-none focus:ring-2 focus:ring-[#C62828]/20"
              />
            </div>
            <div>
              <label htmlFor="income-date" className="mb-1.5 block text-sm font-medium text-[#222222]/80">Tanggal</label>
              <input
                id="income-date"
                type="date"
                value={incomeDate}
                onChange={(e) => setIncomeDate(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-[#222222] focus:border-[#C62828] focus:outline-none focus:ring-2 focus:ring-[#C62828]/20"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-[#C62828] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#A01E1E] focus:outline-none focus:ring-2 focus:ring-[#C62828] focus:ring-offset-2"
            >
              Simpan Pendapatan
            </button>
          </form>
        </div>

        <div className="rounded-xl border border-gray-100/80 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)] overflow-hidden">
          <h3 className="mb-4 p-5 pb-0 text-base font-semibold text-[#222222] sm:p-6 sm:text-lg">Daftar Pendapatan</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead>
                <tr className="bg-gray-50/80">
                  <th scope="col" className="px-4 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-[#222222]/60 sm:px-6">Deskripsi</th>
                  <th scope="col" className="px-4 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-[#222222]/60 sm:px-6">Tanggal</th>
                  <th scope="col" className="px-4 py-3.5 text-right text-xs font-medium uppercase tracking-wider text-[#222222]/60 sm:px-6">Jumlah</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {incomeList.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-4 py-10 text-center text-sm text-[#222222]/50 sm:px-6">
                      Belum ada pendapatan.
                    </td>
                  </tr>
                ) : (
                  incomeList.map((tx) => (
                    <tr key={tx.id} className="transition-colors hover:bg-gray-50/50">
                      <td className="px-4 py-3.5 text-sm font-medium text-[#222222] sm:px-6">{tx.description}</td>
                      <td className="whitespace-nowrap px-4 py-3.5 text-sm text-[#222222]/60 sm:px-6">
                        {new Date(tx.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3.5 text-right text-sm font-medium text-[#C62828] sm:px-6">{formatRupiah(tx.amount)}</td>
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
