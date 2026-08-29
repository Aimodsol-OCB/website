// src/components/public/getServiceIcon.tsx
import { ClientIcon, LogicIcon, LedgerIcon, InfraIcon } from "./LayerIcons";
import { MobileIcon } from "./MobileIcon";

export function getServiceIcon(title: string) {
  const t = title.toLowerCase();
  if (t.includes("mobile")) return <MobileIcon />;
  if (t.includes("blockchain") || t.includes("web3")) return <LedgerIcon />;
  if (t.includes("automation")) return <LogicIcon />;
  if (t.includes("hosting") || t.includes("maintenance")) return <InfraIcon />;
  return <ClientIcon />;
}