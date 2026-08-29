import { adminDb } from "@/lib/firebase/admin";
import Link from "next/link";
import SiteHeader from "@/components/public/SiteHeader";
import SiteFooter from "@/components/public/SiteFooter";
import PersonPlaceholder from "@/components/public/PersonPlaceholder";
import TeamIllustration from "@/components/public/TeamIllustration";
import SocialIcons from "@/components/public/SocialIcons";

export const dynamic = "force-dynamic";
type TeamMember = {
  id: string; name: string; role: string; photoUrl?: string;
  socialLinks?: { facebook?: string; twitter?: string; linkedin?: string; instagram?: string };
};

async function getTeam(): Promise<TeamMember[]> {
  try {
    const snapshot = await adminDb.collection("team").orderBy("order", "asc").get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as TeamMember));
  } catch { return []; }
}

export default async function AboutPage() {
  const team = await getTeam();
  return (
    <>
      <SiteHeader />

      {/* Hero */}
      <section className="relative bp-grid border-b border-[#5B87B5]/20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,163,61,0.06),transparent_60%)]" />
        <div className="max-w-6xl mx-auto px-6 py-20 text-center relative">
          <div className="inline-flex items-center gap-3 mb-4">
            <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[#4FB0A5]">ABOUT</p>
            <span className="w-8 h-px bg-[#5B87B5]/40" /><span className="w-1.5 h-1.5 rounded-full bg-[#E8A33D]" />
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-5xl font-semibold">The Studio</h1>
        </div>
      </section>

      {/* Intro + illustration */}
      <section className="bp-grid-faint">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[#4FB0A5] mb-3">OUR DEDICATED TEAM</p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold mb-6">Get to know Digiflow.</h2>
            <p className="text-[#A9B7C9] mb-8">Digiflow started with a simple idea: software houses shouldn&apos;t feel like outsourced factories. We&apos;re a small team of senior specialists, each expert in their own layer of the stack.</p>
            <Link href="/contact" className="inline-block px-6 py-3 bg-[#E8A33D] text-[#0E1B2E] font-semibold rounded-sm hover:brightness-110 transition">Talk to Us</Link>
          </div>
          <TeamIllustration />
        </div>
      </section>

      {/* Team grid */}
      <main className="max-w-6xl mx-auto px-6 py-20 border-t border-[#5B87B5]/20">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-4">
            <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[#4FB0A5]">OUR EXPERT TEAM MEMBERS</p>
            <span className="w-8 h-px bg-[#5B87B5]/40" /><span className="w-1.5 h-1.5 rounded-full bg-[#E8A33D]" />
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold">Top Skilled Experts</h2>
        </div>

        {team.length === 0 ? (
          <p className="text-[#A9B7C9] text-sm border border-dashed border-[#5B87B5]/30 rounded-sm px-6 py-8 text-center">Team members will appear here once added from the admin dashboard.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member.id} className="bg-[#5B87B5]/8 border border-[#5B87B5]/20 rounded-sm p-4 text-center hover:border-[#8FB8E0] transition">
                <Link href={`/team/${member.id}`} className="block rounded-sm overflow-hidden mb-4 bg-[#0A141F] p-3">
                    <div className="rounded-sm overflow-hidden">
                      {member.photoUrl ? (
                        <img src={member.photoUrl} alt={member.name} className="w-full aspect-[3/4] object-cover rounded-sm" />
                      ) : (
                        <PersonPlaceholder name={member.name} />
                      )}
                    </div>
                  </Link>
                <Link href={`/team/${member.id}`}>
                  <h3 className="font-[family-name:var(--font-display)] font-semibold text-lg hover:text-[#8FB8E0] transition">{member.name}</h3>
                </Link>
                <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] text-[#4FB0A5] mt-1 mb-4">{member.role.toUpperCase()}</p>
                {member.socialLinks && <div className="flex justify-center"><SocialIcons links={member.socialLinks} /></div>}
              </div>
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}