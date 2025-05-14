import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
} from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from "./config"
import type { Product } from "../types"

export const getProducts = async (limitCount?: number) => {
  try {
    let productsQuery = query(collection(db, "products"), orderBy("createdAt", "desc"))

    if (limitCount) {
      productsQuery = query(productsQuery, limit(limitCount))
    }

    const querySnapshot = await getDocs(productsQuery)

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
    })) as Product[]
  } catch (error) {
    console.error("Error getting products:", error)
    return []
  }
}

export const getProductById = async (id: string) => {
  try {
    const docRef = doc(db, "products", id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate(),
      } as Product
    } else {
      return null
    }
  } catch (error) {
    console.error("Error getting product:", error)
    return null
  }
}

export const getRelatedProducts = async (category: string, currentProductId: string, limitCount = 4) => {
  try {
    const productsQuery = query(
      collection(db, "products"),
      where("category", "==", category),
      where("id", "!=", currentProductId),
      limit(limitCount),
    )

    const querySnapshot = await getDocs(productsQuery)

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
    })) as Product[]
  } catch (error) {
    console.error("Error getting related products:", error)
    return []
  }
}

interface CreateProductParams {
  name: string
  description: string
  price: number
  category: string
  location: string
  deliveryRadius: number
  image: File | null
  sellerId: string
  sellerName: string
}

export const createProduct = async ({
  name,
  description,
  price,
  category,
  location,
  deliveryRadius,
  image,
  sellerId,
  sellerName,
}: CreateProductParams) => {
  try {
    let imageUrl = ""

    // Upload image if provided
    if (image) {
      const storageRef = ref(storage, `products/${Date.now()}_${image.name}`)
      const uploadResult = await uploadBytes(storageRef, image)
      imageUrl = await getDownloadURL(uploadResult.ref)
    }

    // Add product to Firestore
    const productData = {
      name,
      description,
      price,
      category,
      location,
      deliveryRadius,
      imageUrl,
      estimatedDelivery: "1-3 days",
      seller: {
        id: sellerId,
        name: sellerName,
      },
      createdAt: serverTimestamp(),
    }

    const docRef = await addDoc(collection(db, "products"), productData)

    return {
      id: docRef.id,
      ...productData,
    }
  } catch (error) {
    console.error("Error creating product:", error)
    throw error
  }
}
