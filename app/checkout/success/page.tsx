import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function CheckoutSuccessPage() {
  return (
    <div className="container px-4 md:px-6 py-16 text-center">
      <div className="max-w-md mx-auto">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight mb-4">Order Confirmed!</h1>
        <p className="text-gray-500 mb-8">
          Thank you for your order. We've sent a confirmation email with all the details. Your items will be delivered
          soon!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products">
            <Button variant="outline">Continue Shopping</Button>
          </Link>
          <Link href="/account/orders">
            <Button>View Order</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
