import { adminDb } from "@/lib/firebase/admin";
import Link from "next/link";
import SiteHeader from "@/components/public/SiteHeader";
import SiteFooter from "@/components/public/SiteFooter";
import CornerMark from "@/components/public/CornerMark";
import { ClientIcon, LogicIcon, LedgerIcon, InfraIcon } from "@/components/public/LayerIcons";
import ProjectPlaceholder from "@/components/public/ProjectPlaceholder";
import ProjectsIllustration from "@/components/public/ProjectsIllustration";
import FaqAccordion from "@/components/public/FaqAccordion";
import HeroDial from "@/components/public/HeroDial";
import ProcessSection from "@/components/public/ProcessSection";
import { BackendIcon, FrontendIcon, MobileTechIcon, BlockchainTechIcon, DatabaseIcon, AutomationTechIcon } from "@/components/public/TechIcons";

export const dynamic = "force-dynamic";

type PortfolioItem = { id: string; title: string; description: string; techTags?: string[] };

async function getData() {
  try {
    const [portfolioSnap, servicesSnap, teamSnap] = await Promise.all([
      adminDb.collection("portfolio").orderBy("order", "asc").limit(4).get(),
      adminDb.collection("services").get(),
      adminDb.collection("team").get(),
    ]);
    return {
      projects: portfolioSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as PortfolioItem)),
      portfolioTotal: (await adminDb.collection("portfolio").get()).size,
      servicesCount: servicesSnap.size,
      teamCount: teamSnap.size,
    };
  } catch {
    return { projects: [], portfolioTotal: 0, servicesCount: 0, teamCount: 0 };
  }
}

const layers = [
  { tag: "CLIENT", title: "Web & Mobile Applications", detail: "Next.js, React, React Native — interfaces people actually enjoy using.", Icon: ClientIcon },
  { tag: "LOGIC", title: "Business Automation & Workflows", detail: "Zoho and custom automation pipelines that remove manual work.", Icon: LogicIcon },
  { tag: "LEDGER", title: "Blockchain & Web3", detail: "Solidity smart contracts, NFT platforms, decentralized apps.", Icon: LedgerIcon },
  { tag: "INFRA", title: "Hosting, Backups & Maintenance", detail: "Dockerized VPS hosting with tiered maintenance packages.", Icon: InfraIcon },
];

const processSteps = [
  { num: "01", title: "Discovery", body: "Understand the problem, constraints, and goals before any design work starts." },
  { num: "02", title: "Architecture", body: "System design and data modeling — the blueprint before the build." },
  { num: "03", title: "Build", body: "Senior engineers implement, layer by layer, with regular checkpoints." },
  { num: "04", title: "Deploy", body: "Tested, documented, and shipped to production." },
  { num: "05", title: "Maintain", body: "Ongoing hosting, backups, and support tiers." },
];

// const techCategories = [
//   { label: "BACKEND & WEB", items: ["Node.js", "NestJS", "Express", "PHP", "Laravel"] },
//   { label: "FRONTEND", items: ["React.js", "Next.js", "Vue.js", "Tailwind CSS"] },
//   { label: "MOBILE", items: ["React Native", "Flutter", "Swift", "Kotlin"] },
//   { label: "BLOCKCHAIN", items: ["Solidity", "Hardhat", "ethers.js", "Web3.js"] },
//   { label: "DATABASES", items: ["PostgreSQL", "MongoDB", "Redis", "Drizzle ORM"] },
//   { label: "AUTOMATION & INFRA", items: ["Zoho", "AWS", "Docker", "Kafka"] },
// ];
const techCategories = [
  { label: "BACKEND & WEB", Icon: BackendIcon, items: ["Node.js", "NestJS", "Express", "PHP", "Laravel"] },
  { label: "FRONTEND", Icon: FrontendIcon, items: ["React.js", "Next.js", "Vue.js", "Tailwind CSS"] },
  { label: "MOBILE", Icon: MobileTechIcon, items: ["React Native", "Flutter", "Swift", "Kotlin"] },
  { label: "BLOCKCHAIN", Icon: BlockchainTechIcon, items: ["Solidity", "Hardhat", "ethers.js", "Web3.js"] },
  { label: "DATABASES", Icon: DatabaseIcon, items: ["PostgreSQL", "MongoDB", "Redis", "Drizzle ORM"] },
  { label: "AUTOMATION & INFRA", Icon: AutomationTechIcon, items: ["Zoho", "AWS", "Docker", "Kafka"] },
];

const whyUs = [
  { color: "#E8A33D", title: "Senior-only team", body: "Every engineer on your project has years of production experience — no juniors learning on your budget." },
  { color: "#4FB0A5", title: "Architecture-first", body: "We design the system before we write a line of code — fewer rewrites, cleaner scaling." },
  { color: "#8FB8E0", title: "Direct access", body: "You talk to the engineers building your product, not an account manager relaying messages." },
];

