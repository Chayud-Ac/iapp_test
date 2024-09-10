import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// เซ็ทอัปตัว config สำหรับ firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
// เช็คว่า Firebase มีรึยัง ถ้าไม่มีแอป Firebase เริ่มอยู่ จะใช้ initializeApp(firebaseConfig) เพื่อเริ่มต้นแอปใหม่ แต่ถ้ามีแอปอยู่แล้วจะใช้ getApp() เพื่อดึงแอปที่มีอยู่แทน
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);

export { app, auth };
