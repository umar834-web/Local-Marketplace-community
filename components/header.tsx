"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Menu, User, Search, Package, LogOut } from "lucide-react"
import { useState } from "react"
import { useAuth } from "./auth-provider"
import { useCart } from "./cart-provider"
import { signOut } from "@/lib/firebase/auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMobile } from "@/hooks/use-mobile"

export default function Header() {
  const { user } = useAuth()
  const { state } = useCart()
  const isMobile = useMobile()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const cartItemsCount = state.items.reduce((total, item) => total + item.quantity, 0)

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="flex flex-col gap-4 mt-8">
              <Link href="/" className="text-lg font-semibold">
                Home
              </Link>
              <Link href="/products" className="text-lg font-semibold">
                Products
              </Link>
              <Link href="/categories" className="text-lg font-semibold">
                Categories
              </Link>
              <Link href="/sell" className="text-lg font-semibold">
                Sell
              </Link>
              <Link href="/about" className="text-lg font-semibold">
                About
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex items-center gap-2 mr-6">
          <Package className="h-6 w-6" />
          <span className="font-bold hidden sm:inline-block">Local Marketplace</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 mx-6">
          <Link href="/" className="text-sm font-medium">
            Home
          </Link>
          <Link href="/products" className="text-sm font-medium">
            Products
          </Link>
          <Link href="/categories" className="text-sm font-medium">
            Categories
          </Link>
          <Link href="/sell" className="text-sm font-medium">
            Sell
          </Link>
          <Link href="/about" className="text-sm font-medium">
            About
          </Link>
        </nav>

        <div className="flex items-center ml-auto gap-4">
          {!isMobile && (
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search products..." className="w-full pl-8" />
            </div>
          )}

          {isMobile && (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {cartItemsCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account/orders">Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account/listings">My Listings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
          )}
        </div>
      </div>

      {isMobile && isSearchOpen && (
        <div className="container px-4 pb-4">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search products..." className="w-full pl-8" />
          </div>
        </div>
      )}
    </header>
  )
}
