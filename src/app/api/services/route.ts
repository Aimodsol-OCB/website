import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { verifyAdmin } from "@/lib/firebase/verifyAdmin";
import { z } from "zod";

const serviceSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  techTags: z.array(z.string()).default([]),
  icon: z.string().optional(),
  order: z.number().default(0),
});

export async function GET() {
  try {
    const snapshot = await adminDb.collection("services").orderBy("order", "asc").get();
    const services = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ services });
  } catch (error) {
    console.error("GET services error:", error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const parsed = serviceSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
    }
    const docRef = await adminDb.collection("services").add(parsed.data);
    return NextResponse.json({ id: docRef.id, ...parsed.data }, { status: 201 });
  } catch (error) {
    console.error("POST services error:", error);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}