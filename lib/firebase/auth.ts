import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile as firebaseUpdateProfile,
  updatePassword as firebaseUpdatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth"
import { auth } from "./config"
import { doc, setDoc } from "firebase/firestore"
import { db } from "./config"

export const signUp = async (email: string, password: string, name: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  const user = userCredential.user

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

  return user
}

export const signIn = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  return userCredential.user
}

export const signOut = async () => {
  await firebaseSignOut(auth)
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
