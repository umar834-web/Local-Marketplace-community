import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyAaAJbmjQHF43x5rlcgkw2tM1fzVhg464o",
  authDomain: "local-marketplace-community.firebaseapp.com",
  projectId: "local-marketplace-community",
  storageBucket: "local-marketplace-community.firebasestorage.app",
  messagingSenderId: "357298537839",
  appId: "1:357298537839:web:bb6a892a314a6a4d30549a",
  measurementId: "G-JL04J6KZB0",
}

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

// Enable offline persistence
if (typeof window !== "undefined") {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.')
    } else if (err.code === 'unimplemented') {
      console.warn('The current browser does not support persistence.')
    }
  })
}

// Initialize Storage
const storage = getStorage(app)

// Initialize Analytics (only in browser environment)
let analytics = null
if (typeof window !== "undefined") {
  analytics = getAnalytics(app)
}

export { app, auth, db, storage, analytics }
