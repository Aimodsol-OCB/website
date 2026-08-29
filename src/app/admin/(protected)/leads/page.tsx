// src/app/admin/(protected)/leads/page.tsx
"use client";
import { useEffect, useState } from "react";

type Lead = { id: string; name: string; email: string; message: string; status: string; createdAt: string };

const STATUS_OPTIONS = ["new", "contacted", "closed"];

export default function LeadsAdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function loadLeads() {
    setLoading(true);
    const res = await fetch("/api/leads");
    const data = await res.json();
    setLeads(data.leads || []);
    setLoading(false);
  }

  useEffect(() => { loadLeads(); }, []);

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/leads/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    loadLeads();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this lead?")) return;
    await fetch(`/api/leads/${id}`, { method: "DELETE" });
    loadLeads();
  }

  const newCount = leads.filter((l) => l.status === "new").length;
  const contactedCount = leads.filter((l) => l.status === "contacted").length;
  const closedCount = leads.filter((l) => l.status === "closed").length;

  const filteredLeads = leads.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase()) || l.email.toLowerCase().includes(search.toLowerCase())
  );

  const statusColor: Record<string, string> = { new: "text-[#E8A33D]", contacted: "text-[#4FB0A5]", closed: "text-[#A9B7C9]" };

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-6">Leads</h1>

      <div className="flex flex-wrap gap-4 mb-6 justify-end">
        <div className="border border-[#5B87B5]/25 rounded-sm p-4 w-[100px] shrink-0">
          <p className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.1em] text-[#4FB0A5] mb-2">TOTAL</p>
          <p className="font-[family-name:var(--font-display)] text-2xl font-semibold">{leads.length}</p>
        </div>
        <div className="border border-[#5B87B5]/25 rounded-sm p-4 w-[100px] shrink-0">
          <p className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.1em] text-[#E8A33D] mb-2">NEW</p>
          <p className="font-[family-name:var(--font-display)] text-2xl font-semibold">{newCount}</p>
        </div>
        <div className="border border-[#5B87B5]/25 rounded-sm p-4 w-[100px] shrink-0">
          <p className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.1em] text-[#4FB0A5] mb-2">CONTACTED</p>
          <p className="font-[family-name:var(--font-display)] text-2xl font-semibold">{contactedCount}</p>
        </div>
        <div className="border border-[#5B87B5]/25 rounded-sm p-4 w-[100px] shrink-0">
          <p className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.1em] text-[#A9B7C9] mb-2">CLOSED</p>
          <p className="font-[family-name:var(--font-display)] text-2xl font-semibold">{closedCount}</p>
        </div>
      </div>

      <div className="mb-4">
        <input type="text" placeholder="Search leads..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xs px-4 py-2 bg-transparent border border-[#5B87B5]/40 rounded-sm placeholder:text-[#A9B7C9] text-sm" />
      </div>

      {loading ? (
        <p className="text-[#A9B7C9]">Loading...</p>
      ) : filteredLeads.length === 0 ? (
        <p className="text-[#A9B7C9] border border-dashed border-[#5B87B5]/30 rounded-sm px-6 py-8">
          {leads.length === 0 ? "No leads yet — they will appear here when someone submits the contact form." : "No leads match your search."}
        </p>
      ) : (
        <div className="border border-[#5B87B5]/25 rounded-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#5B87B5]/25 text-left">
                <th className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] text-[#4FB0A5] px-4 py-3">NAME</th>
                <th className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] text-[#4FB0A5] px-4 py-3">EMAIL</th>
                <th className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] text-[#4FB0A5] px-4 py-3">MESSAGE</th>
                <th className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] text-[#4FB0A5] px-4 py-3">DATE</th>
                <th className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] text-[#4FB0A5] px-4 py-3">STATUS</th>
                <th className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] text-[#4FB0A5] px-4 py-3 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#5B87B5]/15">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-[#5B87B5]/5">
                  <td className="px-4 py-3 font-medium whitespace-nowrap">{lead.name}</td>
                  <td className="px-4 py-3 text-[#A9B7C9] whitespace-nowrap">{lead.email}</td>
                  <td className="px-4 py-3 text-[#A9B7C9] max-w-xs truncate">{lead.message}</td>
                  <td className="px-4 py-3 text-[#A9B7C9] font-[family-name:var(--font-mono)] text-xs whitespace-nowrap">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <select value={lead.status} onChange={(e) => updateStatus(lead.id, e.target.value)}
                      className={`bg-transparent border border-[#5B87B5]/40 rounded-sm px-2 py-1 text-xs ${statusColor[lead.status] || ""}`}>
                      {STATUS_OPTIONS.map((s) => <option key={s} value={s} className="bg-[#0E1B2E] text-[#EDEFF2]">{s}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button onClick={() => handleDelete(lead.id)} className="text-red-400 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}