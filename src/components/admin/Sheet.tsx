// src/components/admin/Sheet.tsx
"use client";
import { ReactNode, useEffect } from "react";

export default function Sheet({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <>
      <div className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={onClose} />
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#0E1B2E] border-l border-[#5B87B5]/25 z-50 transform transition-transform duration-300 overflow-y-auto ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-between items-center px-6 py-5 border-b border-[#5B87B5]/20">
          <h2 className="font-[family-name:var(--font-display)] font-semibold text-lg">{title}</h2>
          <button onClick={onClose} className="text-[#A9B7C9] hover:text-[#EDEFF2] text-xl leading-none">&times;</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </>
  );
}