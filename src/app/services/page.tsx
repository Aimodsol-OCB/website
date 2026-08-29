import { adminDb } from "@/lib/firebase/admin";
import SiteHeader from "@/components/public/SiteHeader";
import SiteFooter from "@/components/public/SiteFooter";
import CornerMark from "@/components/public/CornerMark";
import { getServiceIcon } from "@/components/public/getServiceIcon";

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
      <main className="relative bp-grid-faint overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[#4FB0A5]">OUR SERVICES</p>
              <span className="w-8 h-px bg-[#5B87B5]/40" /><span className="w-1.5 h-1.5 rounded-full bg-[#E8A33D]" />
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold">How We Can Help You</h1>
          </div>

          {services.length === 0 ? (
            <p className="text-[#A9B7C9] text-sm border border-dashed border-[#5B87B5]/30 rounded-sm px-6 py-8 text-center">Services will appear here once added from the admin dashboard.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div key={service.id} className="relative border border-[#5B87B5]/25 rounded-sm p-6 hover:border-[#8FB8E0] transition">
                  <CornerMark position="top-left" /><CornerMark position="bottom-right" />
                  <div className="mb-5">{getServiceIcon(service.title)}</div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-medium mb-2">{service.title}</h3>
                  <p className="text-[#A9B7C9] text-sm mb-5">{service.description}</p>
                  {service.techTags && service.techTags.length > 0 && (
                    <ul className="space-y-2">
                      {service.techTags.map((tag) => (
                        <li key={tag} className="flex items-center gap-3 bg-[#5B87B5]/8 rounded-sm px-3 py-2">
                          <span className="w-3.5 h-3.5 rounded-full border border-[#E8A33D] flex items-center justify-center shrink-0">
                            <span className="w-1 h-1 rounded-full bg-[#E8A33D]" />
                          </span>
                          <span className="text-sm text-[#EDEFF2]">{tag}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}