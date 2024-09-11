"use client";
import React from "react";
import { useForm } from "react-hook-form";
import styles from "../../styles/address.module.css";
import { useRouter } from "next/navigation";
import { showToast } from "@/lib/util";
import { useCart } from "@/context/CartProvider";

// กำหนด type ของ ตัว form
type FormData = {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
};

const Page = () => {
  // เรียกใช้ useForm ด้วย type ของ FormData
  const { register, handleSubmit } = useForm<FormData>();
  const router = useRouter();
  const { setCart } = useCart();

  const onSubmit = (formData: FormData) => {
    console.log(formData);
    // set cart state ใน context กลับไปเป็น empty array กับ remove cart ใน local state
    setCart([]);
    localStorage.removeItem("cart");
    router.push("/");
    showToast("success", "Order has been saved !");
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <label htmlFor="name" className={styles.labelField}>
        Name *
      </label>
      <input
        id="name"
        {...register("name", { required: true })}
        className={styles.inputField}
      />

      <label htmlFor="street" className={styles.labelField}>
        Street *
      </label>
      <input
        id="street"
        {...register("street", { required: true })}
        className={styles.inputField}
      />

      <label htmlFor="city" className={styles.labelField}>
        City *
      </label>
      <input
        id="city"
        {...register("city", { required: true })}
        className={styles.inputField}
      />

      <label htmlFor="state" className={styles.labelField}>
        State *
      </label>
      <select
        id="state"
        {...register("state", { required: true })}
        className={styles.inputField}
      >
        <option value="">Select state</option>
        <option value="NY">New York</option>
        <option value="CA">California</option>
      </select>

      <label htmlFor="zip" className={styles.labelField}>
        Zip code *
      </label>
      <input
        id="zip"
        {...register("zip", { required: true })}
        className={styles.inputField}
      />

      <label htmlFor="country" className={styles.labelField}>
        Country *
      </label>
      <select
        id="country"
        {...register("country", { required: true })}
        className={styles.inputField}
      >
        <option value="United States">United States</option>
      </select>

      <label htmlFor="phone" className={styles.labelField}>
        Phone
      </label>
      <input id="phone" {...register("phone")} className={styles.inputField} />

      <div className={styles.buttonContainer}>
        <button className={styles.saveButton}>Save</button>
        <button className={styles.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Page;
