import { useOutletContext } from 'react-router-dom'
import { formatRupiah } from '../../utils/format'

const BRAND_RED = '#C62828'
const BRAND_GOLD = '#F4C430'

const IconIncome = () => (
  <svg className="w-8 h-8" style={{ color: BRAND_RED }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)
const IconExpense = () => (
  <svg className="w-8 h-8 text-[#222222]/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
  </svg>
)
const IconProfit = () => (
  <svg className="w-8 h-8" style={{ color: BRAND_GOLD }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 011.414-1.414L21 7.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75h12v8.25H3V9.75z" />
  </svg>
)

export default function Dashboard() {
  const { transactions } = useOutletContext()

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)
  const netProfit = totalIncome - totalExpense

  return (
    <>
      <div className="mb-8">
        <h2 className="text-xl font-semibold tracking-tight text-[#222222] sm:text-2xl">Ringkasan keuangan</h2>
        <p className="mt-1.5 text-sm text-[#222222]/60">Ikhtisar pendapatan, pengeluaran, dan laba bersih.</p>
      </div>

      <section className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-3">
        <div className="flex items-start gap-4 rounded-xl border border-gray-100/80 bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)] transition-shadow duration-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] sm:p-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#C62828]/10">
            <IconIncome />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wider text-[#222222]/50">Total Income</p>
            <p className="mt-1.5 text-xl font-bold tracking-tight text-[#C62828] sm:text-2xl">{formatRupiah(totalIncome)}</p>
            <p className="mt-0.5 text-sm text-[#222222]/55">Pendapatan total</p>
          </div>
        </div>
        <div className="flex items-start gap-4 rounded-xl border border-gray-100/80 bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)] transition-shadow duration-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] sm:p-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100">
            <IconExpense />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wider text-[#222222]/50">Total Expense</p>
            <p className="mt-1.5 text-xl font-bold tracking-tight text-[#222222] sm:text-2xl">{formatRupiah(totalExpense)}</p>
            <p className="mt-0.5 text-sm text-[#222222]/55">Pengeluaran total</p>
          </div>
        </div>
        <div className="flex items-start gap-4 rounded-xl border border-gray-100/80 bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)] transition-shadow duration-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] sm:p-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F4C430]/20">
            <IconProfit />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wider text-[#222222]/50">Net Profit</p>
            <p className={`mt-1.5 text-xl font-bold tracking-tight sm:text-2xl ${netProfit >= 0 ? 'text-[#F4C430]' : 'text-red-600'}`}>{formatRupiah(netProfit)}</p>
            <p className="mt-0.5 text-sm text-[#222222]/55">Laba bersih</p>
          </div>
        </div>
      </section>
    </>
  )
}
