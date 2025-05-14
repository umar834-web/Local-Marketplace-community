import { getProducts } from "@/lib/firebase/products"
import { getCategories } from "@/lib/firebase/categories"
import ProductCard from "@/components/product-card"
import ProductFilters from "@/components/product-filters"
import ProductSearch from "@/components/product-search"

export default async function ProductsPage() {
  const products = await getProducts()
  const categories = await getCategories()

  return (
    <div className="container px-4 md:px-6 py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">All Products</h1>

      <div className="mb-6">
        <ProductSearch />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <ProductFilters categories={categories} />
        </div>

        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
