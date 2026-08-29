// scripts/clear-team.ts
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const app = getApps().length === 0
  ? initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    })
  : getApps()[0];

const db = getFirestore(app);

async function clearTeam() {
  console.log("Clearing team collection...");
  const snapshot = await db.collection("team").get();
  if (snapshot.empty) {
    console.log("Already empty.");
    process.exit(0);
  }
  const batch = db.batch();
  snapshot.docs.forEach((doc) => batch.delete(doc.ref));
  await batch.commit();
  console.log(`Deleted ${snapshot.size} team member(s).`);
  process.exit(0);
}

clearTeam().catch((err) => { console.error(err); process.exit(1); });