// src/app/admin/(protected)/services/page.tsx
"use client";
import { useEffect, useState } from "react";
import Sheet from "@/components/admin/Sheet";

type Service = { id: string; title: string; description: string; techTags: string[]; order: number };

export default function ServicesAdminPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ title: "", description: "", techTags: "", order: 0 });

  async function loadServices() {
    setLoading(true);
    const res = await fetch("/api/services");
    const data = await res.json();
    setServices(data.services || []);
    setLoading(false);
  }

  useEffect(() => { loadServices(); }, []);

  function resetForm() {
    setForm({ title: "", description: "", techTags: "", order: 0 });
    setEditingId(null);
  }

  function openAddSheet() { resetForm(); setSheetOpen(true); }

  function openEditSheet(service: Service) {
    setEditingId(service.id);
    setForm({ title: service.title, description: service.description, techTags: (service.techTags || []).join(", "), order: service.order });
    setSheetOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      title: form.title,
      description: form.description,
      techTags: form.techTags.split(",").map((t) => t.trim()).filter(Boolean),
      order: Number(form.order),
    };
    const url = editingId ? `/api/services/${editingId}` : "/api/services";
    await fetch(url, { method: editingId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    setSheetOpen(false);
    resetForm();
    loadServices();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this service?")) return;
    await fetch(`/api/services/${id}`, { method: "DELETE" });
    loadServices();
  }

  const uniqueTags = new Set(services.flatMap((s) => s.techTags || []));
  const filteredServices = services.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-6">Services</h1>

      <div className="flex flex-wrap gap-4 mb-6 justify-end">
        <div className="border border-[#5B87B5]/25 rounded-sm p-4 w-[200px] shrink-0">
          <p className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.1em] text-[#4FB0A5] mb-2">TOTAL</p>
          <p className="font-[family-name:var(--font-display)] text-2xl font-semibold">{services.length}</p>
        </div>
        <div className="border border-[#5B87B5]/25 rounded-sm p-4 w-[200px] shrink-0">
          <p className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.1em] text-[#4FB0A5] mb-2">TAGS</p>
          <p className="font-[family-name:var(--font-display)] text-2xl font-semibold">{uniqueTags.size}</p>
        </div>
      </div>

      <div className="flex justify-between items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xs px-4 py-2 bg-transparent border border-[#5B87B5]/40 rounded-sm placeholder:text-[#A9B7C9] text-sm"
        />
        <button onClick={openAddSheet} className="px-5 py-2 bg-[#E8A33D] text-[#0E1B2E] font-semibold rounded-sm hover:brightness-110 transition shrink-0">+ Add New</button>
      </div>

      {loading ? (
        <p className="text-[#A9B7C9]">Loading...</p>
      ) : filteredServices.length === 0 ? (
        <p className="text-[#A9B7C9] border border-dashed border-[#5B87B5]/30 rounded-sm px-6 py-8">
          {services.length === 0 ? 'No services yet — click "+ Add New" to create one.' : "No services match your search."}
        </p>
      ) : (
        <div className="border border-[#5B87B5]/25 rounded-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#5B87B5]/25 text-left">
                <th className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] text-[#4FB0A5] px-4 py-3">TITLE</th>
                <th className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] text-[#4FB0A5] px-4 py-3">DESCRIPTION</th>
                <th className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] text-[#4FB0A5] px-4 py-3">TAGS</th>
                <th className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] text-[#4FB0A5] px-4 py-3">ORDER</th>
                <th className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] text-[#4FB0A5] px-4 py-3 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#5B87B5]/15">
              {filteredServices.map((service) => (
                <tr key={service.id} className="hover:bg-[#5B87B5]/5">
                  <td className="px-4 py-3 font-medium whitespace-nowrap">{service.title}</td>
                  <td className="px-4 py-3 text-[#A9B7C9] max-w-xs truncate">{service.description}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {(service.techTags || []).slice(0, 3).map((tag) => (
                        <span key={tag} className="font-[family-name:var(--font-mono)] text-[9px] text-[#4FB0A5] border border-[#4FB0A5]/30 rounded-sm px-1.5 py-0.5">{tag}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#A9B7C9]">{service.order}</td>
                  <td className="px-4 py-3 text-right space-x-3 whitespace-nowrap">
                    <button onClick={() => openEditSheet(service)} className="text-[#4FB0A5] hover:underline">Edit</button>
                    <button onClick={() => handleDelete(service.id)} className="text-red-400 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Sheet open={sheetOpen} onClose={() => setSheetOpen(false)} title={editingId ? "Edit service" : "Add new service"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2 bg-transparent border border-[#5B87B5]/40 rounded-sm placeholder:text-[#A9B7C9]" required />
          <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-2 bg-transparent border border-[#5B87B5]/40 rounded-sm placeholder:text-[#A9B7C9]" rows={4} required />
          <input type="text" placeholder="Tech tags (comma separated)" value={form.techTags} onChange={(e) => setForm({ ...form, techTags: e.target.value })}
            className="w-full px-4 py-2 bg-transparent border border-[#5B87B5]/40 rounded-sm placeholder:text-[#A9B7C9]" />
          <input type="number" placeholder="Order" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
            className="w-full px-4 py-2 bg-transparent border border-[#5B87B5]/40 rounded-sm placeholder:text-[#A9B7C9]" />
          <div className="flex gap-3 pt-2">
            <button type="submit" className="px-5 py-2 bg-[#E8A33D] text-[#0E1B2E] font-semibold rounded-sm">{editingId ? "Update" : "Add"}</button>
            <button type="button" onClick={() => setSheetOpen(false)} className="px-5 py-2 border border-[#5B87B5]/40 rounded-sm text-[#A9B7C9]">Cancel</button>
          </div>
        </form>
      </Sheet>
    </div>
  );
}