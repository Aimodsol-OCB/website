// src/components/public/SocialIcons.tsx
function IconWrap({ href, children }: { href?: string; children: React.ReactNode }) {
    if (!href) return null;
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-[#5B87B5]/40 flex items-center justify-center hover:border-[#8FB8E0] transition">
        {children}
      </a>
    );
  }
  export default function SocialIcons({ links }: { links?: { facebook?: string; twitter?: string; linkedin?: string; instagram?: string } }) {
    if (!links) return null;
    return (
      <div className="flex gap-3">
        <IconWrap href={links.facebook}><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M14 9h3V6h-3a3 3 0 00-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9a1 1 0 011-1z" stroke="#8FB8E0" strokeWidth="1.3" /></svg></IconWrap>
        <IconWrap href={links.twitter}><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 4l16 16M20 4L4 20" stroke="#8FB8E0" strokeWidth="1.3" /></svg></IconWrap>
        <IconWrap href={links.linkedin}><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="#8FB8E0" strokeWidth="1.3" /><line x1="7" y1="10" x2="7" y2="17" stroke="#8FB8E0" strokeWidth="1.3" /><circle cx="7" cy="7" r="0.9" fill="#8FB8E0" /><path d="M11 17v-4a2 2 0 014 0v4" stroke="#8FB8E0" strokeWidth="1.3" /></svg></IconWrap>
        <IconWrap href={links.instagram}><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="4" stroke="#8FB8E0" strokeWidth="1.3" /><circle cx="12" cy="12" r="4" stroke="#8FB8E0" strokeWidth="1.3" /><circle cx="17.5" cy="6.5" r="0.8" fill="#8FB8E0" /></svg></IconWrap>
      </div>
    );
  }