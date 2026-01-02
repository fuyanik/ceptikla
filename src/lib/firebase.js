// Client-side Firebase Configuration
import { initializeApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";

// Initialize Firebase (only once)
let app;
let analytics = null;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  
  // Initialize Analytics (only in browser and if supported)
  if (typeof window !== "undefined") {
    isSupported().then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
        console.log("🏍️ Firebase Analytics aktif! - Otomotiv Sepeti");
      }
    });
  }
} else {
  app = getApps()[0];
}

// Initialize Firebase Storage
export const storage = getStorage(app);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Export analytics
export { analytics };

export default app;
