// src/app/admin/(protected)/portfolio/page.tsx
"use client";
import { useEffect, useState } from "react";

type PortfolioItem = {
  id: string; title: string; description: string; url: string;
  imageUrl: string; techTags: string[]; featured: boolean; order: number;
};

export default function PortfolioAdminPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      title: form.title,
      description: form.description,
      url: form.url,
      imageUrl: form.imageUrl,
      techTags: form.techTags.split(",").map((t) => t.trim()).filter(Boolean),
      featured: form.featured,
      order: Number(form.order),
    };
    const url = editingId ? `/api/portfolio/${editingId}` : "/api/portfolio";
    await fetch(url, {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    resetForm();
    loadItems();
  }

  function startEdit(item: PortfolioItem) {
    setEditingId(item.id);
    setForm({
      title: item.title, description: item.description, url: item.url || "",
      imageUrl: item.imageUrl || "", techTags: (item.techTags || []).join(", "),
      featured: item.featured || false, order: item.order,
    });
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
    loadItems();
  }

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-6">Portfolio</h1>

      <form onSubmit={handleSubmit} className="border border-[#5B87B5]/25 rounded-sm p-6 mb-8 space-y-4">
        <h2 className="font-medium">{editingId ? "Edit project" : "Add new project"}</h2>
        <input type="text" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full px-4 py-2 bg-transparent border border-[#5B87B5]/40 rounded-sm placeholder:text-[#A9B7C9]" required />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-4 py-2 bg-transparent border border-[#5B87B5]/40 rounded-sm placeholder:text-[#A9B7C9]" rows={3} required />
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
        <div className="flex gap-3">
          <button type="submit" className="px-5 py-2 bg-[#E8A33D] text-[#0E1B2E] font-semibold rounded-sm">{editingId ? "Update" : "Add"}</button>
          {editingId && <button type="button" onClick={resetForm} className="px-5 py-2 border border-[#5B87B5]/40 rounded-sm text-[#A9B7C9]">Cancel</button>}
        </div>
      </form>

      {loading ? (
        <p className="text-[#A9B7C9]">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-[#A9B7C9]">No projects yet — add one above.</p>
      ) : (
        <div className="border border-[#5B87B5]/25 rounded-sm divide-y divide-[#5B87B5]/25">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-start px-6 py-4 gap-4">
              <div>
                <h3 className="font-medium">{item.title} {item.featured && <span className="text-[#E8A33D] text-xs">★ Featured</span>}</h3>
                <p className="text-sm text-[#A9B7C9]">{item.description}</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <button onClick={() => startEdit(item)} className="text-sm text-[#4FB0A5]">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="text-sm text-red-400">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}