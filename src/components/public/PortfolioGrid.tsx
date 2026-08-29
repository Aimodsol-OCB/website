"use client";
import { useState, useMemo } from "react";
import ProjectPlaceholder from "./ProjectPlaceholder";

type PortfolioItem = { id: string; title: string; description: string; url?: string; imageUrl?: string; techTags?: string[] };

const CATEGORY_RULES: { label: string; keywords: string[] }[] = [
  { label: "Web", keywords: ["next.js", "react", "vue", "laravel", "php", "node.js", "nestjs", "express", "nextjs"] },
  { label: "App", keywords: ["react native", "flutter", "mobile", "ios", "android", "swift", "kotlin"] },
  { label: "Blockchain", keywords: ["solidity", "web3", "ethereum", "nft", "avalanche", "hardhat", "smart contract"] },
  { label: "Automation", keywords: ["zoho", "automation", "workflow", "crm"] },
];

function getCategories(techTags: string[] = []): string[] {
  const lower = techTags.map((t) => t.toLowerCase());
  return CATEGORY_RULES.filter((rule) => rule.keywords.some((kw) => lower.some((tag) => tag.includes(kw)))).map((rule) => rule.label);
}

function TagIcon() {
  return (<svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20.6 12.6L12.6 4.6a2 2 0 00-1.4-.6H5a1 1 0 00-1 1v6.2a2 2 0 00.6 1.4l8 8a2 2 0 002.8 0l5.2-5.2a2 2 0 000-2.8z" stroke="#4FB0A5" strokeWidth="1.4" /><circle cx="8" cy="8" r="1" fill="#4FB0A5" /></svg>);
}

export default function PortfolioGrid({ projects }: { projects: PortfolioItem[] }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const projectsWithCategories = useMemo(
    () => projects.map((p) => ({ ...p, categories: getCategories(p.techTags) })),
    [projects]
  );

  const availableCategories = useMemo(() => {
    const set = new Set<string>();
    projectsWithCategories.forEach((p) => p.categories.forEach((c) => set.add(c)));
    return CATEGORY_RULES.map((r) => r.label).filter((label) => set.has(label));
  }, [projectsWithCategories]);

  const filtered = activeCategory ? projectsWithCategories.filter((p) => p.categories.includes(activeCategory)) : projectsWithCategories;

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 mb-14 border border-[#5B87B5]/25 rounded-sm p-2 max-w-fit mx-auto">
        <button onClick={() => setActiveCategory(null)}
          className={`font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] px-4 py-2 rounded-sm transition ${activeCategory === null ? "bg-[#E8A33D] text-[#0E1B2E]" : "text-[#A9B7C9] hover:text-[#EDEFF2]"}`}>
          SEE ALL
        </button>
        {availableCategories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em] px-4 py-2 rounded-sm transition uppercase ${activeCategory === cat ? "bg-[#E8A33D] text-[#0E1B2E]" : "text-[#A9B7C9] hover:text-[#EDEFF2]"}`}>
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-[#A9B7C9] text-sm border border-dashed border-[#5B87B5]/30 rounded-sm px-6 py-8 text-center">No projects match this filter.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((project, idx) => (
            <a key={project.id} href={project.url || "#"} target={project.url ? "_blank" : undefined} rel="noopener noreferrer"
              className="border border-[#5B87B5]/25 rounded-sm overflow-hidden hover:border-[#8FB8E0] transition block">
              {project.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={project.imageUrl} alt={project.title} className="w-full aspect-video object-cover" />
              ) : (
                <ProjectPlaceholder index={idx} />
              )}
              <div className="p-6">
                {project.categories.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-3">
                    {project.categories.map((cat) => (
                      <span key={cat} className="flex items-center gap-1.5 text-xs text-[#A9B7C9]"><TagIcon />{cat}</span>
                    ))}
                  </div>
                )}
                <h3 className="font-[family-name:var(--font-display)] font-semibold text-lg leading-snug">{project.title}</h3>
                <p className="text-[#A9B7C9] text-sm mt-2">{project.description}</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}