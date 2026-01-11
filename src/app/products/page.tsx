"use client"

import { products, categories } from "@/lib/store"
import { ProductCard } from "@/components/ProductCard"
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react"
import { useState, useMemo } from "react"
import { motion } from "framer-motion"

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("featured")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1200])
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = useMemo(() => {
    let result = products

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory)
    }

    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    switch (sortBy) {
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result = [...result].sort((a, b) => b.price - a.price)
        break
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        result = [...result].sort((a, b) => b.id - a.id)
        break
    }

    return result
  }, [selectedCategory, searchQuery, sortBy, priceRange])

  return (
    <main className="min-h-screen bg-zinc-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">All Products</h1>
          <p className="text-zinc-400">Discover our curated collection of premium items</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className={`lg:w-64 flex-shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="sticky top-24 space-y-6">
              <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 p-5">
                <h3 className="text-white font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                        selectedCategory === cat
                          ? "bg-amber-500/20 text-amber-400 font-medium"
                          : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 p-5">
                <h3 className="text-white font-semibold mb-4">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="text-zinc-500 text-xs mb-1 block">Min</label>
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-zinc-500 text-xs mb-1 block">Max</label>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1200"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full accent-amber-500"
                  />
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors flex items-center gap-2"
                >
                  <SlidersHorizontal className="w-5 h-5" />
                  Filters
                </button>

                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none px-4 py-3 pr-10 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <p className="text-zinc-400 text-sm">
                Showing <span className="text-white font-medium">{filteredProducts.length}</span> products
              </p>
              {(selectedCategory !== "All" || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory("All")
                    setSearchQuery("")
                    setPriceRange([0, 1200])
                  }}
                  className="text-amber-500 hover:text-amber-400 text-sm font-medium transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 rounded-full bg-zinc-900 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-zinc-600" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-2">No products found</h3>
                <p className="text-zinc-400">Try adjusting your search or filter criteria</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
