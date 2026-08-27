// src/app/admin/(protected)/team/page.tsx
"use client";
import { useEffect, useState } from "react";

type TeamMember = { id: string; name: string; role: string; specialization: string; photoUrl: string; order: number };

export default function TeamAdminPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", role: "", specialization: "", photoUrl: "", order: 0 });

  async function loadMembers() {
    setLoading(true);
    const res = await fetch("/api/team");
    const data = await res.json();
    setMembers(data.team || data.services || []);
    setLoading(false);
  }

  useEffect(() => { loadMembers(); }, []);

  function resetForm() {
    setForm({ name: "", role: "", specialization: "", photoUrl: "", order: 0 });
    setEditingId(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { ...form, order: Number(form.order) };
    const url = editingId ? `/api/team/${editingId}` : "/api/team";
    await fetch(url, {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    resetForm();
    loadMembers();
  }

  function startEdit(member: TeamMember) {
    setEditingId(member.id);
    setForm({ name: member.name, role: member.role, specialization: member.specialization || "", photoUrl: member.photoUrl || "", order: member.order });
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this team member?")) return;
    await fetch(`/api/team/${id}`, { method: "DELETE" });
    loadMembers();
  }

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-6">Team</h1>

      <form onSubmit={handleSubmit} className="border border-[#5B87B5]/25 rounded-sm p-6 mb-8 space-y-4">
        <h2 className="font-medium">{editingId ? "Edit member" : "Add new member"}</h2>
        <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-2 bg-transparent border border-[#5B87B5]/40 rounded-sm placeholder:text-[#A9B7C9]" required />
        <input type="text" placeholder="Role (e.g. Lead Architect)" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="w-full px-4 py-2 bg-transparent border border-[#5B87B5]/40 rounded-sm placeholder:text-[#A9B7C9]" required />
        <input type="text" placeholder="Specialization (e.g. Node.js, React)" value={form.specialization} onChange={(e) => setForm({ ...form, specialization: e.target.value })}
          className="w-full px-4 py-2 bg-transparent border border-[#5B87B5]/40 rounded-sm placeholder:text-[#A9B7C9]" />
        <input type="text" placeholder="Photo URL (ImageKit)" value={form.photoUrl} onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
          className="w-full px-4 py-2 bg-transparent border border-[#5B87B5]/40 rounded-sm placeholder:text-[#A9B7C9]" />
        <input type="number" placeholder="Order" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
          className="w-full px-4 py-2 bg-transparent border border-[#5B87B5]/40 rounded-sm placeholder:text-[#A9B7C9]" />
        <div className="flex gap-3">
          <button type="submit" className="px-5 py-2 bg-[#E8A33D] text-[#0E1B2E] font-semibold rounded-sm">{editingId ? "Update" : "Add"}</button>
          {editingId && <button type="button" onClick={resetForm} className="px-5 py-2 border border-[#5B87B5]/40 rounded-sm text-[#A9B7C9]">Cancel</button>}
        </div>
      </form>

      {loading ? (
        <p className="text-[#A9B7C9]">Loading...</p>
      ) : members.length === 0 ? (
        <p className="text-[#A9B7C9]">No team members yet — add one above.</p>
      ) : (
        <div className="border border-[#5B87B5]/25 rounded-sm divide-y divide-[#5B87B5]/25">
          {members.map((member) => (
            <div key={member.id} className="flex justify-between items-start px-6 py-4 gap-4">
              <div>
                <h3 className="font-medium">{member.name} — <span className="text-[#A9B7C9] text-sm">{member.role}</span></h3>
                <p className="text-sm text-[#A9B7C9]">{member.specialization}</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <button onClick={() => startEdit(member)} className="text-sm text-[#4FB0A5]">Edit</button>
                <button onClick={() => handleDelete(member.id)} className="text-sm text-red-400">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}