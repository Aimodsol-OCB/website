// src/components/public/HeroDial.tsx
export default function HeroDial() {
    const ticks = Array.from({ length: 24 }, (_, i) => i * 15);
    const nodes = [0, 90, 180, 270];
    return (
      <svg viewBox="0 0 480 480" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="dialGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E8A33D" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#E8A33D" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="240" cy="240" r="150" fill="url(#dialGlow)" className="bp-pulse" />
        <circle cx="240" cy="240" r="205" stroke="#5B87B5" strokeWidth="1" opacity="0.3" fill="none" />
        <g className="bp-spin-slow">
          {ticks.map((deg) => (
            <line key={deg} x1="240" y1="30" x2="240" y2="42" stroke="#8FB8E0" strokeWidth="1.4" transform={`rotate(${deg} 240 240)`} opacity={deg % 90 === 0 ? 1 : 0.4} />
          ))}
          {nodes.map((deg) => (
            <circle key={deg} r="4" fill="#E8A33D" transform={`rotate(${deg} 240 240) translate(240 80)`} />
          ))}
        </g>
        <circle cx="240" cy="240" r="160" stroke="#4FB0A5" strokeWidth="1.3" fill="none" className="bp-draw" />
        <circle cx="240" cy="240" r="115" stroke="#5B87B5" strokeWidth="1.3" fill="#0A141F" className="bp-draw" />
        <g transform="translate(240 240)">
          <circle r="3" fill="#E8A33D" />
          <path d="M0 -3 L-28 60" stroke="#EDEFF2" strokeWidth="2" strokeLinecap="round" />
          <path d="M0 -3 L28 60" stroke="#EDEFF2" strokeWidth="2" strokeLinecap="round" />
          <circle cx="-28" cy="60" r="2.5" fill="#E8A33D" />
          <circle cx="28" cy="60" r="2.5" fill="#8FB8E0" />
        </g>
        <text x="240" y="455" textAnchor="middle" fill="#5B87B5" fontSize="10" fontFamily="var(--font-mono)" opacity="0.6">DIGIFLOW — SYSTEM DIAL — REV. 01</text>
      </svg>
    );
  }