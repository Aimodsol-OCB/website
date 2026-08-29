// src/components/public/ProcessSection.tsx
"use client";
import { useState } from "react";

const steps = [
  { num: "01", title: "Discovery Phase", body: "Understand the problem, constraints, and goals before any design work starts." },
  { num: "02", title: "Architecture", body: "System design and data modeling — the blueprint before the build." },
  { num: "03", title: "Build", body: "Senior engineers implement, layer by layer, with regular checkpoints." },
  { num: "04", title: "Deploy", body: "Tested, documented, and shipped to production." },
  { num: "05", title: "Maintain", body: "Ongoing hosting, backups, and support tiers." },
];

export default function ProcessSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="max-w-6xl mx-auto px-6 py-24 border-t border-[#5B87B5]/20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[#4FB0A5] mb-3">HOW WE WORK</p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold mb-10">Our approach.</h2>
          <div className="divide-y divide-[#5B87B5]/20">
            {steps.map((step, idx) => {
              const isActive = active === idx;
              return (
                <div key={step.num}>
                  <button onClick={() => setActive(idx)} className="w-full flex justify-between items-center py-4 text-left">
                    <span className={`font-[family-name:var(--font-display)] font-medium ${isActive ? "text-[#EDEFF2]" : "text-[#A9B7C9]"}`}>
                      {step.num}. {step.title}
                    </span>
                    <span className="font-[family-name:var(--font-mono)] text-[#E8A33D] text-lg">{isActive ? "−" : "+"}</span>
                  </button>
                  {isActive && <div className="bg-[#5B87B5]/10 rounded-sm px-4 py-4 mb-4 text-sm text-[#A9B7C9]">{step.body}</div>}
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative h-[220px] flex items-center justify-center">
          {steps.map((step, idx) => {
            const level = steps.length - 1 - idx;
            const width = 90 + level * 70;
            const height = 45 + level * 35;
            const isActive = active === idx;
            return (
              <div
                key={step.num}
                onClick={() => setActive(idx)}
                className="absolute left-1/2 flex items-start justify-center pt-2.5 cursor-pointer transition-colors"
                style={{
                  width, height, bottom: 20, transform: "translateX(-50%)",
                  borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
                  border: `1.5px solid ${isActive ? "#E8A33D" : "rgba(91,135,181,0.35)"}`,
                  backgroundColor: isActive ? "#E8A33D" : "transparent",
                  zIndex: steps.length - idx,
                }}
              >
                <span className={`font-[family-name:var(--font-display)] text-xs md:text-sm font-medium whitespace-nowrap ${isActive ? "text-[#0E1B2E]" : "text-[#A9B7C9]"}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}