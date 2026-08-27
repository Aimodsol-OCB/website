"use client";
import { useState } from "react";
import SiteHeader from "@/components/public/SiteHeader";
import SiteFooter from "@/components/public/SiteFooter";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch { setStatus("error"); }
  }

  return (
    <>
      <SiteHeader />
      <main className="max-w-3xl mx-auto px-6 py-20">
        <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[#4FB0A5] mb-3">GET IN TOUCH</p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold mb-4">Let&apos;s put it on paper</h1>
        <p className="text-[#A9B7C9] mb-10">Tell us what you&apos;re building — we&apos;ll get back within a day.</p>
        <form onSubmit={handleSubmit} className="space-y-4 mb-10">
          <input type="text" placeholder="Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 bg-transparent border border-[#5B87B5]/40 rounded-sm placeholder:text-[#A9B7C9]" />
          <input type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 bg-transparent border border-[#5B87B5]/40 rounded-sm placeholder:text-[#A9B7C9]" />
          <textarea placeholder="Tell us about your project" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-4 py-3 bg-transparent border border-[#5B87B5]/40 rounded-sm placeholder:text-[#A9B7C9]" />
          <button type="submit" disabled={status === "loading"}
            className="px-8 py-3 bg-[#E8A33D] text-[#0E1B2E] font-semibold rounded-sm hover:brightness-110 transition disabled:opacity-50">
            {status === "loading" ? "Sending..." : "Send message"}
          </button>
          {status === "success" && <p className="text-[#4FB0A5] text-sm">Message sent — we&apos;ll be in touch soon.</p>}
          {status === "error" && <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>}
        </form>
        <a href="https://wa.me/923114910259" target="_blank" rel="noopener noreferrer"
          className="inline-block px-6 py-3 border border-[#5B87B5] rounded-sm hover:border-[#8FB8E0] transition">
          Chat with us on WhatsApp
        </a>
      </main>
      <SiteFooter />
    </>
  );
}