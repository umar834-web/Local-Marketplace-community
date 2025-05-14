import { collection, addDoc, getDocs } from "firebase/firestore"
import { db } from "./config"
import type { Category } from "../types"

export const categoriesCollection = collection(db, "categories")

export async function getCategories(): Promise<Category[]> {
  const snapshot = await getDocs(categoriesCollection)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Category[]
}

export async function addCategory(category: Omit<Category, "id">) {
  return await addDoc(categoriesCollection, category)
}
