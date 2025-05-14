"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-24 w-24 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Order Successful!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>
        <p className="text-gray-600 mb-8">
          You will receive an email confirmation shortly with order details.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/account/orders">View Orders</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
