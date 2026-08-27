// src/lib/firebase/verifyAdmin.ts
import { NextRequest } from "next/server";
import { adminAuth } from "@/lib/firebase/admin";

export async function verifyAdmin(req: NextRequest) {
  const sessionCookie = req.cookies.get("session")?.value;
  if (!sessionCookie) return null;
  try {
    return await adminAuth.verifySessionCookie(sessionCookie, true);
  } catch {
    return null;
  }
}