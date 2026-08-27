// src/app/admin/(protected)/leads/page.tsx
"use client";
import { useEffect, useState } from "react";

type Lead = { id: string; name: string; email: string; message: string; status: string; createdAt: string };

const STATUS_OPTIONS = ["new", "contacted", "closed"];

export default function LeadsAdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadLeads() {
    setLoading(true);
    const res = await fetch("/api/leads");
    const data = await res.json();
    setLeads(data.leads || []);
    setLoading(false);
  }

  useEffect(() => { loadLeads(); }, []);

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/leads/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    loadLeads();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this lead?")) return;
    await fetch(`/api/leads/${id}`, { method: "DELETE" });
    loadLeads();
  }

  const statusColor: Record<string, string> = {
    new: "text-[#E8A33D]",
    contacted: "text-[#4FB0A5]",
    closed: "text-[#A9B7C9]",
  };

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-6">Leads</h1>

      {loading ? (
        <p className="text-[#A9B7C9]">Loading...</p>
      ) : leads.length === 0 ? (
        <p className="text-[#A9B7C9]">No leads yet — they will appear here when someone submits the contact form.</p>
      ) : (
        <div className="border border-[#5B87B5]/25 rounded-sm divide-y divide-[#5B87B5]/25">
          {leads.map((lead) => (
            <div key={lead.id} className="px-6 py-4">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="font-medium">{lead.name} <span className="text-[#A9B7C9] text-sm">— {lead.email}</span></h3>
                  <p className="text-sm text-[#A9B7C9] mt-1">{lead.message}</p>
                  <p className="text-xs text-[#5B87B5] mt-2 font-[family-name:var(--font-mono)]">
                    {new Date(lead.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <select
                    value={lead.status}
                    onChange={(e) => updateStatus(lead.id, e.target.value)}
                    className={`bg-transparent border border-[#5B87B5]/40 rounded-sm px-2 py-1 text-sm ${statusColor[lead.status] || ""}`}
                  >
                    {STATUS_OPTIONS.map((s) => <option key={s} value={s} className="bg-[#0E1B2E] text-[#EDEFF2]">{s}</option>)}
                  </select>
                  <button onClick={() => handleDelete(lead.id)} className="text-sm text-red-400">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}