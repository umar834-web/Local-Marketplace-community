"use client"

import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"
import Image from "next/image"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"

export default function CartPage() {
  const { state, dispatch } = useCart()

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-2">
          {state.items.map((item) => (
            <Card key={item.id} className="mb-4">
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-24">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <p className="font-medium">{formatPrice(item.price)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                    className="w-20 text-center"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                  >
                    <Icons.close className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>{formatPrice(state.total)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{formatPrice(state.total)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg" asChild>
                <Link href="/checkout">
                  <Icons.creditCard className="mr-2 h-4 w-4" />
                  Checkout
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
