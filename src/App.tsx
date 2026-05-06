import { useState } from "react";
import OperatingModel from "./components/OperatingModel";
import SkillsCapabilities from "./components/SkillsCapabilities";

type View = "operating-model" | "skills-capabilities";

const TABS: { id: View; label: string }[] = [
  { id: "operating-model", label: "Operating Model" },
  { id: "skills-capabilities", label: "Skills & Capabilities" },
];

export default function App() {
  const [view, setView] = useState<View>("operating-model");

  return (
    <div className="bg-white">
      <nav
        className="border-b border-brand-tint bg-white"
        aria-label="Primary"
      >
        <div className="mx-auto flex max-w-[1400px] items-end gap-8 px-8">
          {TABS.map((tab) => {
            const active = view === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setView(tab.id)}
                aria-current={active ? "page" : undefined}
                className={`relative -mb-px border-b-2 px-1 pb-2.5 pt-4 text-[14px] transition-colors ${
                  active
                    ? "border-brand-vivid font-bold text-brand-primary"
                    : "border-transparent font-medium text-ink-muted hover:text-brand-primary"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>

      {view === "operating-model" ? <OperatingModel /> : <SkillsCapabilities />}
    </div>
  );
}
