// src/app/admin/(protected)/layout.tsx
import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/firebase/session";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-[#0E1B2E] text-[#EDEFF2] flex">
      <AdminSidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}