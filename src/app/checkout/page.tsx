"use client"

import { useState } from "react"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { CreditCard, Truck, ShieldCheck, ArrowLeft, Check, Package } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart, user } = useStore()
  const [step, setStep] = useState(1)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [processing, setProcessing] = useState(false)

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States"
  })

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: ""
  })

  const handlePlaceOrder = async () => {
    setProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setOrderPlaced(true)
    clearCart()
    setProcessing(false)
  }

  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-zinc-950 pt-24 pb-16 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Order Confirmed!</h1>
          <p className="text-zinc-400 mb-2">
            Thank you for your purchase. Your order has been placed successfully.
          </p>
          <p className="text-zinc-500 text-sm mb-8">
            Order #: {Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
          <Link href="/products">
            <Button className="bg-amber-500 hover:bg-amber-600 text-zinc-900 font-semibold">
              Continue Shopping
            </Button>
          </Link>
        </motion.div>
      </main>
    )
  }

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-zinc-950 pt-24 pb-16 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-zinc-900 flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-zinc-600" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Your Cart is Empty</h1>
          <p className="text-zinc-400 mb-8">Add some products to get started</p>
          <Link href="/products">
            <Button className="bg-amber-500 hover:bg-amber-600 text-zinc-900 font-semibold">
              Browse Products
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-zinc-950 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/products" className="text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Checkout</h1>
        </div>

        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= s
                      ? "bg-amber-500 text-zinc-900"
                      : "bg-zinc-800 text-zinc-500"
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-16 h-1 ${
                      step > s ? "bg-amber-500" : "bg-zinc-800"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-zinc-900/50 rounded-2xl border border-zinc-800 p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Truck className="w-6 h-6 text-amber-500" />
                  <h2 className="text-xl font-semibold text-white">Shipping Information</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">First Name</label>
                    <input
                      type="text"
                      value={shippingInfo.firstName}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={shippingInfo.lastName}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Email</label>
                    <input
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm text-zinc-400 mb-2">Address</label>
                    <input
                      type="text"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">City</label>
                    <input
                      type="text"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">State</label>
                    <input
                      type="text"
                      value={shippingInfo.state}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">ZIP Code</label>
                    <input
                      type="text"
                      value={shippingInfo.zip}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Country</label>
                    <select
                      value={shippingInfo.country}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                    </select>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={() => setStep(2)}
                    className="bg-amber-500 hover:bg-amber-600 text-zinc-900 font-semibold px-8"
                  >
                    Continue to Payment
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-zinc-900/50 rounded-2xl border border-zinc-800 p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="w-6 h-6 text-amber-500" />
                  <h2 className="text-xl font-semibold text-white">Payment Details</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={paymentInfo.cardName}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={paymentInfo.expiry}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, expiry: e.target.value })}
                        className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                        className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="border-zinc-700 text-white hover:bg-zinc-800"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    className="bg-amber-500 hover:bg-amber-600 text-zinc-900 font-semibold px-8"
                  >
                    Review Order
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-zinc-900/50 rounded-2xl border border-zinc-800 p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <ShieldCheck className="w-6 h-6 text-amber-500" />
                  <h2 className="text-xl font-semibold text-white">Review Order</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-zinc-800/50 rounded-xl p-4">
                    <h3 className="text-sm font-medium text-zinc-400 mb-2">Shipping To</h3>
                    <p className="text-white">
                      {shippingInfo.firstName} {shippingInfo.lastName}
                    </p>
                    <p className="text-zinc-400 text-sm">
                      {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}
                    </p>
                    <p className="text-zinc-400 text-sm">{shippingInfo.email}</p>
                  </div>

                  <div className="bg-zinc-800/50 rounded-xl p-4">
                    <h3 className="text-sm font-medium text-zinc-400 mb-2">Payment Method</h3>
                    <p className="text-white">
                      •••• •••• •••• {paymentInfo.cardNumber.slice(-4) || "****"}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="border-zinc-700 text-white hover:bg-zinc-800"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handlePlaceOrder}
                    disabled={processing}
                    className="bg-amber-500 hover:bg-amber-600 text-zinc-900 font-semibold px-8 gap-2"
                  >
                    {processing ? (
                      <div className="w-5 h-5 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Place Order - ${cartTotal.toFixed(2)}
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-zinc-900/50 rounded-2xl border border-zinc-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
              
              <div className="space-y-4 max-h-64 overflow-y-auto mb-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm truncate">{item.name}</p>
                      <p className="text-zinc-400 text-sm">Qty: {item.quantity}</p>
                      <p className="text-amber-500 font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-zinc-800 pt-4 space-y-2">
                <div className="flex justify-between text-zinc-400 text-sm">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-400 text-sm">
                  <span>Shipping</span>
                  <span className="text-green-500">Free</span>
                </div>
                <div className="flex justify-between text-zinc-400 text-sm">
                  <span>Tax</span>
                  <span>${(cartTotal * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white text-lg font-semibold pt-2 border-t border-zinc-800">
                  <span>Total</span>
                  <span className="text-amber-500">${(cartTotal * 1.08).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