export default async function HomePage() {
  const { projects, portfolioTotal, servicesCount, teamCount } = await getData();

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bp-grid-faint">
        {/* Hero */}
        {/* <section className="relative overflow-hidden bp-grid border-b border-[#5B87B5]/20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,163,61,0.08),transparent_60%)]" />
          <div className="max-w-6xl mx-auto px-6 pt-28 pb-24 grid md:grid-cols-2 gap-12 items-center relative">
            <div>
              <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[#4FB0A5] mb-6">DIGIFLOW / SOFTWARE ARCHITECTURE STUDIO</p>
              <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl font-semibold leading-[1.05]">We architect software.<br />Then we build it properly.</h1>
              <p className="mt-6 text-[#A9B7C9] text-lg max-w-md">A small studio of senior engineers designing full-stack, mobile, blockchain, and automation systems — from the blueprint up.</p>
              <div className="mt-8 flex gap-4">
                <Link href="/contact" className="px-6 py-3 bg-[#E8A33D] text-[#0E1B2E] font-semibold rounded-sm hover:brightness-110 transition shadow-[0_0_30px_rgba(232,163,61,0.25)]">Start a project</Link>
                <Link href="/portfolio" className="px-6 py-3 border border-[#5B87B5] rounded-sm hover:border-[#8FB8E0] transition">View our work</Link>
              </div>
            </div>
            <div className="relative border border-[#5B87B5]/20 rounded-sm p-4">
              <CornerMark position="top-left" /><CornerMark position="top-right" /><CornerMark position="bottom-left" /><CornerMark position="bottom-right" />
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
                <text x="20" y="332" fill="#5B87B5" fontSize="10" fontFamily="var(--font-mono)" opacity="0.7">DIGIFLOW — SYSTEM ARCHITECTURE — REV. 02</text>
              </svg>
            </div>
          </div>
        </section> */}
        <section className="relative overflow-hidden bp-grid border-b border-[#5B87B5]/20">
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,163,61,0.08),transparent_60%)]" />
  <div className="max-w-6xl mx-auto px-6 pt-28 pb-24 grid md:grid-cols-2 gap-12 items-center relative">
    <div>
      <div className="flex items-center gap-3 mb-6">
        <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[#4FB0A5]">DIGIFLOW / SOFTWARE ARCHITECTURE STUDIO</p>
        <span className="flex-1 h-px bg-[#5B87B5]/30 max-w-[40px]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#E8A33D]" />
      </div>
      <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl font-semibold leading-[1.05]">We architect software.<br />Then we build it properly.</h1>
      <p className="mt-6 text-[#A9B7C9] text-lg max-w-md">A small studio of senior engineers designing full-stack, mobile, blockchain, and automation systems — from the blueprint up.</p>
      <ul className="mt-6 space-y-2">
        <li className="flex items-center gap-3 text-sm text-[#EDEFF2]">
          <span className="w-4 h-4 rounded-full border border-[#E8A33D] flex items-center justify-center shrink-0"><span className="w-1.5 h-1.5 rounded-full bg-[#E8A33D]" /></span>
          Senior engineers only — no juniors learning on your budget
        </li>
        <li className="flex items-center gap-3 text-sm text-[#EDEFF2]">
          <span className="w-4 h-4 rounded-full border border-[#E8A33D] flex items-center justify-center shrink-0"><span className="w-1.5 h-1.5 rounded-full bg-[#E8A33D]" /></span>
          Architecture before code — fewer rewrites later
        </li>
      </ul>
      <div className="mt-8 flex items-center gap-4">
        <Link href="/contact" className="px-6 py-3 bg-[#E8A33D] text-[#0E1B2E] font-semibold rounded-sm hover:brightness-110 transition shadow-[0_0_30px_rgba(232,163,61,0.25)]">Start a project</Link>
        <a href="https://wa.me/92XXXXXXXXXX" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
          className="w-12 h-12 rounded-full bg-[#4FB0A5]/15 border border-[#4FB0A5]/40 flex items-center justify-center hover:bg-[#4FB0A5]/25 transition">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.5A10 10 0 1012 2z" stroke="#4FB0A5" strokeWidth="1.5" /></svg>
        </a>
      </div>
    </div>
    <div className="relative border border-[#5B87B5]/20 rounded-sm p-4">
      <CornerMark position="top-left" /><CornerMark position="top-right" /><CornerMark position="bottom-left" /><CornerMark position="bottom-right" />
      <HeroDial />
    </div>
  </div>
</section>

        {/* Stats band */}
        <section className="border-b border-[#5B87B5]/20">
          <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-3 gap-6">
            {[
              { label: "PROJECTS SHIPPED", value: portfolioTotal },
              { label: "SENIOR ENGINEERS", value: teamCount },
              { label: "SERVICE LAYERS", value: servicesCount },
            ].map((stat) => (
              <div key={stat.label} className="relative border border-[#5B87B5]/20 rounded-sm p-6 text-center">
                <CornerMark position="top-left" /><CornerMark position="bottom-right" />
                <p className="font-[family-name:var(--font-display)] text-4xl font-semibold text-[#E8A33D]">{stat.value}+</p>
                <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] text-[#A9B7C9] mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services as layers */}
        <section className="max-w-6xl mx-auto px-6 py-24">
          <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[#4FB0A5] mb-3">WHAT WE BUILD</p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold mb-12">One stack, four layers.</h2>
          <div className="border border-[#5B87B5]/25 rounded-sm divide-y divide-[#5B87B5]/25">
            {layers.map((layer) => (
              <div key={layer.tag} className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 px-6 py-6 hover:bg-[#5B87B5]/5 transition">
                <layer.Icon />
                <span className="font-[family-name:var(--font-mono)] text-xs text-[#E8A33D] w-24 shrink-0">{layer.tag}</span>
                <h3 className="font-[family-name:var(--font-display)] font-medium text-lg w-full md:w-72 shrink-0">{layer.title}</h3>
                <p className="text-[#A9B7C9] text-sm">{layer.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <ProcessSection />

          {/* Tech stack */}
          <section className="max-w-6xl mx-auto px-6 py-24 border-t border-[#5B87B5]/20">
            <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[#4FB0A5] mb-3">TECH STACK</p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold mb-12">What we build with.</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {techCategories.map((cat) => (
                <div key={cat.label} className="border border-[#5B87B5]/25 rounded-sm p-5">
                  {/* <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] text-[#4FB0A5] mb-3">{cat.label}</p> */}
                  <div className="flex items-center gap-3 mb-3">
                    <cat.Icon />
                    <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] text-[#4FB0A5]">{cat.label}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <span key={item} className="font-[family-name:var(--font-mono)] text-[10px] text-[#8FB8E0] border border-[#5B87B5]/30 rounded-sm px-2 py-1">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

        {/* Why us */}
        <section className="max-w-6xl mx-auto px-6 py-24 border-t border-[#5B87B5]/20">
          <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[#4FB0A5] mb-3">WHY DIGIFLOW</p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold mb-12">Senior engineers. No middlemen.</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {whyUs.map((item) => (
              <div key={item.title} className="relative border border-[#5B87B5]/25 rounded-sm p-6 overflow-hidden">
                <CornerMark position="top-left" color={item.color} /><CornerMark position="bottom-right" color={item.color} />
                <div className="w-8 h-[2px] mb-4" style={{ backgroundColor: item.color }} />
                <h3 className="font-[family-name:var(--font-display)] font-medium text-lg mb-2">{item.title}</h3>
                <p className="text-[#A9B7C9] text-sm">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured projects */}
        <section className="max-w-6xl mx-auto px-6 py-24 border-t border-[#5B87B5]/20">
        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
        <div>
          <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[#4FB0A5] mb-3">DRAWING INDEX</p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold">Recent work.</h2>
        </div>
        <ProjectsIllustration />
      </div>
         {projects.length === 0 ? (
            <p className="text-[#A9B7C9] text-sm border border-dashed border-[#5B87B5]/30 rounded-sm px-6 py-8">Projects will appear here once added from the admin dashboard.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project, idx) => (
                <div key={project.id} className="border border-[#5B87B5]/25 rounded-sm overflow-hidden hover:border-[#8FB8E0] hover:-translate-y-0.5 transition">
                <ProjectPlaceholder index={idx} />
                <div className="p-6">
                    <h3 className="font-[family-name:var(--font-display)] font-medium text-lg">{project.title}</h3>
                    <p className="text-[#A9B7C9] text-sm mt-2">{project.description}</p>
                    {project.techTags && project.techTags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.techTags.map((tag) => <span key={tag} className="font-[family-name:var(--font-mono)] text-[10px] text-[#4FB0A5] border border-[#4FB0A5]/30 rounded-sm px-2 py-1">{tag}</span>)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* FAQ */}
        <section className="max-w-6xl mx-auto px-6 py-24 border-t border-[#5B87B5]/20">
          <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[#4FB0A5] mb-3">QUESTIONS</p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold mb-12">Need to know more?</h2>
          <FaqAccordion />
        </section>

        {/* Bottom CTA */}
        <section className="relative max-w-6xl mx-auto px-6 py-24 border-t border-[#5B87B5]/20 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,163,61,0.06),transparent_60%)]" />
          <div className="relative">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold mb-4">Have a system in mind?</h2>
            <p className="text-[#A9B7C9] mb-8">Let&apos;s put it on paper — then ship it.</p>
            <Link href="/contact" className="inline-block px-8 py-3 bg-[#E8A33D] text-[#0E1B2E] font-semibold rounded-sm hover:brightness-110 transition shadow-[0_0_30px_rgba(232,163,61,0.25)]">Get in touch</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}