import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

function getPrivateKey(): string | undefined {
  const b64 = process.env.FIREBASE_ADMIN_PRIVATE_KEY_B64;
  if (b64) return Buffer.from(b64, "base64").toString("utf-8");
  return process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/^"|"$/g, "").replace(/\\n/g, "\n");
}

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: getPrivateKey(),
  }),
};

const app = getApps().length === 0 ? initializeApp(firebaseAdminConfig) : getApps()[0];
export const adminDb = getFirestore(app);
export const adminAuth = getAuth(app);