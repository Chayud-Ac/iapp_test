"use client";
import React, { useState } from "react";
import { FaCheck, FaUser } from "react-icons/fa";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";

const Navbar = () => {
  const [user] = useAuthState(auth); // ดึง user มาจาก session ถ้ามี ก็ แสดงว่า sign-in แล้ว ถ้าไม่มีก็ ยังไม่ได้ sign-in จะใช้เป็น logic ในการ style ตัว UI
  const [isDropdownOpen, setDropdownOpen] = useState(false); // show ตัว user information ถ้า true

  const handleLogout = () => {
    auth.signOut();
  };

  // handle action click เปลี่ยน isDropdownOpen เป็น ค่าตรงข้าม
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <div className={styles.logo}>
          <Link href="/">IappTest</Link>
        </div>
        <div className={styles.userMenu}>
          {user ? (
            <>
              <FaCheck size={12} color="white" />
              <div className={styles.dropdown}>
                <button className={styles.userIcon} onClick={toggleDropdown}>
                  <FaUser size={24} />
                </button>
                {isDropdownOpen && (
                  <div className={styles.dropdownContent}>
                    <p>Logged in as {user.email}</p>
                    <button
                      className={styles.logoutButton}
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className={styles.authLinks}>
              <Link href="/sign-up">Sign-Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
