import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { formatRupiah, todayStr } from '../../utils/format'

const IconExpense = () => (
  <svg className="w-8 h-8 text-[#222222]/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
  </svg>
)

export default function Expense() {
  const { transactions, setTransactions } = useOutletContext()
  const [expenseAmount, setExpenseAmount] = useState('')
  const [expenseDescription, setExpenseDescription] = useState('')
  const [expenseDate, setExpenseDate] = useState(todayStr())

  const handleSaveExpense = (e) => {
    e.preventDefault()
    const amount = parseFloat(expenseAmount)
    if (!expenseDescription.trim() || Number.isNaN(amount) || amount <= 0) return
    setTransactions((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        type: 'expense',
        amount,
        description: expenseDescription.trim(),
        date: expenseDate,
      },
    ])
    setExpenseAmount('')
    setExpenseDescription('')
    setExpenseDate(todayStr())
  }

  const expenseList = [...transactions]
    .filter((t) => t.type === 'expense')
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <>
      <div className="mb-8">
        <h2 className="text-xl font-semibold tracking-tight text-[#222222] sm:text-2xl">Pengeluaran</h2>
        <p className="mt-1.5 text-sm text-[#222222]/60">Tambah dan kelola catatan pengeluaran.</p>
      </div>

      <section className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-100/80 bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)] sm:p-6">
          <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-[#222222] sm:text-lg">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
              <IconExpense />
            </span>
            Tambah Pengeluaran
          </h3>
          <form onSubmit={handleSaveExpense} className="space-y-4">
            <div>
              <label htmlFor="expense-amount" className="mb-1.5 block text-sm font-medium text-[#222222]/80">Jumlah (Rp)</label>
              <input
                id="expense-amount"
                type="number"
                min="1"
                step="1"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                placeholder="0"
                className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-[#222222] placeholder:text-gray-400 focus:border-[#C62828] focus:outline-none focus:ring-2 focus:ring-[#C62828]/20"
              />
            </div>
            <div>
              <label htmlFor="expense-description" className="mb-1.5 block text-sm font-medium text-[#222222]/80">Deskripsi</label>
              <input
                id="expense-description"
                type="text"
                value={expenseDescription}
                onChange={(e) => setExpenseDescription(e.target.value)}
                placeholder="Contoh: Biaya operasional"
                className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-[#222222] placeholder:text-gray-400 focus:border-[#C62828] focus:outline-none focus:ring-2 focus:ring-[#C62828]/20"
              />
            </div>
            <div>
              <label htmlFor="expense-date" className="mb-1.5 block text-sm font-medium text-[#222222]/80">Tanggal</label>
              <input
                id="expense-date"
                type="date"
                value={expenseDate}
                onChange={(e) => setExpenseDate(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-[#222222] focus:border-[#C62828] focus:outline-none focus:ring-2 focus:ring-[#C62828]/20"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg border-2 border-[#C62828] bg-white px-4 py-2.5 text-sm font-semibold text-[#C62828] transition-colors hover:bg-[#C62828]/5 focus:outline-none focus:ring-2 focus:ring-[#C62828] focus:ring-offset-2"
            >
              Simpan Pengeluaran
            </button>
          </form>
        </div>

        <div className="rounded-xl border border-gray-100/80 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)] overflow-hidden">
          <h3 className="mb-4 p-5 pb-0 text-base font-semibold text-[#222222] sm:p-6 sm:text-lg">Daftar Pengeluaran</h3>
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
                {expenseList.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-4 py-10 text-center text-sm text-[#222222]/50 sm:px-6">
                      Belum ada pengeluaran.
                    </td>
                  </tr>
                ) : (
                  expenseList.map((tx) => (
                    <tr key={tx.id} className="transition-colors hover:bg-gray-50/50">
                      <td className="px-4 py-3.5 text-sm font-medium text-[#222222] sm:px-6">{tx.description}</td>
                      <td className="whitespace-nowrap px-4 py-3.5 text-sm text-[#222222]/60 sm:px-6">
                        {new Date(tx.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3.5 text-right text-sm font-medium text-[#222222] sm:px-6">-{formatRupiah(tx.amount)}</td>
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
