import { useState } from "react";
import { useCart } from "@/context/CartProvider";
import styles from "./CartPopUp.module.css";
import { TbXboxXFilled } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase/config";

interface CartPopUpProps {
  onClose: () => void;
}

const CartPopUp: React.FC<CartPopUpProps> = ({ onClose }) => {
  const router = useRouter();
  const { cart, totalCartPrice, removeFromCart, changeCartItemQuantity } =
    useCart();

  // state เก็บค่า itemId ที่ user ต้องการ จะ remove
  const [confirmingItemId, setConfirmingItemId] = useState<number | null>(null);

  // set itemId เป็น item นั้นๆ ถ้า user กด remove
  const handleConfirmRemove = (id: number) => {
    setConfirmingItemId(id);
  };

  // ถ้า user กด confirm ก็ call removeFromCart
  const confirmRemoveItem = () => {
    if (confirmingItemId !== null) {
      removeFromCart(confirmingItemId);
      setConfirmingItemId(null);
    }
  };

  // ถ้า user กด cancel ก็ set กลับเป็น null
  const cancelRemoveItem = () => {
    setConfirmingItemId(null);
  };

  const handleItemQuantity = (e: any, id: number) => {
    const inputValue = Number(e.target.value);
    console.log(inputValue);

    if (inputValue === 0) {
      handleConfirmRemove(id);
    } else {
      const finalValue = Math.max(inputValue, 1);
      changeCartItemQuantity(id, finalValue);
    }
  };

  // check ว่า user sign-in รึป่าว
  const handleCheckoutButton = () => {
    const user = auth.currentUser;
    console.log(user);
    // redirect ไปหน้า address ถ้า sign-in แล้ว ถ้ายังก็ sign-in
    if (user) {
      router.push("/address");
      onClose();
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <div className={styles.cartPopupOverlay}>
      <div className={styles.cartPopup}>
        <div className={styles.cartTop}>
          <h2>Your Cart</h2>
          <TbXboxXFilled onClick={onClose} size={24} color="black" />
        </div>
        <div className={styles.cartItemsList}>
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.cartImageTitle}>
                  <img
                    src={item.image}
                    alt={item.title}
                    width={50}
                    height={50}
                  />
                  <span className={styles.itemName}>{item.title}</span>
                </div>
                <div className={styles.cartItemQuantity}>
                  <span>${item.price.toFixed(2)}</span>
                  <input
                    className={styles.cartItemQuantityInput}
                    defaultValue={item.quantity}
                    type="number"
                    min="1"
                    onBlur={(e) => {
                      handleItemQuantity(e, item.id);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleItemQuantity(e, item.id);
                      }
                    }}
                  />
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                  <TbXboxXFilled
                    size={20}
                    color="red"
                    onClick={() => handleConfirmRemove(item.id)}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
        <div className={styles.cartbottom}>
          <h3>Total: ${totalCartPrice.toFixed(2)}</h3>
          <button
            className={styles.checkoutButton}
            onClick={handleCheckoutButton}
          >
            Checkout
          </button>
        </div>
      </div>

      {/* Confirmation Popup */}
      {confirmingItemId !== null && (
        <div className={styles.confirmOverlay}>
          <div className={styles.confirmModal}>
            <p>Are you sure you want to remove this item?</p>
            <div>
              <button className={styles.confirmBtn} onClick={confirmRemoveItem}>
                remove
              </button>
              <button className={styles.cancelBtn} onClick={cancelRemoveItem}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPopUp;
