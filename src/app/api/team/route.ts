// src/app/api/team/route.ts
import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { verifyAdmin } from "@/lib/firebase/verifyAdmin";
import { z } from "zod";

const teamSchema = z.object({
  name: z.string().min(2),
  role: z.string().min(2),
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
  order: z.number().default(0),
});

export async function GET() {
  try {
    const snapshot = await adminDb.collection("team").orderBy("order", "asc").get();
    const team = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ team });
  } catch (error) {
    console.error("GET team error:", error);
    return NextResponse.json({ error: "Failed to fetch team" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const parsed = teamSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
    const docRef = await adminDb.collection("team").add(parsed.data);
    return NextResponse.json({ id: docRef.id, ...parsed.data }, { status: 201 });
  } catch (error) {
    console.error("POST team error:", error);
    return NextResponse.json({ error: "Failed to create team member" }, { status: 500 });
  }
}