import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile as firebaseUpdateProfile,
  updatePassword as firebaseUpdatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  onAuthStateChanged,
  type User
} from "firebase/auth"
import { auth } from "./config"
import { doc, setDoc } from "firebase/firestore"
import { db } from "./config"

export async function signUp(email: string, password: string, name: string) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    const user = result.user

    // Update profile with display name
    await firebaseUpdateProfile(user, {
      displayName: name,
    })

    // Create user document in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      createdAt: new Date(),
    })

    return { user, error: null }
  } catch (error) {
    return { user: null, error: error as Error }
  }
}

export async function signIn(email: string, password: string) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password)
    return { user: result.user, error: null }
  } catch (error) {
    return { user: null, error: error as Error }
  }
}

export async function signOut() {
  try {
    await firebaseSignOut(auth)
    return { error: null }
  } catch (error) {
    return { error: error as Error }
  }
}

export const updateProfile = async (name: string) => {
  const user = auth.currentUser

  if (!user) {
    throw new Error("No user is signed in")
  }

  await firebaseUpdateProfile(user, {
    displayName: name,
  })

  // Update user document in Firestore
  await setDoc(
    doc(db, "users", user.uid),
    {
      name,
    },
    { merge: true },
  )
}

export const updatePassword = async (currentPassword: string, newPassword: string) => {
  const user = auth.currentUser

  if (!user || !user.email) {
    throw new Error("No user is signed in")
  }

  // Re-authenticate user before changing password
  const credential = EmailAuthProvider.credential(user.email, currentPassword)
  await reauthenticateWithCredential(user, credential)

  // Update password
  await firebaseUpdatePassword(user, newPassword)
}

export function onAuthStateChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback)
}
