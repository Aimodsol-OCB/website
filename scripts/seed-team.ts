// scripts/seed-team.ts
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
  {
    name: "Muhammad Nauman Shigri",
    role: "Founder & Lead Architect",
    specialization: "Node.js, NestJS, React, Next.js, PostgreSQL, MongoDB",
    photoUrl: "", experience: "8+ years", email: "", phone: "",
    bio: "Leads full-stack architecture across Digiflow's projects — from data governance platforms to SaaS products. Specializes in modular monolith and microservice design, with hands-on ownership from database schema to production deployment.",
    socialLinks: { facebook: "", twitter: "", linkedin: "", instagram: "" },
    order: 1,
  },
  {
    name: "Jahanzaib",
    role: "Team Lead — PHP/Laravel",
    specialization: "PHP, Laravel, Blade, Livewire, Inertia.js",
    photoUrl: "", experience: "8+ years", email: "", phone: "",
    bio: "Leads backend and API development for structured business workflow applications, with a track record of delivering enterprise-scale systems across multiple client platforms.",
    socialLinks: { facebook: "", twitter: "", linkedin: "", instagram: "" },
    order: 2,
  },
  {
    name: "Ateeq ur Rehman",
    role: "Senior React Native Developer",
    specialization: "React Native, TypeScript, Web3 Integration",
    photoUrl: "", experience: "5+ years", email: "", phone: "",
    bio: "Builds cross-platform mobile applications with native-quality performance — from AI-powered apps to non-custodial crypto wallets with hardware wallet support.",
    socialLinks: { facebook: "", twitter: "", linkedin: "", instagram: "" },
    order: 3,
  },
  {
    name: "Nasir Ali",
    role: "Senior Blockchain Engineer & Smart Contract Auditor",
    specialization: "Solidity, Hardhat, Foundry, OpenZeppelin, Ethereum, Avalanche",
    photoUrl: "", experience: "8+ years", email: "", phone: "",
    bio: "Designs and audits smart contracts for real-world asset tokenization, DeFi protocols, and NFT platforms — including live mainnet deployments on Avalanche.",
    socialLinks: { facebook: "", twitter: "", linkedin: "", instagram: "" },
    order: 4,
  },
  {
    name: "Ghulam Nabi",
    role: "Zoho Developer & Automation Specialist",
    specialization: "Zoho CRM, Zoho Creator, Zoho Flow, Deluge Scripting",
    photoUrl: "", experience: "6+ years", email: "", phone: "",
    bio: "Builds end-to-end business automation — from CRM sales funnels and WhatsApp integrations to custom Zoho Creator applications for fleet, inventory, and accounting workflows.",
    socialLinks: { facebook: "", twitter: "", linkedin: "", instagram: "" },
    order: 5,
  },
];

async function seed() {
  console.log("Seeding team collection...");
  for (const member of team) {
    await db.collection("team").add(member);
    console.log(`Added: ${member.name}`);
  }
  console.log("Done.");
  process.exit(0);
}

seed().catch((err) => { console.error(err); process.exit(1); });