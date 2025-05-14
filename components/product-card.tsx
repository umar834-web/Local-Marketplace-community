import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import AddToCartButton from "./add-to-cart-button"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square overflow-hidden">
          <img
            src={product.imageUrl || "/placeholder.svg?height=300&width=300"}
            alt={product.name}
            className="object-cover w-full h-full transition-transform hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-medium line-clamp-1 hover:underline">{product.name}</h3>
        </Link>
        <div className="flex items-center justify-between mt-2">
          <span className="font-semibold">${product.price.toFixed(2)}</span>
          <span className="text-sm text-muted-foreground">{product.location}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <AddToCartButton product={product} variant="secondary" />
      </CardFooter>
    </Card>
  )
}
