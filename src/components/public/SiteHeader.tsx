// src/components/public/SiteHeader.tsx
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="border-b border-[#5B87B5]/20">
      <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
        <Link href="/" className="font-[family-name:var(--font-display)] font-semibold text-lg tracking-tight">DIGIFLOW</Link>
        <nav className="flex gap-6 text-sm text-[#A9B7C9]">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[#EDEFF2] transition">{link.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}