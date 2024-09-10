"use client";

import React, { useState } from "react";
import styles from "../../styles/auth.module.css";
import Link from "next/link";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { showToast } from "@/lib/util";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // react hook จาก firebase library เพื่อใช้ login
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  // function นี้จะทำการติดต่อกับ firebase เพื่อ sign-in และ authorized โดย firebase โดยใช้ email state กับ password state
  const handleSignIn = async (e: any) => {
    e.preventDefault();

    // validate check ถ้าไม่มี email หรือ password
    if (!email || !password) {
      showToast("error", "Email or password are missing");
      return null;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(email, password);
      if (userCredential && userCredential.user) {
        console.log("User signed in successfully:", userCredential.user);
        // ถ้า authorize ผ่านก็ clear state redirect กลับไปหน้า home กับ showToast ว่า sign-in ผ่าน
        showToast("success", "User signed in successfully!");
        setEmail("");
        setPassword("");
        router.push("/");
      } else {
        // ถ้า authorize ไม่ผ่านก็ showToast ว่า sign-in ไม่ผ่าน
        showToast("error", "Invalid email or password");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      showToast("error", "Invalid email or password");
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBox}>
        <h2 className={styles.heading}>Log in</h2>
        <form onSubmit={handleSignIn}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={styles.inputField}
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={styles.inputField}
            required
          />
          <button
            type="submit"
            className={styles.loginButton}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className={styles.textParagraph}>
          or,{" "}
          <Link className={styles.aLink} href="/sign-up">
            sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
