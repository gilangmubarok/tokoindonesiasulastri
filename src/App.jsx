import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/pages/Home'
import AdminLogin from './components/pages/AdminLogin'
import AdminLayout from './components/admin/AdminLayout'
import Dashboard from './components/pages/Dashboard'
import Income from './components/pages/Income'
import Expense from './components/pages/Expense'
import Products from './components/pages/Products'
import CartModal from './components/CartModal'
import { supabase } from './supabase'

function ProtectedDashboard({ products, setProducts, transactions, setTransactions }) {
  const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true'
  if (!isLoggedIn) return <Navigate to="/admin" replace />

  const outletContext = { products, setProducts, transactions, setTransactions }
  return <AdminLayout outletContext={outletContext} />
}

function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [])
  
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
  
    if (!error) {
      setProducts(data)
    } else {
      console.error(error)
    }
  }

  const [transactions, setTransactions] = useState([])
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const reduceProductStock = (productId, quantity = 1) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, stock: Math.max(0, (p.stock ?? 0) - quantity) }
          : p
      )
    )
  }

  const addToCart = (productId, quantity) => {
    setCart((prev) => {
      const i = prev.findIndex((c) => c.productId === productId)

      if (i >= 0) {
        const next = [...prev]
        next[i] = { ...next[i], quantity: next[i].quantity + quantity }
        return next
      }

      return [...prev, { productId, quantity }]
    })
  }

  const updateCartQuantity = (productId, quantity) => {
    setCart((prev) => {
      if (quantity <= 0) {
        return prev.filter((c) => c.productId !== productId)
      }

      return prev.map((c) =>
        c.productId === productId ? { ...c, quantity } : c
      )
    })
  }

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((c) => c.productId !== productId))
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen flex flex-col pb-20 md:pb-6">
            <Navbar
              cartItemCount={cart.reduce((sum, c) => sum + c.quantity, 0)}
              onCartClick={() => setIsCartOpen(true)}
            />

            <Home
              products={products}
              reduceProductStock={reduceProductStock}
              addToCart={addToCart}
            />

            <Footer />

            <CartModal
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              cart={cart}
              products={products}
              onUpdateQuantity={updateCartQuantity}
              onRemoveItem={removeFromCart}
            />
          </div>
        }
      />

      <Route path="/admin" element={<AdminLogin />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedDashboard
            products={products}
            setProducts={setProducts}
            transactions={transactions}
            setTransactions={setTransactions}
          />
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="income" element={<Income />} />
        <Route path="expense" element={<Expense />} />
        <Route path="products" element={<Products />} />
      </Route>
    </Routes>
  )
}

export default App