'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, CreditCard, Download, Play, FileAudio, FileText, ExternalLink, Check } from 'lucide-react'

interface Product {
  id: string
  title: string
  titleAr?: string
  description: string
  descriptionAr?: string
  price: number
  currency: string
  image: string
  fileUrl?: string
  type: string
  category: string
}

export default function Store() {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<string[]>([])
  const [showCheckout, setShowCheckout] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('products')
    if (saved) {
      setProducts(JSON.parse(saved))
    }
  }, [])

  const formatPrice = (price: number, currency: string) => {
    const symbols: Record<string, string> = {
      USD: '$',
      EUR: '€',
      SAR: 'ر.س',
      EGP: 'ج.م'
    }
    return `${symbols[currency] || currency}${price}`
  }

  const addToCart = (productId: string) => {
    if (!cart.includes(productId)) {
      setCart([...cart, productId])
    }
  }

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(id => id !== productId))
  }

  const cartTotal = cart.reduce((total, id) => {
    const product = products.find(p => p.id === id)
    return total + (product?.price || 0)
  }, 0)

  const selectedProducts = products.filter(p => cart.includes(p.id))

  if (products.length === 0) return null

  return (
    <section id="store" className="py-24 px-6 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Store</h2>
          <div className="w-20 h-1 bg-accent rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 card-hover"
            >
              {product.image && (
                <div className="h-48 bg-gray-200 dark:bg-gray-700">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                    {product.type}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600">
                    {formatPrice(product.price, product.currency)}
                  </span>
                  
                  <button
                    onClick={() => addToCart(product.id)}
                    disabled={cart.includes(product.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      cart.includes(product.id)
                        ? 'bg-green-500 text-white'
                        : 'bg-accent hover:bg-accent-hover text-white'
                    }`}
                  >
                    {cart.includes(product.id) ? (
                      <>
                        <Check className="w-4 h-4" /> Added
                      </>
                    ) : (
                      <>
                      <ShoppingCart className="w-4 h-4" /> Add to Cart
                    </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cart Sidebar */}
        {cart.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 left-6 z-40 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 w-80"
          >
            <h4 className="font-semibold mb-3">Shopping Cart ({cart.length})</h4>
            <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
              {selectedProducts.map(p => (
                <div key={p.id} className="flex items-center justify-between text-sm">
                  <span className="truncate flex-1">{p.title}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{formatPrice(p.price, p.currency)}</span>
                    <button 
                      onClick={() => removeFromCart(p.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mb-3">
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span className="text-green-600">{formatPrice(cartTotal, 'USD')}</span>
              </div>
            </div>
            <button
              onClick={() => setShowCheckout(true)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all"
            >
              <CreditCard className="w-4 h-4" /> Checkout
            </button>
          </motion.div>
        )}

        {/* Checkout Modal */}
        {showCheckout && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md p-6">
              <h3 className="text-xl font-semibold mb-4">Checkout</h3>
              <div className="space-y-3 mb-4">
                {selectedProducts.map(p => (
                  <div key={p.id} className="flex justify-between">
                    <span>{p.title}</span>
                    <span className="font-medium">{formatPrice(p.price, p.currency)}</span>
                  </div>
                ))}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span className="text-green-600">{formatPrice(cartTotal, 'USD')}</span>
                </div>
              </div>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                />
                <input
                  type="text"
                  placeholder="Card number (demo)"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Demo mode - no real payments
              </p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setShowCheckout(false)}
                  className="flex-1 py-2 border border-gray-300 dark:border-gray-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Thank you! This is a demo. In production, integrate with Stripe.')
                    setCart([])
                    setShowCheckout(false)
                  }}
                  className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}