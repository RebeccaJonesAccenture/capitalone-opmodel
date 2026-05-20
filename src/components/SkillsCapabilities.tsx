import { useCallback, useState } from "react";
import { ROLE_CARDS, RoleModal } from "./OperatingModel";

type Proficiency = "H" | "M" | "L";

type FrameworkSkill = {
  name: string;
  description: string;
};

type FrameworkTier = {
  number: 1 | 2 | 3;
  heading: string;
  subheading: string;
  accent: "primary" | "medium" | "vivid";
  skills: FrameworkSkill[];
};

const FRAMEWORK: FrameworkTier[] = [
  {
    number: 1,
    heading: "ANCHORING",
    subheading:
      "Holds the function steady — without these, nothing else works",
    accent: "primary",
    skills: [
      {
        name: "Performance Enablement & Business Alignment",
        description: "Translate strategy into measurable capability outcomes",
      },
      {
        name: "Risk & Compliance Fluency",
        description: "Embed regulatory requirements; govern AI risk",
      },
      {
        name: "Systems Thinking",
        description: "Connect learning, knowledge, technology, and process",
      },
      {
        name: "Knowledge Management & Content Systems",
        description: "Design for findability and real-time application",
      },
      {
        name: "Data-Driven Decision Making",
        description: "Link investments to measurable business outcomes",
      },
      {
        name: "Stakeholder Influence & Navigation",
        description: "Shift from training requests to performance solutions",
      },
    ],
  },
  {
    number: 2,
    heading: "DIFFERENTIATING",
    subheading: "What makes the function modern",
    accent: "medium",
    skills: [
      {
        name: "Workflow-Embedded Experience Design",
        description: "Embed learning into day-to-day tools and workflow",
      },
      {
        name: "Content Architecture & Modular Design",
        description:
          "Modular, reusable content systems, not standalone assets",
      },
      {
        name: "Learner Experience Transformation",
        description:
          "Shift from courses to continuous, role-relevant capability building",
      },
      {
        name: "Experimentation & Innovation at Scale",
        description: "Pilot, iterate on data, scale what works",
      },
      {
        name: "Capability Modeling & Skill Progression",
        description:
          "Define how capabilities develop over time and across roles",
      },
    ],
  },
  {
    number: 3,
    heading: "NEW & EMERGING",
    subheading: "Where the function is heading next",
    accent: "vivid",
    skills: [
      {
        name: "AI-Enabled Learning & Knowledge",
        description:
          "Apply AI to personalize learning; validate AI-generated content",
      },
      {
        name: "AI-Augmented Content Creation",
        description:
          "Use generative AI to scale content while maintaining quality",
      },
      {
        name: "Digital & Platform Fluency",
        description: "Work across learning, knowledge, and AI platforms",
      },
      {
        name: "Stakeholder Communication & Data Storytelling",
        description: "Translate performance data into actionable insights",
      },
    ],
  },
];

type RoleColumn = { id: string; label: string };

const ROLE_COLUMNS: RoleColumn[] = [
  { id: "head-of-learning", label: "Head of Learning" },
  { id: "senior-learning-strategist", label: "Sr Learning Strategist" },
  { id: "learning-strategist", label: "Learning Strategist" },
  { id: "learning-engineer", label: "Learning Engineer" },
  { id: "curriculum-designer", label: "Curriculum Designer" },
  { id: "learning-analytics-lead", label: "Learning Analytics Lead" },
  { id: "learning-analyst", label: "Learning Analyst" },
  { id: "learning-innovation-lead", label: "Learning Innovation Lead" },
  { id: "ai-learning-strategist", label: "AI Learning Strategist" },
  { id: "ai-content-architect", label: "AI Content Architect" },
  { id: "knowledge-architect", label: "Knowledge Architect" },
  { id: "knowledge-editor", label: "Knowledge Editor" },
  { id: "content-lifecycle-specialist", label: "Content Lifecycle Specialist" },
  { id: "facilitator-coach", label: "Facilitator / Coach" },
];

type HeatmapRow = {
  skill: string;
  ratings: Proficiency[];
};

type HeatmapTier = {
  label: string;
  rows: HeatmapRow[];
};

