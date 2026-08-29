import { adminDb } from "@/lib/firebase/admin";
import SiteHeader from "@/components/public/SiteHeader";
import SiteFooter from "@/components/public/SiteFooter";
import PortfolioGrid from "@/components/public/PortfolioGrid";

export const dynamic = "force-dynamic";
type PortfolioItem = { id: string; title: string; description: string; url?: string; imageUrl?: string; techTags?: string[] };

async function getPortfolio(): Promise<PortfolioItem[]> {
  try {
    const snapshot = await adminDb.collection("portfolio").orderBy("order", "asc").get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as PortfolioItem));
  } catch { return []; }
}

export default async function PortfolioPage() {
  const projects = await getPortfolio();
  return (
    <>
      <SiteHeader />
      <section className="relative bp-grid border-b border-[#5B87B5]/20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,163,61,0.06),transparent_60%)]" />
        <div className="max-w-6xl mx-auto px-6 py-20 text-center relative">
          <div className="inline-flex items-center gap-3 mb-4">
            <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[#4FB0A5]">DRAWING INDEX</p>
            <span className="w-8 h-px bg-[#5B87B5]/40" /><span className="w-1.5 h-1.5 rounded-full bg-[#E8A33D]" />
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-5xl font-semibold">Our Portfolio</h1>
        </div>
      </section>
      <main className="bp-grid-faint">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <PortfolioGrid projects={projects} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}