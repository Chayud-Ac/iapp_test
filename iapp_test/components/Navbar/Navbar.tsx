"use client";
import React, { useEffect, useState } from "react";
import { FaCheck, FaUser } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useCart } from "@/context/CartProvider";
import CartPopUp from "../CartPopUp/CartPopUp";
import { showToast } from "@/lib/util";

const Navbar = () => {
  const [user, loading] = useAuthState(auth); // ดึง user มาจาก session ถ้ามี ก็ แสดงว่า sign-in แล้ว ถ้าไม่มีก็ ยังไม่ได้ sign-in จะใช้เป็น logic ในการ style ตัว UI
  const [isDropdownOpen, setDropdownOpen] = useState(false); // show ตัว user information ถ้า true
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, setCart } = useCart();

  console.log(cart);

  const handleLogout = () => {
    auth.signOut();
    // clear ข้อมูล state ตอน user logout
    localStorage.removeItem("cart");
    setCart([]);
  };

  // handle action click เปลี่ยน isDropdownOpen เป็น ค่าตรงข้าม
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navContent}>
          <div className={styles.logo}>
            <Link href="/">IappTest</Link>
          </div>
          <div className={styles.userMenu}>
            {/* โชว์ cart ทั้ง user ที่ sign-in และ ไม่ sign-in */}
            {/* loading apply ทั้งสอง block เพื่อให้ชัวว่า มัน render พร้อมกัน และแก้ bug ตัว hydraton error (sever ui กับ client ui ไม่เหมือนกัน) */}
            {cart.length > 0 && !loading && (
              <div className={styles.cartContainer} onClick={toggleCart}>
                <CiShoppingCart size={26} color="white" />
                {cart.length > 0 && (
                  <span className={styles.cartCount}>{cart.length}</span>
                )}
              </div>
            )}

            {user && !loading ? (
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
      {isCartOpen && <CartPopUp onClose={() => setIsCartOpen(false)} />}
    </>
  );
};

export default Navbar;