const HEATMAP: HeatmapTier[] = [
  {
    label: "TIER 1 · ANCHORING",
    rows: [
      {
        skill: "Performance Consulting",
        ratings: [
          "H", "H", "M", "L", "M", "M", "L", "M", "M", "L", "L", "L", "L", "M",
        ],
      },
      {
        skill: "Risk & Compliance",
        ratings: [
          "H", "H", "M", "M", "M", "M", "M", "M", "M", "H", "H", "H", "H", "M",
        ],
      },
      {
        skill: "Systems Thinking",
        ratings: [
          "H", "H", "M", "M", "M", "H", "M", "H", "H", "M", "H", "M", "M", "M",
        ],
      },
      {
        skill: "Knowledge Management",
        ratings: [
          "H", "H", "M", "M", "M", "M", "L", "M", "M", "H", "H", "H", "H", "M",
        ],
      },
      {
        skill: "Data & Measurement",
        ratings: [
          "H", "H", "M", "M", "L", "H", "H", "M", "M", "L", "L", "L", "M", "L",
        ],
      },
      {
        skill: "Stakeholder Influence",
        ratings: [
          "H", "H", "M", "M", "M", "M", "L", "H", "M", "M", "M", "L", "M", "M",
        ],
      },
      {
        skill: "Business & Ops Acumen",
        ratings: [
          "H", "H", "M", "M", "M", "M", "M", "M", "M", "M", "H", "M", "M", "H",
        ],
      },
    ],
  },
  {
    label: "TIER 2 · DIFFERENTIATING",
    rows: [
      {
        skill: "Workflow Integration",
        ratings: [
          "H", "H", "M", "H", "M", "M", "L", "M", "M", "M", "H", "M", "M", "H",
        ],
      },
      {
        skill: "Content Architecture",
        ratings: [
          "M", "L", "L", "M", "M", "L", "L", "M", "M", "H", "H", "M", "H", "L",
        ],
      },
      {
        skill: "Learning Experience Design",
        ratings: [
          "M", "M", "M", "H", "H", "L", "L", "M", "M", "M", "L", "L", "L", "H",
        ],
      },
      {
        skill: "Curriculum Architecture",
        ratings: [
          "M", "M", "L", "L", "H", "L", "L", "L", "L", "L", "L", "L", "L", "M",
        ],
      },
      {
        skill: "Learner Experience Transformation",
        ratings: [
          "M", "M", "M", "H", "H", "L", "L", "M", "H", "M", "L", "L", "L", "H",
        ],
      },
    ],
  },
  {
    label: "TIER 3 · NEW & EMERGING",
    rows: [
      {
        skill: "AI / Emerging Tech",
        ratings: [
          "H", "M", "L", "M", "L", "M", "L", "H", "H", "H", "M", "L", "L", "M",
        ],
      },
      {
        skill: "Experimentation & Innovation",
        ratings: [
          "M", "M", "L", "M", "L", "L", "L", "H", "H", "H", "M", "L", "L", "M",
        ],
      },
      {
        skill: "Digital & Platform Fluency",
        ratings: [
          "M", "M", "M", "H", "M", "M", "M", "H", "H", "H", "H", "H", "H", "M",
        ],
      },
      {
        skill: "Stakeholder Communication & Data Storytelling",
        ratings: [
          "H", "H", "M", "M", "M", "H", "H", "M", "M", "M", "M", "L", "M", "H",
        ],
      },
    ],
  },
];

const FOCUS_PRIORITIES: string[] = [
  "Performance consulting + data fluency",
  "Knowledge & systems thinking",
  "Workflow integration",
  "AI + content architecture",
];

const PROFICIENCY_LABEL: Record<Proficiency, string> = {
  H: "High",
  M: "Medium",
  L: "Low",
};

const accentTextClass: Record<FrameworkTier["accent"], string> = {
  primary: "text-brand-primary",
  medium: "text-brand-medium",
  vivid: "text-brand-vivid",
};

function cellClasses(rating: Proficiency): string {
  switch (rating) {
    case "H":
      return "bg-brand-primary text-white";
    case "M":
      return "bg-brand-lavender text-ink-body";
    case "L":
      return "bg-brand-bg text-ink-muted";
  }
}

