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

const portfolio = [
  { title: "Governata", description: "Enterprise data governance platform for Saudi clients — data classification, catalog, metadata management, and lineage tracking.", url: "https://governata.com", techTags: ["Node.js", "NestJS", "PostgreSQL"], featured: true, order: 1 },
  { title: "PMS Dubai", description: "Property management SaaS for a Dubai real estate client — full tenant, contract, and maintenance workflow system.", techTags: ["NestJS", "Drizzle ORM", "PostgreSQL", "React"], featured: true, order: 2 },
  { title: "Docformer", description: "Subscription SaaS automating teacher result processing — marksheet uploads, PDF/XLSX report generation, billing.", techTags: ["NestJS", "Drizzle ORM", "PostgreSQL"], featured: true, order: 3 },
  { title: "AI-Powered Exam System", description: "AI-driven exam platform with MCQ generation, anti-cheat delivery, and automated grading.", techTags: ["AI/LLM"], featured: false, order: 4 },
  { title: "Vorbit", description: "Website and blockchain product delivery platform.", url: "https://vorbit.org", techTags: ["Next.js", "Solidity"], featured: false, order: 5 },
  { title: "Algocoder", description: "Website and blockchain product & services delivery practice.", url: "https://algocoder.org", techTags: ["Next.js", "Solidity"], featured: false, order: 6 },
  { title: "Vorbit NFT Marketplace", description: "NFT minting and marketplace platform built ground-up, including smart contracts.", url: "https://nft.vorbit.org", techTags: ["Solidity", "Web3.js"], featured: true, order: 7 },
  { title: "Air Apple Cart", description: "Ticketing and grievance management modules for an institutional platform.", techTags: [], featured: false, order: 8 },
  { title: "Student Help Squad", description: "Student internship and hostel management modules for an educational platform.", techTags: [], featured: false, order: 9 },
  { title: "Crypto Wallet Platform", description: "Backend and admin dashboard for a crypto wallet product.", techTags: ["Node.js"], featured: false, order: 10 },
  { title: "Roller Coaster Metaverse", description: "Virtual classroom, shopping mall, and park modules for a metaverse platform.", techTags: [], featured: false, order: 11 },
  { title: "Blockchain-Based E-commerce Platform", description: "Full backend and frontend for a blockchain-integrated e-commerce platform.", techTags: ["Solidity"], featured: false, order: 12 },
  { title: "Florist E-commerce Application", description: "Complete backend for a florist e-commerce application.", techTags: [], featured: false, order: 13 },
  { title: "Hugabu", description: "3D product customization e-commerce experience with interactive pillow rotation and animated storefront.", techTags: ["Next.js", "Framer Motion"], featured: true, order: 14 },
  { title: "Ronove", description: "Business workflow application — full backend and API development.", techTags: ["PHP", "Laravel"], featured: false, order: 15 },
  { title: "Origin8", description: "Custom application workflows and management platform.", techTags: ["PHP", "Laravel"], featured: false, order: 16 },
  { title: "New Meridians", description: "Structured workflow business application.", techTags: ["PHP", "Laravel"], featured: false, order: 17 },
  { title: "NUPCO", description: "Large-scale enterprise backend system.", techTags: ["PHP", "Laravel"], featured: false, order: 18 },
  { title: "Joni", description: "AI app connecting multiple AI models with built-in agents.", techTags: ["React Native", "AI"], featured: false, order: 19 },
  { title: "DAU Vault", description: "Non-custodial, multi-chain crypto wallet with hardware wallet support.", techTags: ["React Native", "Web3"], featured: true, order: 20 },
  { title: "Digital Will", description: "Mobile app with UI, API integration, push notifications, and monitoring.", techTags: ["React Native"], featured: false, order: 21 },
  { title: "AKRU", description: "Real-world asset tokenization platform, live on Avalanche mainnet.", techTags: ["Solidity", "Avalanche"], featured: true, order: 22 },
  { title: "Normies", description: "Crypto-to-fiat payment gateway with card processing.", techTags: ["Solidity", "Payments"], featured: false, order: 23 },
  { title: "ChainGPT", description: "AI-powered blockchain platform combining LLMs with Web3 integration.", techTags: ["Solidity", "AI"], featured: false, order: 24 },
];

async function seed() {
  console.log("Seeding portfolio collection...");
  for (const item of portfolio) {
    const existing = await db.collection("portfolio").where("title", "==", item.title).get();
    if (!existing.empty) {
      console.log(`Skipping ${item.title} — already exists`);
      continue;
    }
    await db.collection("portfolio").add(item);
    console.log(`Added: ${item.title}`);
  }
  console.log("Done.");
  process.exit(0);
}

seed().catch((err) => { console.error(err); process.exit(1); });