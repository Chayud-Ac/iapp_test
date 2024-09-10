"use client";
import React, { useState } from "react";
import styles from "./ProductCard.module.css";
import Image from "next/image";
import { useCart } from "@/context/CartProvider";
import { showToast } from "@/lib/util";

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
}

const ProductCard = ({ id, title, price, image }: ProductCardProps) => {
  // !!TODO เพิ่ม AddToCart function ซึ่งคิดว่าน่าจะใช้ Redux Toolkit ในการเก็บ state ของ cart หรือ ใช้ context คลุม component แล้วกำหนด state ในนั้น

  const { addToCart } = useCart();

  const handleAddToCartButton = () => {
    const quantity = 1;
    addToCart({ id, title, price, image, quantity });
    showToast("success", `Add ${title} to cart`);
  };

  return (
    <div className={styles.card}>
      <Image
        src={image}
        alt={title}
        className={styles.productImage}
        width={250}
        height={250}
      />
      <div className={styles.cardContent}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.price}>${price}</span>
      </div>
      <button className={styles.button} onClick={() => handleAddToCartButton()}>
        AddToCard
      </button>
    </div>
  );
};

export default ProductCard;
