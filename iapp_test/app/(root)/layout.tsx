import Navbar from "@/components/Navbar/Navbar";
import styles from "../styles/layout.module.css"; // Import the CSS module

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.layoutWrapper}>
      {" "}
      {/* Apply the layout wrapper class */}
      <Navbar />
      <main className={styles.mainContent}>{children}</main>{" "}
      {/* Separate main content */}
    </div>
  );
};

export default Layout;
