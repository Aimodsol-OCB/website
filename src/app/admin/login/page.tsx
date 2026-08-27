// src/app/admin/login/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await cred.user.getIdToken();
      const res = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      if (!res.ok) throw new Error("Session creation failed");
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0E1B2E]">
      <form onSubmit={handleLogin} className="w-full max-w-sm border border-[#5B87B5]/25 rounded-sm p-8">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#EDEFF2] mb-6">Admin Login</h1>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 bg-transparent border border-[#5B87B5]/40 rounded-sm text-[#EDEFF2] placeholder:text-[#A9B7C9]" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-3 bg-transparent border border-[#5B87B5]/40 rounded-sm text-[#EDEFF2] placeholder:text-[#A9B7C9]" required />
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        <button type="submit" disabled={loading}
          className="w-full px-4 py-3 bg-[#E8A33D] text-[#0E1B2E] font-semibold rounded-sm hover:brightness-110 transition disabled:opacity-50">
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>
    </div>
  );
}