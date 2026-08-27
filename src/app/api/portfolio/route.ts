import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { verifyAdmin } from "@/lib/firebase/verifyAdmin";
import { z } from "zod";

const portfolioSchema = z.object({
    title: z.string().min(2),
    description: z.string().min(10),
    url: z.string().url().optional(),
    imageUrl: z.string().optional(),
    techTags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  });

export async function GET() {
  try {
    const snapshot = await adminDb.collection("portfolio").orderBy("order", "asc").get();
    const portfolio = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ portfolio });
  } catch (error) {
    console.error("GET portfolio error:", error);
    return NextResponse.json({ error: "Failed to fetch portfolio" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = await verifyAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const parsed = portfolioSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
    }
    const docRef = await adminDb.collection("portfolio").add(parsed.data);
    return NextResponse.json({ id: docRef.id, ...parsed.data }, { status: 201 });
  } catch (error) {
    console.error("POST portfolio error:", error);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}