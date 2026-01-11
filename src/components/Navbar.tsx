"use client"

import Link from "next/link"
import { ShoppingCart, User, Search, Menu, X, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"
import { useState } from "react"

export function Navbar() {
  const { cartCount, setCartOpen, user, logout } = useStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <Package className="w-5 h-5 text-zinc-900" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">ShopVault</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">
                Home
              </Link>
              <Link href="/products" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">
                Products
              </Link>
              {user?.role === "admin" && (
                <Link href="/admin" className="text-amber-400 hover:text-amber-300 transition-colors text-sm font-medium">
                  Admin
                </Link>
              )}
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-zinc-400 hover:text-white hover:bg-zinc-800"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-zinc-900 text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>

            {user ? (
              <div className="hidden md:flex items-center gap-3">
                <span className="text-sm text-zinc-400">Hi, {user.name}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link href="/login" className="hidden md:block">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                >
                  <User className="w-5 h-5" />
                </Button>
              </Link>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-zinc-400 hover:text-white hover:bg-zinc-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-zinc-800">
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>
              <Link
                href="/"
                className="text-zinc-300 hover:text-white transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-zinc-300 hover:text-white transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
              {user?.role === "admin" && (
                <Link
                  href="/admin"
                  className="text-amber-400 hover:text-amber-300 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin Dashboard
                </Link>
              )}
              {user ? (
                <div className="flex items-center justify-between py-2">
                  <span className="text-zinc-400">Hi, {user.name}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      logout()
                      setMobileMenuOpen(false)
                    }}
                    className="border-zinc-700 text-zinc-300"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="text-zinc-300 hover:text-white transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login / Register
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
