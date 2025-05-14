import Link from "next/link"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import CategorySection from "@/components/category-section"
import HeroSection from "@/components/hero-section"
import { getProducts } from "@/lib/firebase/products"

export default async function Home() {
  const products = await getProducts(8)

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      {/* Categories */}
      <section className="py-12 bg-gray-50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-8">Shop by Category</h2>
          <CategorySection />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
            <Link href="/products">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Local Delivery */}
      <section className="py-12 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-4">Fast Local Delivery</h2>
              <p className="text-gray-500 mb-6">
                We deliver products right to your doorstep within your local area. Support local businesses and get your
                items quickly!
              </p>
              <Link href="/about">
                <Button>Learn More</Button>
              </Link>
            </div>
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg?height=300&width=500"
                alt="Local delivery"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Join Community */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Join Our Community</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Connect with local sellers and buyers in your area. Support local businesses and find unique products.
          </p>
          <Link href="/signup">
            <Button variant="secondary" size="lg">
              Sign Up Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
