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

const services = [
  {
    title: "Full-Stack Web Development",
    description: "End-to-end web application development — from database architecture to pixel-perfect frontends. Modular, maintainable systems built to scale.",
    techTags: ["Node.js", "NestJS", "Next.js", "React", "TypeScript", "PostgreSQL", "MongoDB"],
    order: 1,
  },
  {
    title: "Mobile App Development",
    description: "Cross-platform mobile apps built with React Native, delivering native performance without the native-development overhead.",
    techTags: ["React Native", "TypeScript", "Web3 Integration"],
    order: 2,
  },
  {
    title: "Blockchain & Web3 Development",
    description: "Smart contract development, decentralized applications, and NFT platforms — built with security and gas-efficiency as first-class concerns.",
    techTags: ["Solidity", "Ethereum", "Web3.js"],
    order: 3,
  },
  {
    title: "Business Process Automation",
    description: "Automating the manual, repetitive parts of your business — from internal workflows to customer-facing processes.",
    techTags: ["Zoho Suite", "Workflow Automation", "API Integrations"],
    order: 4,
  },
  {
    title: "Hosting & Maintenance",
    description: "Tiered hosting, backup, and maintenance packages so your product stays online, secure, and up to date.",
    techTags: ["VPS Hosting", "Automated Backups", "Maintenance Tiers"],
    order: 5,
  },
];

async function seed() {
  console.log("Seeding services collection...");
  for (const service of services) {
    const existing = await db.collection("services").where("title", "==", service.title).get();
    if (!existing.empty) {
      console.log(`Skipping ${service.title} — already exists`);
      continue;
    }
    await db.collection("services").add(service);
    console.log(`Added: ${service.title}`);
  }
  console.log("Done.");
  process.exit(0);
}

seed().catch((err) => { console.error(err); process.exit(1); });