export default function SkillsCapabilities() {
  const [activeRoleId, setActiveRoleId] = useState<string | null>(null);

  const openRole = useCallback((roleId: string) => {
    if (ROLE_CARDS[roleId]) setActiveRoleId(roleId);
  }, []);
  const closeRole = useCallback(() => setActiveRoleId(null), []);
  const activeRole = activeRoleId ? ROLE_CARDS[activeRoleId] : null;

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1400px] px-8 py-8">
        {/* Page header */}
        <header className="mb-8 border-b border-brand-tint pb-5">
          <h1 className="text-[26px] font-bold leading-tight tracking-tight text-brand-primary">
            Skills &amp; Capabilities Behind the Model
          </h1>
          <p className="mt-2 max-w-[920px] text-[14px] leading-relaxed text-ink-muted">
            The capabilities required to run a modern Learning and Knowledge
            Management function — across every role in the operating model.
          </p>
        </header>

        {/* Section 1: Three-Tier Framework */}
        <section className="mb-12 grid gap-6 lg:grid-cols-3">
          {FRAMEWORK.map((tier) => (
            <div
              key={tier.number}
              className="flex flex-col rounded-card border border-brand-tint bg-white p-6 shadow-card"
            >
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-vivid">
                Tier {tier.number}
              </div>
              <h2 className="mt-1 text-[22px] font-extrabold uppercase leading-tight tracking-tight text-ink-body">
                {tier.heading}
              </h2>
              <p className="mt-1 text-[12.5px] italic text-ink-muted">
                {tier.subheading}
              </p>
              <ul className="mt-5 space-y-4">
                {tier.skills.map((skill) => (
                  <li key={skill.name}>
                    <div
                      className={`text-[13.5px] font-bold leading-snug ${accentTextClass[tier.accent]}`}
                    >
                      {skill.name}
                    </div>
                    <div className="mt-0.5 text-[12.5px] leading-snug text-ink-body">
                      {skill.description}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Section 2: Heatmap */}
        <section className="mb-12">
          <div className="mb-5">
            <h2 className="text-[20px] font-bold leading-tight tracking-tight text-brand-primary">
              Skills &amp; Capabilities by Role
            </h2>
            <p className="mt-1 max-w-[920px] text-[13px] leading-relaxed text-ink-muted">
              Required proficiency by role across the anchoring,
              differentiating, and new &amp; emerging skills behind the
              operating model.
            </p>
          </div>

          <div className="overflow-x-auto">
            <div
              className="min-w-[1100px] rounded-card border border-brand-tint bg-white shadow-card"
              role="table"
              aria-label="Skills and capabilities heatmap by role"
            >
              {/* Column headers (role names) */}
              <div
                className="grid border-b border-brand-tint"
                style={{
                  gridTemplateColumns:
                    "220px repeat(14, minmax(0, 1fr))",
                }}
                role="row"
              >
                <div
                  className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-ink-muted"
                  role="columnheader"
                >
                  Skill
                </div>
                {ROLE_COLUMNS.map((role) => {
                  const hasCard = !!ROLE_CARDS[role.id];
                  return (
                    <div
                      key={role.id}
                      role="columnheader"
                      className="border-l border-brand-tint p-1"
                    >
                      {hasCard ? (
                        <button
                          type="button"
                          onClick={() => openRole(role.id)}
                          className="block h-full w-full whitespace-normal break-words rounded px-1 py-1.5 text-center text-[10px] font-semibold leading-tight text-brand-primary transition-colors hover:bg-brand-bg hover:text-brand-vivid focus-visible:bg-brand-bg"
                        >
                          {role.label}
                        </button>
                      ) : (
                        <span className="block whitespace-normal break-words px-1 py-1.5 text-center text-[10px] font-semibold leading-tight text-ink-body">
                          {role.label}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Tier groups */}
              {HEATMAP.map((tier, tierIdx) => (
                <div
                  key={tier.label}
                  className={tierIdx > 0 ? "border-t border-brand-tint" : ""}
                >
                  <div
                    className="bg-brand-bg px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-primary"
                    role="rowgroup"
                  >
                    {tier.label}
                  </div>
                  {tier.rows.map((row) => (
                    <div
                      key={row.skill}
                      className="grid border-t border-brand-tint"
                      style={{
                        gridTemplateColumns:
                          "220px repeat(14, minmax(0, 1fr))",
                      }}
                      role="row"
                    >
                      <div
                        className="flex items-center px-3 py-1.5 text-[12px] font-medium text-ink-body"
                        role="rowheader"
                      >
                        {row.skill}
                      </div>
                      {row.ratings.map((rating, colIdx) => {
                        const role = ROLE_COLUMNS[colIdx];
                        const tooltip = `${role.label} · ${row.skill} · ${PROFICIENCY_LABEL[rating]}`;
                        return (
                          <div
                            key={`${row.skill}-${role.id}`}
                            role="cell"
                            title={tooltip}
                            aria-label={tooltip}
                            className={`flex items-center justify-center border-l border-white/60 py-1.5 text-[11px] font-bold ${cellClasses(rating)}`}
                          >
                            {rating}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-[12px] text-ink-muted">
            <span className="font-semibold uppercase tracking-[0.12em] text-ink-body">
              Proficiency
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="inline-flex h-5 w-7 items-center justify-center rounded bg-brand-primary text-[11px] font-bold text-white">
                H
              </span>
              High
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="inline-flex h-5 w-7 items-center justify-center rounded bg-brand-lavender text-[11px] font-bold text-ink-body">
                M
              </span>
              Medium
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="inline-flex h-5 w-7 items-center justify-center rounded bg-brand-bg text-[11px] font-bold text-ink-muted">
                L
              </span>
              Low
            </span>
            <span className="ml-auto text-[11.5px] italic">
              Click any role name to open its full role card.
            </span>
          </div>
        </section>

        {/* Section 3: Where to Focus First */}
        <section className="rounded-card bg-brand-primary p-6 text-white">
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-block h-3 w-3 rounded-sm bg-brand-lavender" />
            <h2 className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-brand-lavender">
              Where to Focus First
            </h2>
          </div>
          <p className="mb-5 text-[14px] leading-relaxed text-white/90">
            Lead with these four to build capability fastest:
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FOCUS_PRIORITIES.map((priority, idx) => (
              <div
                key={priority}
                className="flex items-start gap-4 rounded-md border border-white/15 bg-white/[0.06] px-4 py-4"
              >
                <span className="text-[34px] font-extrabold leading-none text-brand-vivid">
                  {idx + 1}
                </span>
                <span className="pt-1 text-[14px] font-semibold leading-snug text-white">
                  {priority}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {activeRole && <RoleModal role={activeRole} onClose={closeRole} />}
    </div>
  );
}
