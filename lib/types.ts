export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  categoryId: string
  userId: string
  createdAt: Date
}

export interface Category {
  id: string
  name: string
  description: string
  image: string
}

export interface User {
  id: string
  name: string
  email: string
  addresses: Address[]
}

export interface Address {
  id: string
  street: string
  city: string
  state: string
  zipCode: string
  isDefault: boolean
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  shippingAddress: Address
  createdAt: Date
}

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  price: number
}
