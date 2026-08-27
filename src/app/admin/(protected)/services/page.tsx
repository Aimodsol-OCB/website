// src/app/admin/(protected)/services/page.tsx
"use client";
import { useEffect, useState } from "react";

type Service = { id: string; title: string; description: string; techTags: string[]; order: number };

export default function ServicesAdminPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      title: form.title,
      description: form.description,
      techTags: form.techTags.split(",").map((t) => t.trim()).filter(Boolean),
      order: Number(form.order),
    };
    const url = editingId ? `/api/services/${editingId}` : "/api/services";
    await fetch(url, {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    resetForm();
    loadServices();
  }

  function startEdit(service: Service) {
    setEditingId(service.id);
    setForm({ title: service.title, description: service.description, techTags: (service.techTags || []).join(", "), order: service.order });
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this service?")) return;
    await fetch(`/api/services/${id}`, { method: "DELETE" });
    loadServices();
  }

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold mb-6">Services</h1>

      <form onSubmit={handleSubmit} className="border border-[#5B87B5]/25 rounded-sm p-6 mb-8 space-y-4">
        <h2 className="font-medium">{editingId ? "Edit service" : "Add new service"}</h2>
        <input type="text" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full px-4 py-2 bg-transparent border border-[#5B87B5]/40 rounded-sm placeholder:text-[#A9B7C9]" required />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-4 py-2 bg-transparent border border-[#5B87B5]/40 rounded-sm placeholder:text-[#A9B7C9]" rows={3} required />
        <input type="text" placeholder="Tech tags (comma separated)" value={form.techTags} onChange={(e) => setForm({ ...form, techTags: e.target.value })}
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
      ) : services.length === 0 ? (
        <p className="text-[#A9B7C9]">No services yet — add one above.</p>
      ) : (
        <div className="border border-[#5B87B5]/25 rounded-sm divide-y divide-[#5B87B5]/25">
          {services.map((service) => (
            <div key={service.id} className="flex justify-between items-start px-6 py-4 gap-4">
              <div>
                <h3 className="font-medium">{service.title}</h3>
                <p className="text-sm text-[#A9B7C9]">{service.description}</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <button onClick={() => startEdit(service)} className="text-sm text-[#4FB0A5]">Edit</button>
                <button onClick={() => handleDelete(service.id)} className="text-sm text-red-400">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}