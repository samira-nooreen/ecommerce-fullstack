"use client"

import { products, categories, useStore } from "@/lib/store"
import { ProductCard } from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Truck, Shield, Clock, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useState } from "react"

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const { addToCart } = useStore()

  const filteredProducts = selectedCategory === "All"
    ? products.slice(0, 8)
    : products.filter((p) => p.category === selectedCategory).slice(0, 8)

  const featuredProduct = products[4]

  return (
    <main className="min-h-screen bg-zinc-950 pt-16">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-zinc-950 to-zinc-950" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Summer Sale - Up to 50% Off
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Discover
                <span className="block bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  Premium Products
                </span>
                at Best Prices
              </h1>
              <p className="text-lg text-zinc-400 mb-8 max-w-lg">
                Shop the latest electronics, fashion, and lifestyle products with secure payments and fast delivery.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/products">
                  <Button className="bg-amber-500 hover:bg-amber-600 text-zinc-900 font-semibold h-12 px-8 gap-2">
                    Shop Now
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="border-zinc-700 text-white hover:bg-zinc-800 h-12 px-8"
                  onClick={() => window.parent.postMessage({ type: "OPEN_EXTERNAL_URL", data: { url: "https://demo.example.com" } }, "*")}
                >
                  Live Demo
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-3xl rotate-6" />
                <div className="absolute inset-0 bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden">
                  <Image
                    src={featuredProduct.image}
                    alt={featuredProduct.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-xl">
                  <p className="text-zinc-400 text-xs mb-1">Featured Product</p>
                  <p className="text-white font-semibold">{featuredProduct.name}</p>
                  <p className="text-amber-500 font-bold text-lg">${featuredProduct.price}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 border-y border-zinc-800 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
              { icon: Shield, title: "Secure Payment", desc: "100% protected" },
              { icon: Clock, title: "24/7 Support", desc: "Always here to help" },
              { icon: ArrowRight, title: "Easy Returns", desc: "30-day guarantee" },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">{feature.title}</h3>
                  <p className="text-zinc-500 text-xs">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Shop by Category</h2>
              <p className="text-zinc-400">Find exactly what you&apos;re looking for</p>
            </div>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-amber-500 text-zinc-900"
                    : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/products">
              <Button variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800 gap-2">
                View All Products
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gradient-to-b from-zinc-950 to-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80')] bg-cover bg-center opacity-20" />
            <div className="relative px-8 py-16 lg:px-16 lg:py-20 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Get 20% Off Your First Order
              </h2>
              <p className="text-white/80 mb-8 max-w-md mx-auto">
                Sign up for our newsletter and receive exclusive deals, new arrivals, and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <Button className="bg-zinc-900 hover:bg-zinc-800 text-white font-semibold px-8 py-3 rounded-full">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-semibold mb-4">Shop</h4>
              <ul className="space-y-2">
                <li><Link href="/products" className="text-zinc-400 hover:text-white text-sm transition-colors">All Products</Link></li>
                <li><Link href="/products" className="text-zinc-400 hover:text-white text-sm transition-colors">Electronics</Link></li>
                <li><Link href="/products" className="text-zinc-400 hover:text-white text-sm transition-colors">Fashion</Link></li>
                <li><Link href="/products" className="text-zinc-400 hover:text-white text-sm transition-colors">Home & Living</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Account</h4>
              <ul className="space-y-2">
                <li><Link href="/login" className="text-zinc-400 hover:text-white text-sm transition-colors">Login</Link></li>
                <li><Link href="/login" className="text-zinc-400 hover:text-white text-sm transition-colors">Register</Link></li>
                <li><Link href="/checkout" className="text-zinc-400 hover:text-white text-sm transition-colors">Cart</Link></li>
                <li><Link href="/checkout" className="text-zinc-400 hover:text-white text-sm transition-colors">Orders</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><span className="text-zinc-400 text-sm">Contact Us</span></li>
                <li><span className="text-zinc-400 text-sm">FAQs</span></li>
                <li><span className="text-zinc-400 text-sm">Shipping Info</span></li>
                <li><span className="text-zinc-400 text-sm">Returns</span></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><span className="text-zinc-400 text-sm">Privacy Policy</span></li>
                <li><span className="text-zinc-400 text-sm">Terms of Service</span></li>
                <li><span className="text-zinc-400 text-sm">Cookie Policy</span></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-zinc-500 text-sm">&copy; 2024 ShopVault. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span className="text-zinc-500 text-sm">Secure payments with</span>
              <div className="flex items-center gap-2">
                <div className="w-10 h-6 bg-zinc-800 rounded flex items-center justify-center text-xs text-zinc-400">VISA</div>
                <div className="w-10 h-6 bg-zinc-800 rounded flex items-center justify-center text-xs text-zinc-400">MC</div>
                <div className="w-10 h-6 bg-zinc-800 rounded flex items-center justify-center text-xs text-zinc-400">AMEX</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
