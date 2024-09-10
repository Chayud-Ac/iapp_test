import React from "react";
import styles from "../../styles/layout.module.css";
import "../../globals.css";

import ProductGrids from "@/components/ProductGrids/ProductGrids";

// fetch จากฝั่งของ server แล้ว pass ตัว data เข้าตัว ProductGrids
// ProductGrids map แล้วโชว์ตัว ProductCard component
// ProductCard Component จะ เป็น client component ที่ มีการ interact กับ user เวลา user click add to card
const fetchProduct = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCT_SERVER}/products`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("cannot fetch the product");
    }
  } catch (error) {
    throw error;
  }
};

const page = async () => {
  const products = await fetchProduct();
  return (
    <div className={styles.childContainer}>
      <h1 className="heading">Product</h1>
      <ProductGrids products={products} />
    </div>
  );
};

export default page;
