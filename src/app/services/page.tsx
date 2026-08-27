import { adminDb } from "@/lib/firebase/admin";
import SiteHeader from "@/components/public/SiteHeader";
import SiteFooter from "@/components/public/SiteFooter";

export const dynamic = "force-dynamic";
type Service = { id: string; title: string; description: string; techTags?: string[] };

async function getServices(): Promise<Service[]> {
  try {
    const snapshot = await adminDb.collection("services").orderBy("order", "asc").get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Service));
  } catch { return []; }
}

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-6 py-20">
        <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[#4FB0A5] mb-3">SPECIFICATION</p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold mb-4">What we build</h1>
        <p className="text-[#A9B7C9] max-w-xl mb-12">Every engagement starts with a system diagram, not a proposal template.</p>
        {services.length === 0 ? (
          <p className="text-[#A9B7C9] text-sm border border-dashed border-[#5B87B5]/30 rounded-sm px-6 py-8">Services will appear here once added from the admin dashboard.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div key={service.id} className="border border-[#5B87B5]/25 rounded-sm p-6">
                <h3 className="font-[family-name:var(--font-display)] font-medium text-lg mb-2">{service.title}</h3>
                <p className="text-[#A9B7C9] text-sm mb-4">{service.description}</p>
                {service.techTags && service.techTags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {service.techTags.map((tag) => <span key={tag} className="font-[family-name:var(--font-mono)] text-[10px] text-[#4FB0A5] border border-[#4FB0A5]/30 rounded-sm px-2 py-1">{tag}</span>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}