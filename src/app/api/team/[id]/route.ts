// src/app/api/team/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { verifyAdmin } from "@/lib/firebase/verifyAdmin";
import { z } from "zod";

const teamUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  role: z.string().min(2).optional(),
  specialization: z.string().optional(),
  photoUrl: z.string().optional(),
  experience: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  bio: z.string().optional(),
  socialLinks: z.object({
    facebook: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    instagram: z.string().optional(),
  }).optional(),
  order: z.number().optional(),
});

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const doc = await adminDb.collection("team").doc(id).get();
  if (!doc.exists) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ id: doc.id, ...doc.data() });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const parsed = teamUpdateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  await adminDb.collection("team").doc(id).update(parsed.data);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await verifyAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await adminDb.collection("team").doc(id).delete();
  return NextResponse.json({ success: true });
}