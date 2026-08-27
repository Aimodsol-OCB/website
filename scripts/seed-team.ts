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

const team = [
  { name: "Muhammad Nauman Shigri", role: "Founder & Lead Architect", specialization: "Node.js, NestJS, React, Next.js", photoUrl: "", order: 1 },
  { name: "Jahanzaib", role: "Team Lead", specialization: "PHP, Laravel", photoUrl: "", order: 2 },
  { name: "Ateeq ur Rehman", role: "Senior Engineer", specialization: "React Native, Web3", photoUrl: "", order: 3 },
  { name: "Nasir Ali", role: "Senior Blockchain Engineer", specialization: "Solidity", photoUrl: "", order: 4 },
  { name: "Ghulam Nabi", role: "Automation Specialist", specialization: "Zoho, Workflow Automation", photoUrl: "", order: 5 },
];

async function seed() {
  console.log("Seeding team collection...");
  for (const member of team) {
    const existing = await db.collection("team").where("name", "==", member.name).get();
    if (!existing.empty) {
      console.log(`Skipping ${member.name} — already exists`);
      continue;
    }
    await db.collection("team").add(member);
    console.log(`Added: ${member.name}`);
  }
  console.log("Done.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});