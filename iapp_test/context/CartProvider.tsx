"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useEffect,
} from "react";

// พวก props หรือ key พวกนี้จะใช้ไป display ตรง cart component เวลา user เปลี่ยน quantity
// จากหน้า UI ตัวอย่าง ก็มี image ,title , price ,
interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  totalCartPrice: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  changeCartItemQuantity: (id: number, quantity: number) => void;
}

// สร้างตัว CartContext โดยกำหนด ตัว type เป็นที่เรากำหนดด้านบน
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // initial state ของ cart เป็น empty array มันจะ เก็บ เป็น array of product object ตาม type ที่เรากำหนดด้านบน
  const [cart, setCart] = useState<CartItem[]>([]);

  // คำนวน totalCartPrice แค่ตอนที่มีการเปลี่ยนแปลงของ ตัว cart state array
  const totalCartPrice = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  //   functionที่ ใช้ สำหรับ การ additem เข้าที่ cart
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      // หาว่า item ที่ input เข้ามา อยู่ ใน cart state array แล้วรึยัง ถ้าอยู่ existingItem ก็เป็น true
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      // ถ้า true ก็ เพิ่ม แค่ quantity
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id // หาตัว product โดย id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity } // spread operator ก็ copy ค่า key อันเก่า มา แต่ เปลี่ยนตัว quantity +1
            : cartItem
        );
      }

      // ถ้า item ยังไม่อยู่ ก็ เพิ่ม เพิ่ม item object เข้าไปใน array
      return [...prevCart, item];
    });
  };

  const changeCartItemQuantity = (itemId: number, quantity: number) => {
    setCart((prevCart) => {
      // หาว่า item ที่ input เข้ามา อยู่ ใน cart state array แล้วรึยัง ถ้าอยู่ existingItem ก็เป็น true
      const existingItem = prevCart.find((cartItem) => cartItem.id === itemId);

      // ถ้า true ก็ เปลี่ยน quantity ตามที่ user input เข้ามา
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: quantity }
            : cartItem
        );
      }

      // itemId ที่ input เข้ามาไม่มีก็ return prevCart โดยไม่ทำอะไร
      return prevCart;
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // เก็บ cart ใน local storage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        totalCartPrice,
        addToCart,
        removeFromCart,
        changeCartItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  // ถ้าตัว การเรียกใช้ context ไม่ได้อยู่ใน component ที่ถูกคลุมก็จะเตือน
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
