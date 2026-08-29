// src/app/admin/(protected)/team/page.tsx
"use client";
import { useEffect, useState } from "react";
import Sheet from "@/components/admin/Sheet";

type TeamMember = {
  id: string; name: string; role: string; specialization: string; photoUrl: string; order: number;
  experience?: string; email?: string; phone?: string; bio?: string;
  socialLinks?: { facebook?: string; twitter?: string; linkedin?: string; instagram?: string };
};

const emptyForm = {
  name: "", role: "", specialization: "", photoUrl: "", experience: "", email: "", phone: "", bio: "", order: 0,
  facebook: "", twitter: "", linkedin: "", instagram: "",
};

export default function TeamAdminPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyForm);

  async function loadMembers() {
    setLoading(true);
    const res = await fetch("/api/team");
    const data = await res.json();
    setMembers(data.team || []);
    setLoading(false);
  }

  useEffect(() => { loadMembers(); }, []);

  function resetForm() { setForm(emptyForm); setEditingId(null); }
  function openAddSheet() { resetForm(); setSheetOpen(true); }

  function openEditSheet(member: TeamMember) {
    setEditingId(member.id);
    setForm({
      name: member.name, role: member.role, specialization: member.specialization || "",
      photoUrl: member.photoUrl || "", experience: member.experience || "", email: member.email || "",
      phone: member.phone || "", bio: member.bio || "", order: member.order,
      facebook: member.socialLinks?.facebook || "", twitter: member.socialLinks?.twitter || "",
      linkedin: member.socialLinks?.linkedin || "", instagram: member.socialLinks?.instagram || "",
    });
    setSheetOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      name: form.name, role: form.role, specialization: form.specialization, photoUrl: form.photoUrl,
      experience: form.experience, email: form.email, phone: form.phone, bio: form.bio, order: Number(form.order),
      socialLinks: { facebook: form.facebook, twitter: form.twitter, linkedin: form.linkedin, instagram: form.instagram },
    };
    const url = editingId ? `/api/team/${editingId}` : "/api/team";
    await fetch(url, { method: editingId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    setSheetOpen(false);
    resetForm();
    loadMembers();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this team member?")) return;
    await fetch(`/api/team/${id}`, { method: "DELETE" });
    loadMembers();
  }

  const filteredMembers = members.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()) || m.role.toLowerCase().includes(search.toLowerCase()));
  const inputClass = "w-full px-4 py-2 bg-transparent border border-[#5B87B5]/40 rounded-sm placeholder:text-[#A9B7C9]";

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-6">Team</h1>

      <div className="flex flex-wrap gap-4 mb-6 justify-end">
        <div className="border border-[#5B87B5]/25 rounded-sm p-4 w-[100px] shrink-0">
          <p className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.1em] text-[#4FB0A5] mb-2">TOTAL</p>
          <p className="font-[family-name:var(--font-display)] text-2xl font-semibold">{members.length}</p>
        </div>
      </div>

      <div className="flex justify-between items-center gap-4 mb-4">
        <input type="text" placeholder="Search team..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xs px-4 py-2 bg-transparent border border-[#5B87B5]/40 rounded-sm placeholder:text-[#A9B7C9] text-sm" />
        <button onClick={openAddSheet} className="px-5 py-2 bg-[#E8A33D] text-[#0E1B2E] font-semibold rounded-sm hover:brightness-110 transition shrink-0">+ Add New</button>
      </div>

      {loading ? (
        <p className="text-[#A9B7C9]">Loading...</p>
      ) : filteredMembers.length === 0 ? (
        <p className="text-[#A9B7C9] border border-dashed border-[#5B87B5]/30 rounded-sm px-6 py-8">No team members found.</p>
      ) : (
        <div className="border border-[#5B87B5]/25 rounded-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#5B87B5]/25 text-left">
                <th className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] text-[#4FB0A5] px-4 py-3">NAME</th>
                <th className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] text-[#4FB0A5] px-4 py-3">ROLE</th>
                <th className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] text-[#4FB0A5] px-4 py-3">EXPERIENCE</th>
                <th className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] text-[#4FB0A5] px-4 py-3">EMAIL</th>
                <th className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] text-[#4FB0A5] px-4 py-3 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#5B87B5]/15">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-[#5B87B5]/5">
                  <td className="px-4 py-3 font-medium whitespace-nowrap">{member.name}</td>
                  <td className="px-4 py-3 text-[#A9B7C9] whitespace-nowrap">{member.role}</td>
                  <td className="px-4 py-3 text-[#A9B7C9]">{member.experience || "—"}</td>
                  <td className="px-4 py-3 text-[#A9B7C9] whitespace-nowrap">{member.email || "—"}</td>
                  <td className="px-4 py-3 text-right space-x-3 whitespace-nowrap">
                    <button onClick={() => openEditSheet(member)} className="text-[#4FB0A5] hover:underline">Edit</button>
                    <button onClick={() => handleDelete(member.id)} className="text-red-400 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Sheet open={sheetOpen} onClose={() => setSheetOpen(false)} title={editingId ? "Edit member" : "Add new member"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} required />
          <input type="text" placeholder="Role (e.g. Lead Architect)" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className={inputClass} required />
          <input type="text" placeholder="Specialization" value={form.specialization} onChange={(e) => setForm({ ...form, specialization: e.target.value })} className={inputClass} />
          <input type="text" placeholder="Photo URL (ImageKit)" value={form.photoUrl} onChange={(e) => setForm({ ...form, photoUrl: e.target.value })} className={inputClass} />
          <input type="text" placeholder="Experience (e.g. 8+ years)" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} className={inputClass} />
          <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
          <input type="text" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
          <textarea placeholder="Bio / Professional Skills" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className={inputClass} rows={4} />
          <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] text-[#4FB0A5]">SOCIAL LINKS (optional)</p>
          <input type="url" placeholder="Facebook URL" value={form.facebook} onChange={(e) => setForm({ ...form, facebook: e.target.value })} className={inputClass} />
          <input type="url" placeholder="Twitter/X URL" value={form.twitter} onChange={(e) => setForm({ ...form, twitter: e.target.value })} className={inputClass} />
          <input type="url" placeholder="LinkedIn URL" value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} className={inputClass} />
          <input type="url" placeholder="Instagram URL" value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })} className={inputClass} />
          <input type="number" placeholder="Order" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className={inputClass} />
          <div className="flex gap-3 pt-2">
            <button type="submit" className="px-5 py-2 bg-[#E8A33D] text-[#0E1B2E] font-semibold rounded-sm">{editingId ? "Update" : "Add"}</button>
            <button type="button" onClick={() => setSheetOpen(false)} className="px-5 py-2 border border-[#5B87B5]/40 rounded-sm text-[#A9B7C9]">Cancel</button>
          </div>
        </form>
      </Sheet>
    </div>
  );
}