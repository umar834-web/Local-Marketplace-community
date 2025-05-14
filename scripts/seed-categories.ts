import { addCategory } from "../lib/firebase/categories"

const categories = [
  {
    name: "Electronics",
    description: "Latest gadgets and electronic devices",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    name: "Fashion",
    description: "Trendy clothing and accessories",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    name: "Home & Garden",
    description: "Everything for your home and garden",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    name: "Sports & Outdoors",
    description: "Sports equipment and outdoor gear",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    name: "Books & Media",
    description: "Books, movies, and entertainment",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }
]

async function seedCategories() {
  try {
    for (const category of categories) {
      await addCategory(category)
      console.log(`Added category: ${category.name}`)
    }
    console.log("Categories seeded successfully!")
  } catch (error) {
    console.error("Error seeding categories:", error)
  }
}

seedCategories() 