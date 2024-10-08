﻿# iapp test

**Description**:  
เป็น simple web application เพื่อจัดการตะกร้าสินค้า โดยเราสามารถเพิ่ม ลบ หรือเปลี่ยนจำนวนสินค้าภายในตะกร้าได้ และก็เชื่อมระบบ authentication กับ firebase authentication

## Key Features

- **User Authentication**: ใช้ firebase ในการทำ authentication sign-in/sign-up
- **การเพิ่มสินค้า:**: user สามารถเพิ่ม สินค้าเข้า cart ได้ และดูข้อมูลสินค้าผ่าน CartPopUP
- **การจัดการจำนวนสินค้าผ่าน Input Field:**: ในแต่ละรายการสินค้า ผู้ใช้สามารถเปลี่ยนจำนวนสินค้าผ่านการกรอกใน Input Field (กด enter เพื่อยืนยันหรือว่า click นอกกรอบ ถ้า input เป็น 0 จะมีหน้าต่าง ยืนยันการลบสินค้าขึ้นมา)
- **การยืนยันการลบสินค้า**: ในแต่ละรายการสินค้า user สามารถ ลบสินค้าได้

## Setup and Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Chayud-Ac/iapp_test.git
   ```
2. cd modern-stackoverflow
   ```bash
    cd iapp_test
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. สร้าง .env.local ใน project root directory iapp_test/.env.local กำหนด key ตาม config ใน firebase authentication และ ตัว PRODUCT_SERVER
   ```bash
   NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
   NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
   NEXT_PUBLIC_PRODUCT_SERVER=https://fakestoreapi.com
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## โครงสร้างไฟล์หลัก

- **components/**: ใช้ เก็บ component ที่ใช้ project นี้
- **context/**: ไฟล์นี้ใช้สำหรับเก็บและจัดการสถานะของสินค้าที่อยู่ในตะกร้า โดยใช้ Context API. ใช้เป็น wrapper เพื่อให้ page กับ component อื่นๆ เข้าถึงตัว state ของ cart ได้
- **firebase/config.ts**: การตั้งค่า พวก Firebase config สำหรับเชื่อมต่อกับโปรเจคของ Firebase.
