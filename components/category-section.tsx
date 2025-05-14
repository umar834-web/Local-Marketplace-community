import Link from "next/link"
import { getCategories } from "@/lib/firebase/categories"

export default async function CategorySection() {
  const categories = await getCategories()

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/products?category=${category.id}`}
          className="group relative aspect-square overflow-hidden rounded-lg bg-muted"
        >
          <div className="absolute inset-0 z-10 bg-black/40 transition-colors group-hover:bg-black/50" />
          <img
            src={category.imageUrl || "/placeholder.svg?height=200&width=200"}
            alt={category.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <h3 className="text-lg font-medium text-white">{category.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  )
}
