// src/components/public/FaqAccordion.tsx
"use client";
import { useState } from "react";

const faqs = [
  { q: "How do you scope a project?", a: "We start with requirement scoping, followed by an architecture and solution proposal. Delivery then happens in milestones — tested and deployed work at every stage, not one big reveal at the end." },
  { q: "What do I actually get at the end?", a: "A working, deployed product — not just source files. Documentation and post-launch support are included in every engagement." },
  { q: "How is pricing structured?", a: "Project-based, quoted after we understand your requirements. No generic subscription packages — every quote reflects the actual scope of work." },
  { q: "Do you only work with large companies?", a: "No — startups, growing businesses, and institutions all fit. What matters is wanting a team that owns full delivery, from database to deployment, without hand-offs between contractors." },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <div className="border border-[#5B87B5]/25 rounded-sm divide-y divide-[#5B87B5]/25">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={faq.q}>
            <button onClick={() => setOpenIndex(isOpen ? null : idx)} className="w-full flex justify-between items-center gap-4 px-6 py-5 text-left hover:bg-[#5B87B5]/5 transition">
              <span className="font-[family-name:var(--font-display)] font-medium">{faq.q}</span>
              <span className="font-[family-name:var(--font-mono)] text-[#E8A33D] text-lg shrink-0">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && <div className="px-6 pb-5 text-[#A9B7C9] text-sm">{faq.a}</div>}
          </div>
        );
      })}
    </div>
  );
}