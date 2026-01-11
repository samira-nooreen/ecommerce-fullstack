"use client"

import { StoreProvider } from "@/lib/store"
import { Navbar } from "@/components/Navbar"
import { CartDrawer } from "@/components/CartDrawer"
import { ReactNode } from "react"

export function StoreWrapper({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      <Navbar />
      <CartDrawer />
      {children}
    </StoreProvider>
  )
}
