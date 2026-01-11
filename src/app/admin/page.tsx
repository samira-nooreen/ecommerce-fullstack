"use client"

import { useStore, products, Product } from "@/lib/store"
import { Button } from "@/components/ui/button"
import {
  Package,
  Users,
  DollarSign,
  TrendingUp,
  ShoppingCart,
  Edit,
  Trash2,
  Plus,
  Search,
  LayoutDashboard,
  LogOut
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function AdminPage() {
  const { user, logout } = useStore()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/login")
    }
  }, [user, router])

  if (!user || user.role !== "admin") {
    return (
      <main className="min-h-screen bg-zinc-950 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-zinc-400">Checking authorization...</p>
        </div>
      </main>
    )
  }

  const stats = [
    { label: "Total Revenue", value: "$45,231.89", change: "+20.1%", icon: DollarSign, color: "text-green-500" },
    { label: "Orders", value: "356", change: "+12.5%", icon: ShoppingCart, color: "text-blue-500" },
    { label: "Products", value: products.length.toString(), change: "+3", icon: Package, color: "text-amber-500" },
    { label: "Customers", value: "2,345", change: "+180", icon: Users, color: "text-purple-500" }
  ]

  const recentOrders = [
    { id: "ORD001", customer: "John Doe", date: "2024-01-15", total: 299.99, status: "Delivered" },
    { id: "ORD002", customer: "Jane Smith", date: "2024-01-15", total: 549.99, status: "Processing" },
    { id: "ORD003", customer: "Mike Johnson", date: "2024-01-14", total: 179.99, status: "Shipped" },
    { id: "ORD004", customer: "Sarah Williams", date: "2024-01-14", total: 89.99, status: "Pending" },
    { id: "ORD005", customer: "Chris Brown", date: "2024-01-13", total: 399.99, status: "Delivered" }
  ]

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-500/20 text-green-400"
      case "Processing":
        return "bg-blue-500/20 text-blue-400"
      case "Shipped":
        return "bg-amber-500/20 text-amber-400"
      case "Pending":
        return "bg-zinc-500/20 text-zinc-400"
      default:
        return "bg-zinc-500/20 text-zinc-400"
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 pt-16">
      <div className="flex">
        <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-zinc-900/50 border-r border-zinc-800 p-4 hidden lg:block">
          <div className="space-y-2">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "products", label: "Products", icon: Package },
              { id: "orders", label: "Orders", icon: ShoppingCart },
              { id: "customers", label: "Customers", icon: Users }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === item.id
                    ? "bg-amber-500/20 text-amber-400"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <button
              onClick={() => {
                logout()
                router.push("/")
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </aside>

        <div className="flex-1 lg:ml-64 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">Admin Dashboard</h1>
                <p className="text-zinc-400">Welcome back, {user.name}</p>
              </div>
              <div className="flex gap-3">
                <Link href="/products">
                  <Button variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800">
                    View Store
                  </Button>
                </Link>
              </div>
            </div>

            {activeTab === "dashboard" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-zinc-900/50 rounded-2xl border border-zinc-800 p-5"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center ${stat.color}`}>
                          <stat.icon className="w-5 h-5" />
                        </div>
                        <span className="text-green-400 text-xs font-medium flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {stat.change}
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                      <p className="text-zinc-500 text-sm">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">Recent Orders</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-zinc-800">
                          <th className="text-left text-sm font-medium text-zinc-400 pb-3">Order ID</th>
                          <th className="text-left text-sm font-medium text-zinc-400 pb-3">Customer</th>
                          <th className="text-left text-sm font-medium text-zinc-400 pb-3">Date</th>
                          <th className="text-left text-sm font-medium text-zinc-400 pb-3">Total</th>
                          <th className="text-left text-sm font-medium text-zinc-400 pb-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order) => (
                          <tr key={order.id} className="border-b border-zinc-800/50 last:border-0">
                            <td className="py-4 text-white text-sm font-medium">{order.id}</td>
                            <td className="py-4 text-zinc-300 text-sm">{order.customer}</td>
                            <td className="py-4 text-zinc-400 text-sm">{order.date}</td>
                            <td className="py-4 text-white text-sm">${order.total.toFixed(2)}</td>
                            <td className="py-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "products" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    />
                  </div>
                  <Button className="bg-amber-500 hover:bg-amber-600 text-zinc-900 font-semibold gap-2">
                    <Plus className="w-4 h-4" />
                    Add Product
                  </Button>
                </div>

                <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-zinc-800 bg-zinc-800/30">
                          <th className="text-left text-sm font-medium text-zinc-400 p-4">Product</th>
                          <th className="text-left text-sm font-medium text-zinc-400 p-4">Category</th>
                          <th className="text-left text-sm font-medium text-zinc-400 p-4">Price</th>
                          <th className="text-left text-sm font-medium text-zinc-400 p-4">Stock</th>
                          <th className="text-left text-sm font-medium text-zinc-400 p-4">Rating</th>
                          <th className="text-right text-sm font-medium text-zinc-400 p-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts.map((product) => (
                          <tr key={product.id} className="border-b border-zinc-800/50 last:border-0 hover:bg-zinc-800/20">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
                                  <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <span className="text-white text-sm font-medium truncate max-w-[200px]">
                                  {product.name}
                                </span>
                              </div>
                            </td>
                            <td className="p-4 text-zinc-400 text-sm">{product.category}</td>
                            <td className="p-4 text-white text-sm">${product.price.toFixed(2)}</td>
                            <td className="p-4">
                              <span
                                className={`text-sm ${
                                  product.stock < 20 ? "text-red-400" : "text-zinc-300"
                                }`}
                              >
                                {product.stock}
                              </span>
                            </td>
                            <td className="p-4 text-amber-400 text-sm">{product.rating}</td>
                            <td className="p-4">
                              <div className="flex items-center justify-end gap-2">
                                <button className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button className="p-2 rounded-lg hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "orders" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-zinc-900/50 rounded-2xl border border-zinc-800 p-6"
              >
                <h2 className="text-lg font-semibold text-white mb-4">All Orders</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-zinc-800">
                        <th className="text-left text-sm font-medium text-zinc-400 pb-3">Order ID</th>
                        <th className="text-left text-sm font-medium text-zinc-400 pb-3">Customer</th>
                        <th className="text-left text-sm font-medium text-zinc-400 pb-3">Date</th>
                        <th className="text-left text-sm font-medium text-zinc-400 pb-3">Total</th>
                        <th className="text-left text-sm font-medium text-zinc-400 pb-3">Status</th>
                        <th className="text-right text-sm font-medium text-zinc-400 pb-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b border-zinc-800/50 last:border-0">
                          <td className="py-4 text-white text-sm font-medium">{order.id}</td>
                          <td className="py-4 text-zinc-300 text-sm">{order.customer}</td>
                          <td className="py-4 text-zinc-400 text-sm">{order.date}</td>
                          <td className="py-4 text-white text-sm">${order.total.toFixed(2)}</td>
                          <td className="py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-4 text-right">
                            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === "customers" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-zinc-900/50 rounded-2xl border border-zinc-800 p-6"
              >
                <h2 className="text-lg font-semibold text-white mb-4">Customer List</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {["John Doe", "Jane Smith", "Mike Johnson", "Sarah Williams", "Chris Brown", "Emily Davis"].map(
                    (name, i) => (
                      <div
                        key={name}
                        className="flex items-center gap-4 p-4 bg-zinc-800/30 rounded-xl border border-zinc-800"
                      >
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-zinc-900 font-bold">
                          {name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium">{name}</p>
                          <p className="text-zinc-500 text-sm">{name.toLowerCase().replace(" ", ".")}@email.com</p>
                        </div>
                        <div className="text-right">
                          <p className="text-amber-500 font-semibold">{(Math.random() * 1000 + 100).toFixed(0)}</p>
                          <p className="text-zinc-500 text-xs">Orders</p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
