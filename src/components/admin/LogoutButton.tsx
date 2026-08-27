// src/components/admin/LogoutButton.tsx
"use client";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/client";

export default function LogoutButton() {
  const router = useRouter();
  async function handleLogout() {
    await signOut(auth);
    await fetch("/api/auth/session", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }
  return <button onClick={handleLogout} className="text-sm text-[#A9B7C9] hover:text-[#EDEFF2] transition">Log out</button>;
}