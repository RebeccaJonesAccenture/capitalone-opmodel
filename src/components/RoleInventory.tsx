import { useCallback, useState } from "react";
import { ROLE_CARDS, RoleModal } from "./OperatingModel";

type InventoryEntry = {
  id: string;
  eyebrow: string;
};

type InventorySection = {
  layer: "Central Core" | "Capability Pool";
  subline: string;
  entries: InventoryEntry[];
};

const SECTIONS: InventorySection[] = [
  {
    layer: "Central Core",
    subline:
      "Strategic roles that own enterprise direction, governance, and standards.",
    entries: [
      { id: "head-of-learning", eyebrow: "Strategy & Governance" },
      {
        id: "senior-learning-strategist",
        eyebrow: "Intake · Enterprise Standards · Advisory",
      },
      { id: "learning-analytics-lead", eyebrow: "Measurement & Analytics" },
      { id: "learning-analyst", eyebrow: "Measurement & Analytics" },
      { id: "learning-innovation-lead", eyebrow: "Learning Innovation" },
      { id: "ai-learning-strategist", eyebrow: "Learning Innovation" },
    ],
  },
  {
    layer: "Capability Pool",
    subline:
      "Specialist and execution roles deployed flexibly across the operating model.",
    entries: [
      { id: "learning-strategist", eyebrow: "Learning Strategy" },
      {
        id: "learning-engineer",
        eyebrow: "Learning Design & Development Engineering",
      },
      {
        id: "curriculum-designer",
        eyebrow: "Learning Design & Development Engineering",
      },
      {
        id: "ai-content-architect",
        eyebrow: "Learning Design & Development Engineering",
      },
      { id: "knowledge-architect", eyebrow: "Knowledge Management" },
      { id: "knowledge-editor", eyebrow: "Knowledge Management" },
      {
        id: "content-lifecycle-specialist",
        eyebrow: "Knowledge Management",
      },
      { id: "facilitator-coach", eyebrow: "Delivery" },
    ],
  },
];

// Take the first 1–2 sentences of a description for the card preview.
// Treats a sentence boundary as period + space + capital letter, which avoids
// splitting on abbreviations like "e.g." that are followed by lowercase text.
function getPreview(desc: string): string {
  const sentenceEnds: number[] = [];
  for (let i = 0; i < desc.length - 2; i++) {
    if (
      desc[i] === "." &&
      desc[i + 1] === " " &&
      /[A-Z]/.test(desc[i + 2])
    ) {
      sentenceEnds.push(i + 1);
    }
  }
  const oneSentence =
    sentenceEnds[0] != null ? desc.slice(0, sentenceEnds[0]).trim() : desc;
  const twoSentences =
    sentenceEnds[1] != null ? desc.slice(0, sentenceEnds[1]).trim() : "";
  if (twoSentences && twoSentences.length <= 320) return twoSentences;
  return oneSentence;
}

type CardProps = {
  entry: InventoryEntry;
  onOpen: (id: string) => void;
};

function RoleInventoryCard({ entry, onOpen }: CardProps) {
  const data = ROLE_CARDS[entry.id];
  if (!data) return null;
  const preview = getPreview(data.description);

  return (
    <button
      type="button"
      onClick={() => onOpen(entry.id)}
      className="group flex h-full flex-col rounded-card border border-brand-tint bg-white p-5 text-left shadow-card transition-all hover:-translate-y-0.5 hover:border-brand-vivid hover:shadow-cardHover focus-visible:border-brand-vivid"
      aria-label={`Open role card for ${data.title}`}
    >
      <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-lavender">
        {entry.eyebrow}
      </div>
      <h3 className="mt-2 text-[18px] font-bold leading-tight text-brand-vivid">
        {data.title}
      </h3>
      <p className="mt-3 flex-1 text-[13px] leading-relaxed text-ink-body">
        {preview}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold text-brand-vivid">
        View full role card
        <span
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-0.5"
        >
          →
        </span>
      </span>
    </button>
  );
}

export default function RoleInventory() {
  const [activeRoleId, setActiveRoleId] = useState<string | null>(null);

  const openRole = useCallback((roleId: string) => {
    if (ROLE_CARDS[roleId]) setActiveRoleId(roleId);
  }, []);
  const closeRole = useCallback(() => setActiveRoleId(null), []);
  const activeRole = activeRoleId ? ROLE_CARDS[activeRoleId] : null;

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1400px] px-8 py-8">
        <header className="mb-8 border-b border-brand-tint pb-5">
          <h1 className="text-[26px] font-black leading-tight tracking-tight text-ink-body">
            Role Inventory
          </h1>
          <p className="mt-2 max-w-[920px] text-[13px] leading-relaxed text-ink-muted">
            Every role in the Learning &amp; Knowledge Management operating
            model — grouped by layer. Click any role to open the full role
            card.
          </p>
        </header>

        {SECTIONS.map((section) => (
          <section key={section.layer} className="mb-12">
            <div className="mb-5">
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-vivid">
                {section.layer}
              </div>
              <p className="mt-1 text-[13px] italic text-ink-muted">
                {section.subline}
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {section.entries.map((entry) => (
                <RoleInventoryCard
                  key={entry.id}
                  entry={entry}
                  onOpen={openRole}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {activeRole && <RoleModal role={activeRole} onClose={closeRole} />}
    </div>
  );
}
