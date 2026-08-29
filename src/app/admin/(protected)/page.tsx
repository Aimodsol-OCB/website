// src/app/admin/(protected)/page.tsx
import { adminDb } from "@/lib/firebase/admin";

export const dynamic = "force-dynamic";

async function getStats() {
  const [servicesSnap, portfolioSnap, teamSnap, leadsSnap] = await Promise.all([
    adminDb.collection("services").get(),
    adminDb.collection("portfolio").get(),
    adminDb.collection("team").get(),
    adminDb.collection("leads").get(),
  ]);

  const leads = leadsSnap.docs.map((doc) => doc.data());
  const statusCounts = { new: 0, contacted: 0, closed: 0 };
  leads.forEach((lead) => {
    const status = (lead.status as string) || "new";
    if (status in statusCounts) statusCounts[status as keyof typeof statusCounts]++;
  });

  const days: { label: string; count: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const label = d.toLocaleDateString("en-US", { weekday: "short" });
    const dateKey = d.toDateString();
    const count = leads.filter((lead) => {
      const createdAt = lead.createdAt ? new Date(lead.createdAt as string) : null;
      return createdAt && createdAt.toDateString() === dateKey;
    }).length;
    days.push({ label, count });
  }

  return { servicesCount: servicesSnap.size, portfolioCount: portfolioSnap.size, teamCount: teamSnap.size, leadsCount: leadsSnap.size, statusCounts, days };
}

export default async function AdminDashboard() {
  const stats = await getStats();
  const maxDayCount = Math.max(...stats.days.map((d) => d.count), 1);
  const maxStatusCount = Math.max(stats.statusCounts.new, stats.statusCounts.contacted, stats.statusCounts.closed, 1);
  const statusBars = [
    { label: "NEW", value: stats.statusCounts.new, color: "#E8A33D" },
    { label: "CONTACTED", value: stats.statusCounts.contacted, color: "#4FB0A5" },
    { label: "CLOSED", value: stats.statusCounts.closed, color: "#5B87B5" },
  ];

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-8">Dashboard</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "SERVICES", value: stats.servicesCount },
          { label: "PORTFOLIO", value: stats.portfolioCount },
          { label: "TEAM", value: stats.teamCount },
          { label: "LEADS", value: stats.leadsCount },
        ].map((stat) => (
          <div key={stat.label} className="border border-[#5B87B5]/25 rounded-sm p-5">
            <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[#4FB0A5] mb-2">{stat.label}</p>
            <p className="font-[family-name:var(--font-display)] text-3xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-[#5B87B5]/25 rounded-sm p-6">
          <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[#4FB0A5] mb-6">LEADS — LAST 7 DAYS</p>
          <div className="flex items-end gap-3 h-40">
            {stats.days.map((day) => (
              <div key={day.label} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-[#E8A33D]/80 rounded-sm" style={{ height: `${(day.count / maxDayCount) * 100}%`, minHeight: day.count > 0 ? "4px" : "1px" }} />
                <span className="font-[family-name:var(--font-mono)] text-[10px] text-[#A9B7C9]">{day.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-[#5B87B5]/25 rounded-sm p-6">
          <p className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[#4FB0A5] mb-6">LEADS BY STATUS</p>
          <div className="space-y-4">
            {statusBars.map((bar) => (
              <div key={bar.label}>
                <div className="flex justify-between mb-1">
                  <span className="font-[family-name:var(--font-mono)] text-[10px] text-[#A9B7C9]">{bar.label}</span>
                  <span className="font-[family-name:var(--font-mono)] text-[10px] text-[#A9B7C9]">{bar.value}</span>
                </div>
                <div className="w-full h-2 bg-[#5B87B5]/15 rounded-sm overflow-hidden">
                  <div className="h-full rounded-sm" style={{ width: `${(bar.value / maxStatusCount) * 100}%`, backgroundColor: bar.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}