// src/app/team/[id]/page.tsx
import { adminDb } from "@/lib/firebase/admin";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/public/SiteHeader";
import SiteFooter from "@/components/public/SiteFooter";
import CornerMark from "@/components/public/CornerMark";
import PersonPlaceholder from "@/components/public/PersonPlaceholder";
import SocialIcons from "@/components/public/SocialIcons";

export const dynamic = "force-dynamic";

async function getMember(id: string) {
  const doc = await adminDb.collection("team").doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() } as {
    id: string; name: string; role: string; specialization?: string; photoUrl?: string;
    experience?: string; email?: string; phone?: string; bio?: string;
    socialLinks?: { facebook?: string; twitter?: string; linkedin?: string; instagram?: string };
  };
}

export default async function TeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = await getMember(id);
  if (!member) notFound();

  return (
    <>
      <SiteHeader />
      <section className="relative bp-grid border-b border-[#5B87B5]/20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,163,61,0.06),transparent_60%)]" />
        <div className="max-w-6xl mx-auto px-6 py-20 text-center relative">
          <div className="inline-flex items-center gap-3 mb-4">
            <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[#4FB0A5]">TEAM / DETAILS</p>
            <span className="w-8 h-px bg-[#5B87B5]/40" /><span className="w-1.5 h-1.5 rounded-full bg-[#E8A33D]" />
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-5xl font-semibold">{member.name}</h1>
        </div>
      </section>

      <main className="bp-grid-faint">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="relative border border-[#5B87B5]/25 rounded-sm p-8 md:p-10 grid md:grid-cols-2 gap-10 items-start">
            <CornerMark position="top-left" /><CornerMark position="bottom-right" />
            <div className="rounded-sm overflow-hidden border border-[#5B87B5]/20">
              {member.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={member.photoUrl} alt={member.name} className="w-full aspect-square object-cover" />
              ) : (
                <PersonPlaceholder name={member.name} />
              )}
            </div>
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-6">{member.name}</h2>
              <div className="space-y-2 text-sm mb-8">
                <p><span className="text-[#E8A33D] font-medium">Responsibility: </span><span className="text-[#A9B7C9]">{member.role}</span></p>
                {member.experience && <p><span className="text-[#E8A33D] font-medium">Experience: </span><span className="text-[#A9B7C9]">{member.experience}</span></p>}
                {member.email && <p><span className="text-[#E8A33D] font-medium">Email: </span><span className="text-[#A9B7C9]">{member.email}</span></p>}
                {member.phone && <p><span className="text-[#E8A33D] font-medium">Phone: </span><span className="text-[#A9B7C9]">{member.phone}</span></p>}
              </div>
              {member.socialLinks && (
                <div>
                  <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] text-[#4FB0A5] mb-3">SOCIAL MEDIA</p>
                  <SocialIcons links={member.socialLinks} />
                </div>
              )}
            </div>
          </div>

          {member.bio && (
            <div className="mt-16">
              <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[#4FB0A5] mb-3">PROFESSIONAL SKILLS</p>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-6">Background</h2>
              <p className="text-[#A9B7C9] leading-relaxed max-w-3xl">{member.bio}</p>
              {member.specialization && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {member.specialization.split(",").map((s) => (
                    <span key={s} className="font-[family-name:var(--font-mono)] text-[10px] text-[#4FB0A5] border border-[#4FB0A5]/30 rounded-sm px-2 py-1">{s.trim()}</span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}