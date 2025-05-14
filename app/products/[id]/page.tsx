import { getProductById, getRelatedProducts } from "@/lib/firebase/products"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { notFound } from "next/navigation"
import Link from "next/link"
import ProductCard from "@/components/product-card"
import AddToCartButton from "@/components/add-to-cart-button"

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product.category, product.id, 4)

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <img
            src={product.imageUrl || "/placeholder.svg?height=600&width=600"}
            alt={product.name}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex flex-col">
          <div>
            <Link href={`/products?category=${product.category}`} className="text-sm text-primary hover:underline">
              {product.category}
            </Link>
            <h1 className="text-3xl font-bold tracking-tight mt-2 mb-4">{product.name}</h1>
            <div className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</div>
            <p className="text-gray-500 mb-6">{product.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium">Seller: {product.seller.name}</span>
              <span className="text-sm font-medium">Location: {product.location}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <AddToCartButton product={product} />
              <Button variant="outline">Contact Seller</Button>
            </div>
          </div>

          <Separator className="my-6" />

          <div>
            <h3 className="font-semibold mb-2">Delivery Information</h3>
            <p className="text-sm text-gray-500 mb-4">
              This product is available for delivery within {product.deliveryRadius} miles of {product.location}.
              Estimated delivery time: {product.estimatedDelivery}.
            </p>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
