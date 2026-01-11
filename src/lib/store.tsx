"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviews: number
  description: string
  stock: number
}

export interface CartItem extends Product {
  quantity: number
}

export interface User {
  id: string
  email: string
  name: string
  role: "user" | "admin"
}

interface StoreContextType {
  cart: CartItem[]
  user: User | null
  isCartOpen: boolean
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  setCartOpen: (open: boolean) => void
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
  cartTotal: number
  cartCount: number
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    category: "Electronics",
    rating: 4.8,
    reviews: 2341,
    description: "Experience crystal-clear audio with our premium wireless headphones featuring active noise cancellation.",
    stock: 50
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    price: 449.99,
    originalPrice: 549.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    category: "Electronics",
    rating: 4.7,
    reviews: 1892,
    description: "Track your fitness, receive notifications, and stay connected with our advanced smartwatch.",
    stock: 35
  },
  {
    id: 3,
    name: "Minimalist Leather Wallet",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80",
    category: "Accessories",
    rating: 4.9,
    reviews: 567,
    description: "Handcrafted genuine leather wallet with RFID protection and slim profile design.",
    stock: 100
  },
  {
    id: 4,
    name: "Organic Cotton T-Shirt",
    price: 45.00,
    originalPrice: 60.00,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
    category: "Clothing",
    rating: 4.6,
    reviews: 1234,
    description: "Sustainable and comfortable organic cotton t-shirt available in multiple colors.",
    stock: 200
  },
  {
    id: 5,
    name: "Professional Camera Lens",
    price: 899.99,
    originalPrice: 1199.99,
    image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=500&q=80",
    category: "Electronics",
    rating: 4.9,
    reviews: 445,
    description: "50mm f/1.4 prime lens perfect for portraits and low-light photography.",
    stock: 15
  },
  {
    id: 6,
    name: "Ceramic Coffee Mug Set",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&q=80",
    category: "Home",
    rating: 4.5,
    reviews: 789,
    description: "Set of 4 handmade ceramic mugs with unique glazed finish.",
    stock: 80
  },
  {
    id: 7,
    name: "Running Shoes Elite",
    price: 179.99,
    originalPrice: 220.00,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    category: "Sports",
    rating: 4.8,
    reviews: 2156,
    description: "Lightweight performance running shoes with responsive cushioning technology.",
    stock: 60
  },
  {
    id: 8,
    name: "Mechanical Keyboard",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&q=80",
    category: "Electronics",
    rating: 4.7,
    reviews: 1567,
    description: "RGB mechanical keyboard with hot-swappable switches and aluminum frame.",
    stock: 45
  },
  {
    id: 9,
    name: "Yoga Mat Premium",
    price: 68.00,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&q=80",
    category: "Sports",
    rating: 4.6,
    reviews: 923,
    description: "Extra thick eco-friendly yoga mat with alignment lines and carrying strap.",
    stock: 120
  },
  {
    id: 10,
    name: "Vintage Sunglasses",
    price: 129.99,
    originalPrice: 169.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80",
    category: "Accessories",
    rating: 4.4,
    reviews: 678,
    description: "Classic aviator sunglasses with polarized lenses and metal frame.",
    stock: 75
  },
  {
    id: 11,
    name: "Plant Pot Collection",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&q=80",
    category: "Home",
    rating: 4.7,
    reviews: 456,
    description: "Set of 3 modern geometric ceramic plant pots in various sizes.",
    stock: 90
  },
  {
    id: 12,
    name: "Wireless Earbuds",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80",
    category: "Electronics",
    rating: 4.8,
    reviews: 3421,
    description: "True wireless earbuds with 30-hour battery life and spatial audio.",
    stock: 150
  }
]

export const categories = ["All", "Electronics", "Clothing", "Accessories", "Home", "Sports"]

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    const savedUser = localStorage.getItem("user")
    if (savedCart) setCart(JSON.parse(savedCart))
    if (savedUser) setUser(JSON.parse(savedUser))
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setIsCartOpen(true)
  }

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId)
      return
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => setCart([])

  const setCartOpen = (open: boolean) => setIsCartOpen(open)

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    if (email && password.length >= 6) {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split("@")[0],
        role: email.includes("admin") ? "admin" : "user"
      }
      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
      return true
    }
    return false
  }

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    if (email && password.length >= 6 && name) {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        role: "user"
      }
      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <StoreContext.Provider
      value={{
        cart,
        user,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        setCartOpen,
        login,
        register,
        logout,
        cartTotal,
        cartCount
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return context
}
