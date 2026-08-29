// src/components/public/TeamIllustration.tsx
export default function TeamIllustration() {
    const nodes = [
      { x: 240, y: 60 }, { x: 100, y: 140 }, { x: 380, y: 140 },
      { x: 60, y: 260 }, { x: 240, y: 220 }, { x: 420, y: 260 },
      { x: 150, y: 340 }, { x: 330, y: 340 },
    ];
    const edges = [[0,1],[0,2],[1,3],[1,4],[2,4],[2,5],[4,6],[4,7],[3,6],[5,7]];
    return (
      <svg viewBox="0 0 480 400" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g className="bp-draw" opacity="0.6">
          {edges.map(([a, b], i) => (
            <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="#5B87B5" strokeWidth="1.1" />
          ))}
        </g>
        {nodes.map((n, i) => (
          <g key={i} className="bp-draw">
            <circle cx={n.x} cy={n.y} r={i === 4 ? 20 : 15} stroke={i === 4 ? "#E8A33D" : "#8FB8E0"} strokeWidth="1.5" fill="#0A141F" />
            <circle cx={n.x} cy={n.y - (i === 4 ? 4 : 3)} r={i === 4 ? 5 : 3.8} stroke={i === 4 ? "#E8A33D" : "#8FB8E0"} strokeWidth="1.2" />
            <path d={`M${n.x - (i===4?9:7)} ${n.y + (i===4?13:10)} a${i===4?9:7} ${i===4?7:5} 0 01${i===4?18:14} 0`} stroke={i === 4 ? "#E8A33D" : "#8FB8E0"} strokeWidth="1.2" />
          </g>
        ))}
        <text x="20" y="385" fill="#5B87B5" fontSize="10" fontFamily="var(--font-mono)" opacity="0.6">DIGIFLOW — TEAM NETWORK — REV. 01</text>
      </svg>
    );
  }