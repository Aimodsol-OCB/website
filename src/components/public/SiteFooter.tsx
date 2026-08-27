// src/components/public/SiteFooter.tsx
export default function SiteFooter() {
    return (
      <footer className="border-t border-[#5B87B5]/20 mt-12">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-4 text-sm text-[#A9B7C9]">
          <p className="font-[family-name:var(--font-mono)] text-xs">DIGIFLOW © {new Date().getFullYear()} — Islamabad, Pakistan</p>
          <p>Built layer by layer.</p>
        </div>
      </footer>
    );
  }