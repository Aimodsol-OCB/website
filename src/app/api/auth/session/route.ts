// src/app/api/auth/session/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createSession, clearSession } from "@/lib/firebase/session";

export async function POST(req: NextRequest) {
  const { idToken } = await req.json();
  if (!idToken) return NextResponse.json({ error: "Missing token" }, { status: 400 });
  try {
    await createSession(idToken);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Session error:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

export async function DELETE() {
  await clearSession();
  return NextResponse.json({ success: true });
}

