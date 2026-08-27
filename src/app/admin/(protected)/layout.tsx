// src/app/admin/(protected)/layout.tsx
import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/firebase/session";
import LogoutButton from "@/components/admin/LogoutButton";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-[#0E1B2E] text-[#EDEFF2]">
        <nav className="border-b border-[#5B87B5]/20 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
            <span className="font-[family-name:var(--font-display)] font-semibold">Digiflow Admin</span>
            <div className="flex gap-5 text-sm text-[#A9B7C9]">
            <a href="/admin/services" className="hover:text-[#EDEFF2]">Services</a>
            <a href="/admin/portfolio" className="hover:text-[#EDEFF2]">Portfolio</a>
            <a href="/admin/team" className="hover:text-[#EDEFF2]">Team</a>
            <a href="/admin/leads" className="hover:text-[#EDEFF2]">Leads</a>
            </div>
        </div>
        <LogoutButton />
        </nav>
      <main className="p-6">{children}</main>
    </div>
  );
}