// src/app/contact/page.tsx
"use client";
import { useState } from "react";
import SiteHeader from "@/components/public/SiteHeader";
import SiteFooter from "@/components/public/SiteFooter";
import CornerMark from "@/components/public/CornerMark";

const steps = [
  { num: "01", label: "Share your requirements" },
  { num: "02", label: "Discuss them with our engineers" },
  { num: "03", label: "Get an architecture-first quote" },
  { num: "04", label: "Start the project" },
];

function FieldIcon({ path }: { path: string }) {
  return (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"><path d={path} stroke="#5B87B5" strokeWidth="1.4" /></svg>);
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const combinedMessage = [
      form.message,
      form.phone && `Phone: ${form.phone}`,
      form.company && `Company: ${form.company}`,
    ].filter(Boolean).join("\n\n");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: combinedMessage }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", phone: "", company: "", message: "" });
    } catch { setStatus("error"); }
  }

  return (
    <>
      <SiteHeader />
      <main className="bp-grid-faint">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-5 gap-8">

            {/* Left: info card */}
            <div className="relative border border-[#5B87B5]/25 rounded-sm p-8 md:p-10 md:col-span-2">
              <CornerMark position="top-left" /><CornerMark position="bottom-right" />
              <div className="flex items-center gap-3 mb-6">
                <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[#4FB0A5]">YOU ARE HERE</p>
                <span className="w-8 h-px bg-[#5B87B5]/40" /><span className="w-1.5 h-1.5 rounded-full bg-[#E8A33D]" />
              </div>
              <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold mb-4">Let&apos;s Start</h1>
              <p className="text-[#A9B7C9] mb-10">Initiating your journey — from architecture to deployment.</p>

              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full border border-[#4FB0A5]/40 flex items-center justify-center shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 4h16v16H4z" stroke="#4FB0A5" strokeWidth="1.4" /><path d="M4 6l8 6 8-6" stroke="#4FB0A5" strokeWidth="1.4" /></svg>
                  </span>
                  <span className="text-[#EDEFF2] text-sm">hello@digiflow.dev</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full border border-[#4FB0A5]/40 flex items-center justify-center shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 21s-7-6.2-7-11a7 7 0 1114 0c0 4.8-7 11-7 11z" stroke="#4FB0A5" strokeWidth="1.4" /><circle cx="12" cy="10" r="2.3" stroke="#4FB0A5" strokeWidth="1.4" /></svg>
                  </span>
                  <span className="text-[#EDEFF2] text-sm">Islamabad / Rawalpindi, Pakistan</span>
                </div>
                <a href="https://wa.me/92XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                  <span className="w-9 h-9 rounded-full border border-[#4FB0A5]/40 flex items-center justify-center shrink-0 group-hover:border-[#4FB0A5] transition">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.5A10 10 0 1012 2z" stroke="#4FB0A5" strokeWidth="1.4" /></svg>
                  </span>
                  <span className="text-[#EDEFF2] text-sm group-hover:text-[#4FB0A5] transition">Chat on WhatsApp</span>
                </a>
              </div>

              <div className="relative pl-1">
                <div className="absolute left-[17px] top-3 bottom-3 w-px bg-[#5B87B5]/25" />
                <div className="space-y-6 relative">
                  {steps.map((step) => (
                    <div key={step.num} className="flex items-center gap-4 relative z-10">
                      <span className="w-9 h-9 rounded-full border border-[#E8A33D] bg-[#0E1B2E] flex items-center justify-center font-[family-name:var(--font-mono)] text-xs text-[#E8A33D] shrink-0">{step.num}</span>
                      <span className="text-sm text-[#A9B7C9]">{step.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: form card */}
            <div className="relative border border-[#5B87B5]/25 rounded-sm p-8 md:p-10 md:col-span-3">
              <CornerMark position="top-right" /><CornerMark position="bottom-left" />
              <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[#4FB0A5] mb-4">LET&apos;S CONNECT!</p>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-8">Send us a message, and we&apos;ll promptly discuss your project with you.</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <FieldIcon path="M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0" />
                    <input type="text" placeholder="Your Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-transparent border border-[#5B87B5]/40 rounded-sm placeholder:text-[#A9B7C9] text-sm" />
                  </div>
                  <div className="relative">
                    <FieldIcon path="M4 4h16v16H4z M4 6l8 6 8-6" />
                    <input type="email" placeholder="Your Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-transparent border border-[#5B87B5]/40 rounded-sm placeholder:text-[#A9B7C9] text-sm" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <FieldIcon path="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.7A2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .3 2 .6 2.9a2 2 0 01-.5 2.1L8 9.9a16 16 0 006 6l1.2-1.2a2 2 0 012.1-.5c.9.3 1.9.5 2.9.6a2 2 0 011.8 2.1z" />
                    <input type="tel" placeholder="Phone (optional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-transparent border border-[#5B87B5]/40 rounded-sm placeholder:text-[#A9B7C9] text-sm" />
                  </div>
                  <div className="relative">
                    <FieldIcon path="M3 21h18M6 21V7l6-4 6 4v14M9 21v-6h6v6" />
                    <input type="text" placeholder="Company (optional)" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-transparent border border-[#5B87B5]/40 rounded-sm placeholder:text-[#A9B7C9] text-sm" />
                  </div>
                </div>
                <textarea placeholder="How can we help you?" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 bg-transparent border border-[#5B87B5]/40 rounded-sm placeholder:text-[#A9B7C9] text-sm" />
                <button type="submit" disabled={status === "loading"}
                  className="px-8 py-3 bg-[#E8A33D] text-[#0E1B2E] font-semibold rounded-sm hover:brightness-110 transition disabled:opacity-50">
                  {status === "loading" ? "Sending..." : "Send Request"}
                </button>
                {status === "success" && <p className="text-[#4FB0A5] text-sm">Message sent — we&apos;ll be in touch soon.</p>}
                {status === "error" && <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>}
              </form>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}