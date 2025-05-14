"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "./cart-provider"
import type { Product } from "@/lib/types"
import { ShoppingCart, Check } from "lucide-react"
import { useState } from "react"

interface AddToCartButtonProps {
  product: Product
  variant?: "default" | "secondary" | "outline"
}

export default function AddToCartButton({ product, variant = "default" }: AddToCartButtonProps) {
  const { addToCart } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    addToCart(product)
    setIsAdded(true)

    setTimeout(() => {
      setIsAdded(false)
    }, 2000)
  }

  return (
    <Button variant={variant} className="w-full" onClick={handleAddToCart}>
      {isAdded ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          Added
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </>
      )}
    </Button>
  )
}
