// src/components/public/ProjectPlaceholder.tsx
export default function ProjectPlaceholder({ index }: { index?: number }) {
    return (
      <div className="relative w-full aspect-video bg-[#0A141F] bp-grid-faint border-b border-[#5B87B5]/25 flex items-center justify-center">
        <svg width="24%" viewBox="0 0 24 16" fill="none">
          <rect x="1" y="1" width="22" height="14" rx="1" stroke="#8FB8E0" strokeWidth="1.2" />
          <line x1="1" y1="4.5" x2="23" y2="4.5" stroke="#8FB8E0" strokeWidth="1" />
          <circle cx="3" cy="2.7" r="0.5" fill="#8FB8E0" />
        </svg>
        {index !== undefined && (
          <span className="absolute top-2 right-2 font-[family-name:var(--font-display)] text-2xl font-bold text-[#5B87B5]/30 select-none">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>
    );
  }