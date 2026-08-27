import { adminDb } from "@/lib/firebase/admin";
import SiteHeader from "@/components/public/SiteHeader";
import SiteFooter from "@/components/public/SiteFooter";

export const dynamic = "force-dynamic";
type TeamMember = { id: string; name: string; role: string; specialization?: string };

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
      <main className="max-w-6xl mx-auto px-6 py-20">
        <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[#4FB0A5] mb-3">ABOUT</p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold mb-6">The studio</h1>
        <p className="text-[#A9B7C9] max-w-2xl mb-16">Digiflow started with a simple idea: software houses shouldn&apos;t feel like outsourced factories. We&apos;re a small team of senior specialists, each expert in their own layer of the stack.</p>
        <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[#4FB0A5] mb-3">THE TEAM</p>
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-8">Who&apos;s building</h2>
        {team.length === 0 ? (
          <p className="text-[#A9B7C9] text-sm border border-dashed border-[#5B87B5]/30 rounded-sm px-6 py-8">Team members will appear here once added from the admin dashboard.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member.id} className="border border-[#5B87B5]/25 rounded-sm p-6">
                <h3 className="font-[family-name:var(--font-display)] font-medium">{member.name}</h3>
                <p className="text-sm text-[#E8A33D]">{member.role}</p>
                {member.specialization && <p className="text-sm text-[#A9B7C9] mt-2">{member.specialization}</p>}
              </div>
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}