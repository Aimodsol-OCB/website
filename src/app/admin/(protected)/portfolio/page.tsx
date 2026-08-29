// src/app/admin/(protected)/portfolio/page.tsx
"use client";
import { useEffect, useState } from "react";
import Sheet from "@/components/admin/Sheet";

type PortfolioItem = { id: string; title: string; description: string; url: string; imageUrl: string; techTags: string[]; featured: boolean; order: number };

export default function PortfolioAdminPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ title: "", description: "", url: "", imageUrl: "", techTags: "", featured: false, order: 0 });

  async function loadItems() {
    setLoading(true);
    const res = await fetch("/api/portfolio");
    const data = await res.json();
    setItems(data.portfolio || data.services || []);
    setLoading(false);
  }

  useEffect(() => { loadItems(); }, []);

  function resetForm() {
    setForm({ title: "", description: "", url: "", imageUrl: "", techTags: "", featured: false, order: 0 });
    setEditingId(null);
  }

  function openAddSheet() { resetForm(); setSheetOpen(true); }

  function openEditSheet(item: PortfolioItem) {
    setEditingId(item.id);
    setForm({ title: item.title, description: item.description, url: item.url || "", imageUrl: item.imageUrl || "", techTags: (item.techTags || []).join(", "), featured: item.featured || false, order: item.order });
    setSheetOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      title: form.title, description: form.description, url: form.url, imageUrl: form.imageUrl,
      techTags: form.techTags.split(",").map((t) => t.trim()).filter(Boolean),
      featured: form.featured, order: Number(form.order),
    };
    const url = editingId ? `/api/portfolio/${editingId}` : "/api/portfolio";
    await fetch(url, { method: editingId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    setSheetOpen(false);
    resetForm();
    loadItems();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
    loadItems();
  }

  const uniqueTags = new Set(items.flatMap((i) => i.techTags || []));
  const featuredCount = items.filter((i) => i.featured).length;
  const filteredItems = items.filter((i) => i.title.toLowerCase().includes(search.toLowerCase()) || i.description.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-6">Portfolio</h1>

      <div className="flex flex-wrap gap-4 mb-6 justify-end">
        <div className="border border-[#5B87B5]/25 rounded-sm p-4 w-[100px] shrink-0">
          <p className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.1em] text-[#4FB0A5] mb-2">TOTAL</p>
          <p className="font-[family-name:var(--font-display)] text-2xl font-semibold">{items.length}</p>
        </div>
        <div className="border border-[#5B87B5]/25 rounded-sm p-4 w-[100px] shrink-0">
          <p className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.1em] text-[#4FB0A5] mb-2">FEATURED</p>
          <p className="font-[family-name:var(--font-display)] text-2xl font-semibold">{featuredCount}</p>
        </div>
        <div className="border border-[#5B87B5]/25 rounded-sm p-4 w-[100px] shrink-0">
          <p className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.1em] text-[#4FB0A5] mb-2">TAGS</p>
          <p className="font-[family-name:var(--font-display)] text-2xl font-semibold">{uniqueTags.size}</p>
        </div>
      </div>

      <div className="flex justify-between items-center gap-4 mb-4">
        <input type="text" placeholder="Search projects..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xs px-4 py-2 bg-transparent border border-[#5B87B5]/40 rounded-sm placeholder:text-[#A9B7C9] text-sm" />
        <button onClick={openAddSheet} className="px-5 py-2 bg-[#E8A33D] text-[#0E1B2E] font-semibold rounded-sm hover:brightness-110 transition shrink-0">+ Add New</button>
      </div>

      {loading ? (
        <p className="text-[#A9B7C9]">Loading...</p>
      ) : filteredItems.length === 0 ? (
        <p className="text-[#A9B7C9] border border-dashed border-[#5B87B5]/30 rounded-sm px-6 py-8">
          {items.length === 0 ? 'No projects yet — click "+ Add New" to create one.' : "No projects match your search."}
        </p>
      ) : (
        <div className="border border-[#5B87B5]/25 rounded-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#5B87B5]/25 text-left">
                <th className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] text-[#4FB0A5] px-4 py-3">TITLE</th>
                <th className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] text-[#4FB0A5] px-4 py-3">DESCRIPTION</th>
                <th className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] text-[#4FB0A5] px-4 py-3">TAGS</th>
                <th className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] text-[#4FB0A5] px-4 py-3">FEATURED</th>
                <th className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] text-[#4FB0A5] px-4 py-3">ORDER</th>
                <th className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.15em] text-[#4FB0A5] px-4 py-3 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#5B87B5]/15">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-[#5B87B5]/5">
                  <td className="px-4 py-3 font-medium whitespace-nowrap">{item.title}</td>
                  <td className="px-4 py-3 text-[#A9B7C9] max-w-xs truncate">{item.description}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {(item.techTags || []).slice(0, 3).map((tag) => (
                        <span key={tag} className="font-[family-name:var(--font-mono)] text-[9px] text-[#4FB0A5] border border-[#4FB0A5]/30 rounded-sm px-1.5 py-0.5">{tag}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">{item.featured ? <span className="text-[#E8A33D] text-xs">★ Yes</span> : <span className="text-[#A9B7C9] text-xs">—</span>}</td>
                  <td className="px-4 py-3 text-[#A9B7C9]">{item.order}</td>
                  <td className="px-4 py-3 text-right space-x-3 whitespace-nowrap">
                    <button onClick={() => openEditSheet(item)} className="text-[#4FB0A5] hover:underline">Edit</button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Sheet open={sheetOpen} onClose={() => setSheetOpen(false)} title={editingId ? "Edit project" : "Add new project"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2 bg-transparent border border-[#5B87B5]/40 rounded-sm placeholder:text-[#A9B7C9]" required />
          <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-2 bg-transparent border border-[#5B87B5]/40 rounded-sm placeholder:text-[#A9B7C9]" rows={4} required />
          <input type="url" placeholder="Project URL (https://...)" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })}
            className="w-full px-4 py-2 bg-transparent border border-[#5B87B5]/40 rounded-sm placeholder:text-[#A9B7C9]" />
          <input type="text" placeholder="Image URL (ImageKit)" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="w-full px-4 py-2 bg-transparent border border-[#5B87B5]/40 rounded-sm placeholder:text-[#A9B7C9]" />
          <input type="text" placeholder="Tech tags (comma separated)" value={form.techTags} onChange={(e) => setForm({ ...form, techTags: e.target.value })}
            className="w-full px-4 py-2 bg-transparent border border-[#5B87B5]/40 rounded-sm placeholder:text-[#A9B7C9]" />
          <label className="flex items-center gap-2 text-sm text-[#A9B7C9]">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
            Featured project
          </label>
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