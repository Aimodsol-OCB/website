// src/components/public/PersonPlaceholder.tsx
export default function PersonPlaceholder({ name }: { name: string }) {
    const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
    return (
      <div className="relative w-full aspect-square bg-[#0A141F] bp-grid-faint border-b border-[#5B87B5]/25 flex items-center justify-center">
        <svg width="42%" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" stroke="#8FB8E0" strokeWidth="1.3" />
          <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#8FB8E0" strokeWidth="1.3" />
        </svg>
        <span className="absolute bottom-2 right-2 font-[family-name:var(--font-mono)] text-[10px] text-[#E8A33D]">{initials}</span>
      </div>
    );
  }