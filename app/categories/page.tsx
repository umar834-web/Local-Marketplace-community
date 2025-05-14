import { getCategories } from "@/lib/firebase/categories"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link key={category.id} href={`/products?category=${category.id}`}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {category.image && (
                  <div className="relative w-full h-48 mb-4">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                )}
                <p className="text-gray-600">{category.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
} 