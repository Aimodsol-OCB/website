// src/components/public/CornerMark.tsx
export default function CornerMark({ position = "top-left", color = "#5B87B5" }: { position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"; color?: string }) {
    const rotation = { "top-left": 0, "top-right": 90, "bottom-right": 180, "bottom-left": 270 }[position];
    const posClass = { "top-left": "top-0 left-0", "top-right": "top-0 right-0", "bottom-right": "bottom-0 right-0", "bottom-left": "bottom-0 left-0" }[position];
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" className={`absolute ${posClass} pointer-events-none`} style={{ transform: `rotate(${rotation}deg)` }}>
        <path d="M0 5 V0 H5" stroke={color} strokeWidth="1" fill="none" opacity="0.7" />
      </svg>
    );
  }