import Navbar from "@/components/Navbar/Navbar";
import styles from "../styles/layout.module.css";
import { CartProvider } from "@/context/CartProvider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    // คลุม CartContext Navbar ต้องใช้ โชว์ cartIcon ,
    <CartProvider>
      <div className={styles.layoutWrapper}>
        <Navbar />
        <main className={styles.mainContent}>{children}</main>{" "}
      </div>
    </CartProvider>
  );
};

export default Layout;
