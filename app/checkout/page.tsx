"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Icons } from "@/components/icons"
import { formatPrice } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

export default function CheckoutPage() {
  const { state, dispatch } = useCart()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")

  // Shipping info state
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    email: "",
    phone: "",
  })

  // Card details state
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  })

  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    })
  }

  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate payment processing
    setTimeout(() => {
      // Clear cart after successful checkout
      dispatch({ type: "CLEAR_CART" })

      toast({
        title: "Order successful!",
        description: "Your order has been placed successfully.",
      })

      // Redirect to success page
      router.push("/checkout/success")
      
      setIsLoading(false)
    }, 2000)
  }

  if (state.items.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
              <CardDescription>
                Enter your shipping details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={shippingInfo.name} 
                  onChange={handleShippingInfoChange} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input 
                  id="address" 
                  name="address" 
                  value={shippingInfo.address} 
                  onChange={handleShippingInfoChange} 
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" 
                    name="city" 
                    value={shippingInfo.city} 
                    onChange={handleShippingInfoChange} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input 
                    id="state" 
                    name="state" 
                    value={shippingInfo.state} 
                    onChange={handleShippingInfoChange} 
                    required 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input 
                    id="zipCode" 
                    name="zipCode" 
                    value={shippingInfo.zipCode} 
                    onChange={handleShippingInfoChange} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input 
                    id="country" 
                    name="country" 
                    value={shippingInfo.country} 
                    onChange={handleShippingInfoChange} 
                    required 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={shippingInfo.email} 
                  onChange={handleShippingInfoChange} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  type="tel" 
                  value={shippingInfo.phone} 
                  onChange={handleShippingInfoChange} 
                  required 
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>
                Select your payment method
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex-1">Credit/Debit Card</Label>
                  <div className="flex space-x-1">
                    <Icons.creditCard className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal" className="flex-1">PayPal</Label>
                  <div className="text-blue-500 font-bold">PayPal</div>
                </div>
              </RadioGroup>

              {paymentMethod === "card" && (
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input 
                      id="cardNumber" 
                      name="number" 
                      placeholder="1234 5678 9012 3456" 
                      value={cardDetails.number} 
                      onChange={handleCardDetailsChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input 
                      id="cardName" 
                      name="name" 
                      placeholder="John Doe" 
                      value={cardDetails.name} 
                      onChange={handleCardDetailsChange} 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input 
                        id="expiry" 
                        name="expiry" 
                        placeholder="MM/YY" 
                        value={cardDetails.expiry} 
                        onChange={handleCardDetailsChange} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input 
                        id="cvc" 
                        name="cvc" 
                        placeholder="123" 
                        value={cardDetails.cvc} 
                        onChange={handleCardDetailsChange} 
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {state.items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} x {item.quantity}</span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(state.total)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-bold mt-2">
                  <span>Total</span>
                  <span>{formatPrice(state.total)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={handleSubmit} 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Place Order"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
} 