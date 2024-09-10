"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "../../styles/auth.module.css";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { showToast } from "@/lib/util";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // react hook จาก firebase library เพื่อใช้ สร้างหรือ สมัคร user
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  // function นี้จะทำการติดต่อกับ firebase เพื่อ sign-up ใน firebase โดยใช้ email state กับ password state
  const handleSignUp = async (e: any) => {
    e.preventDefault();
    if (!email || !password) {
      console.log("email or password are missing");
      return null;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        email,
        password
      );

      if (userCredential && userCredential.user) {
        // ถ้า sign-up ผ่าน (มี object userCredential return กลับมา) ก็ clear state redirect ไปหน้า sign-in กับ showToast ว่า sign-up ผ่าน
        showToast("success", "User signed up successfully!");
        setEmail("");
        setPassword("");
        router.push("/sign-in");
      } else {
        console.error("Sign-up failed: No user data returned.");
        showToast("error", "Sign-up failed. Please try again.");
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      showToast("error", "Error occurred during sign-up. Please try again.");
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBox}>
        <h2 className={styles.heading}>Sign-up</h2>
        <form onSubmit={handleSignUp}>
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
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>

        <p className={styles.textParagraph}>
          or,{" "}
          <Link className={styles.aLink} href="/sign-in">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
