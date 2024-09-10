import React from "react";
import ProductCard from "@/components/ProductCard/ProductCard"; // Make sure the path is correct
import styles from "./ProductGrids.module.css"; // Import the CSS module

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductGridsProps {
  products: Product[];
}

const ProductGrids = ({ products }: ProductGridsProps) => {
  return (
    <div className={styles.gridContainer}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          image={product.image}
        />
      ))}
    </div>
  );
};

export default ProductGrids;
