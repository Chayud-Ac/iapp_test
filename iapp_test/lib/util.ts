// กำหนด showToast ไว้ notify action ต่างๆใน util
// เราใช้ function นี้กับ หลาย page หรือ component เลยกำหนดใน util function
type ToastType = "success" | "error";

export function showToast(type: ToastType, message: string): void {
  const toast = document.getElementById("toast");

  if (!toast) {
    console.error("Toast element not found");
    return;
  }

  toast.className = `toast ${type} show`;
  toast.innerText = message;

  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}
