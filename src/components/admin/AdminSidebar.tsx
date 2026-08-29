// src/components/admin/AdminSidebar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/portfolio", label: "Portfolio" },
  { href: "/admin/team", label: "Team" },
  { href: "/admin/leads", label: "Leads" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-60 shrink-0 border-r border-[#5B87B5]/20 min-h-screen flex flex-col justify-between">
      <div>
        <div className="px-6 py-5 border-b border-[#5B87B5]/20">
          <span className="font-[family-name:var(--font-display)] font-semibold">DIGIFLOW</span>
          <p className="font-[family-name:var(--font-mono)] text-[10px] text-[#4FB0A5] tracking-[0.2em] mt-1">ADMIN PANEL</p>
        </div>
        <nav className="py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}
                className={`block px-6 py-3 text-sm border-l-2 transition ${
                  isActive ? "border-[#E8A33D] text-[#EDEFF2] bg-[#5B87B5]/10" : "border-transparent text-[#A9B7C9] hover:text-[#EDEFF2] hover:border-[#5B87B5]/40"
                }`}>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="px-6 py-5 border-t border-[#5B87B5]/20">
        <LogoutButton />
      </div>
    </aside>
  );
}