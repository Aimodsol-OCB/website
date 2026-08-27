import { adminDb } from "@/lib/firebase/admin";
import Link from "next/link";

import SiteHeader from "@/components/public/SiteHeader";
import SiteFooter from "@/components/public/SiteFooter";

export const dynamic = "force-dynamic";

type PortfolioItem = { id: string; title: string; description: string; techTags?: string[] };

async function getFeaturedProjects(): Promise<PortfolioItem[]> {
  try {
    const snapshot = await adminDb.collection("portfolio").orderBy("order", "asc").limit(4).get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as PortfolioItem));
  } catch {
    return [];
  }
}

const layers = [
  { tag: "CLIENT", title: "Web & Mobile Applications", detail: "Next.js, React, React Native — interfaces people actually enjoy using." },
  { tag: "LOGIC", title: "Business Automation & Workflows", detail: "Zoho and custom automation pipelines that remove manual work." },
  { tag: "LEDGER", title: "Blockchain & Web3", detail: "Solidity smart contracts, NFT platforms, decentralized apps." },
  { tag: "INFRA", title: "Hosting, Backups & Maintenance", detail: "Dockerized VPS hosting with tiered maintenance packages." },
];

export default async function HomePage() {
  const projects = await getFeaturedProjects();
  return (
    <>
      <SiteHeader />
        <main className="min-h-screen">
          <section className="relative overflow-hidden bp-grid border-b border-[#5B87B5]/20">
            <div className="max-w-6xl mx-auto px-6 pt-28 pb-24 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[#4FB0A5] mb-6">DIGIFLOW / SOFTWARE ARCHITECTURE STUDIO</p>
                <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-semibold leading-tight">We architect software.<br />Then we build it properly.</h1>
                <p className="mt-6 text-[#A9B7C9] text-lg max-w-md">A small studio of senior engineers designing full-stack, mobile, blockchain, and automation systems — from the blueprint up.</p>
                <div className="mt-8 flex gap-4">
                  <Link href="/contact" className="px-6 py-3 bg-[#E8A33D] text-[#0E1B2E] font-semibold rounded-sm hover:brightness-110 transition">Start a project</Link>
                  <Link href="/portfolio" className="px-6 py-3 border border-[#5B87B5] rounded-sm hover:border-[#8FB8E0] transition">View our work</Link>
                </div>
              </div>
              <svg viewBox="0 0 480 340" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="20" width="140" height="60" rx="2" stroke="#8FB8E0" strokeWidth="1.5" className="bp-draw" />
                <text x="90" y="55" textAnchor="middle" fill="#A9B7C9" fontSize="12" fontFamily="var(--font-mono)">CLIENT</text>
                <rect x="170" y="140" width="140" height="60" rx="2" stroke="#8FB8E0" strokeWidth="1.5" className="bp-draw" />
                <text x="240" y="175" textAnchor="middle" fill="#A9B7C9" fontSize="12" fontFamily="var(--font-mono)">API LAYER</text>
                <rect x="320" y="20" width="140" height="60" rx="2" stroke="#8FB8E0" strokeWidth="1.5" className="bp-draw" />
                <text x="390" y="55" textAnchor="middle" fill="#A9B7C9" fontSize="12" fontFamily="var(--font-mono)">DATABASE</text>
                <rect x="170" y="250" width="140" height="60" rx="2" stroke="#5B87B5" strokeWidth="1.5" className="bp-draw" />
                <text x="240" y="285" textAnchor="middle" fill="#A9B7C9" fontSize="12" fontFamily="var(--font-mono)">INFRA</text>
                <path d="M90 80 L90 110 L240 110 L240 140" stroke="#5B87B5" strokeWidth="1.25" className="bp-draw" />
                <path d="M390 80 L390 110 L310 110 L310 140" stroke="#5B87B5" strokeWidth="1.25" className="bp-draw" />
                <path d="M240 200 L240 250" stroke="#5B87B5" strokeWidth="1.25" className="bp-draw" />
                <line x1="20" y1="315" x2="460" y2="315" stroke="#5B87B5" strokeWidth="1" opacity="0.4" />
                <text x="20" y="332" fill="#5B87B5" fontSize="10" fontFamily="var(--font-mono)" opacity="0.7">DIGIFLOW — SYSTEM ARCHITECTURE — REV. 01</text>
              </svg>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-6 py-24">
            <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[#4FB0A5] mb-3">WHAT WE BUILD</p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold mb-12">One stack, four layers.</h2>
            <div className="border border-[#5B87B5]/25 rounded-sm divide-y divide-[#5B87B5]/25">
              {layers.map((layer) => (
                <div key={layer.tag} className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8 px-6 py-6">
                  <span className="font-[family-name:var(--font-mono)] text-xs text-[#E8A33D] w-24 shrink-0">{layer.tag}</span>
                  <h3 className="font-[family-name:var(--font-display)] font-medium text-lg w-full md:w-72 shrink-0">{layer.title}</h3>
                  <p className="text-[#A9B7C9] text-sm">{layer.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-6 py-24 border-t border-[#5B87B5]/20">
            <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[#4FB0A5] mb-3">WHY DIGIFLOW</p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold mb-12">Senior engineers. No middlemen.</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div><h3 className="font-[family-name:var(--font-display)] font-medium text-lg mb-2">Senior-only team</h3><p className="text-[#A9B7C9] text-sm">Every engineer on your project has years of production experience — no juniors learning on your budget.</p></div>
              <div><h3 className="font-[family-name:var(--font-display)] font-medium text-lg mb-2">Architecture-first</h3><p className="text-[#A9B7C9] text-sm">We design the system before we write a line of code — fewer rewrites, cleaner scaling.</p></div>
              <div><h3 className="font-[family-name:var(--font-display)] font-medium text-lg mb-2">Direct access</h3><p className="text-[#A9B7C9] text-sm">You talk to the engineers building your product, not an account manager relaying messages.</p></div>
            </div>
          </section>

          <section className="max-w-6xl mx-auto px-6 py-24 border-t border-[#5B87B5]/20">
            <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[#4FB0A5] mb-3">DRAWING INDEX</p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold mb-12">Recent work.</h2>
            {projects.length === 0 ? (
              <p className="text-[#A9B7C9] text-sm border border-dashed border-[#5B87B5]/30 rounded-sm px-6 py-8">Projects will appear here once added from the admin dashboard.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="border border-[#5B87B5]/25 rounded-sm p-6 hover:border-[#8FB8E0] transition">
                    <h3 className="font-[family-name:var(--font-display)] font-medium text-lg">{project.title}</h3>
                    <p className="text-[#A9B7C9] text-sm mt-2">{project.description}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="max-w-6xl mx-auto px-6 py-24 border-t border-[#5B87B5]/20 text-center">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold mb-4">Have a system in mind?</h2>
            <p className="text-[#A9B7C9] mb-8">Let&apos;s put it on paper — then ship it.</p>
            <Link href="/contact" className="inline-block px-8 py-3 bg-[#E8A33D] text-[#0E1B2E] font-semibold rounded-sm hover:brightness-110 transition">Get in touch</Link>
          </section>
        </main>
      <SiteFooter />
    </>
  );
}