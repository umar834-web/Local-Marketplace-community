"use client"

import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const router = useRouter()

  const subtotal = cart.reduce((total, item) => {
    return total + item.product.price * item.quantity
  }, 0)

  const deliveryFee = 5.99
  const total = subtotal + deliveryFee

  const handleCheckout = () => {
    setIsCheckingOut(true)
    // In a real app, you would process the checkout here
    setTimeout(() => {
      clearCart()
      router.push("/checkout/success")
    }, 1500)
  }

  if (cart.length === 0) {
    return (
      <div className="container px-4 md:px-6 py-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Your Cart</h1>
        <p className="text-gray-500 mb-6">Your cart is empty</p>
        <Link href="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Your Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cart.map((item) => (
            <div key={item.product.id} className="flex gap-4 py-4">
              <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                <img
                  src={item.product.imageUrl || "/placeholder.svg?height=100&width=100"}
                  alt={item.product.name}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="flex-1">
                <Link href={`/products/${item.product.id}`} className="font-medium hover:underline">
                  {item.product.name}
                </Link>
                <p className="text-sm text-gray-500">Seller: {item.product.seller.name}</p>
                <p className="text-sm text-gray-500">Location: {item.product.location}</p>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>

                  <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.product.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="text-right">
                <div className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</div>
                <div className="text-sm text-gray-500">${item.product.price.toFixed(2)} each</div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between font-semibold text-lg mb-6">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Button className="w-full" size="lg" onClick={handleCheckout} disabled={isCheckingOut}>
              {isCheckingOut ? "Processing..." : "Checkout"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
