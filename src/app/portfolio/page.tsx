import { adminDb } from "@/lib/firebase/admin";
import SiteHeader from "@/components/public/SiteHeader";
import SiteFooter from "@/components/public/SiteFooter";

export const dynamic = "force-dynamic";
type PortfolioItem = { id: string; title: string; description: string; url?: string; techTags?: string[] };

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
      <main className="max-w-6xl mx-auto px-6 py-20">
        <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[#4FB0A5] mb-3">DRAWING INDEX</p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold mb-4">Work on record</h1>
        <p className="text-[#A9B7C9] max-w-xl mb-12">A selection of systems we&apos;ve designed and shipped.</p>
        {projects.length === 0 ? (
          <p className="text-[#A9B7C9] text-sm border border-dashed border-[#5B87B5]/30 rounded-sm px-6 py-8">Projects will appear here once added from the admin dashboard.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <a key={project.id} href={project.url || "#"} target={project.url ? "_blank" : undefined} rel="noopener noreferrer"
                className="border border-[#5B87B5]/25 rounded-sm p-6 hover:border-[#8FB8E0] transition block">
                <h3 className="font-[family-name:var(--font-display)] font-medium text-lg">{project.title}</h3>
                <p className="text-[#A9B7C9] text-sm mt-2">{project.description}</p>
              </a>
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}