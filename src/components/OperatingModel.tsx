import { useMemo, useState, useCallback, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FunctionItem = {
  id: string;
  title: string;
  description: string;
  roles?: string[];
};

type Layer = "core" | "pool" | "focus";

const CORE_FUNCTIONS: FunctionItem[] = [
  {
    id: "core:strategy-governance",
    title: "Strategy & Governance",
    description:
      "Vision, mission, operating model, oversight, & experience design",
    roles: ["Head of Learning"],
  },
  {
    id: "core:intake-content-lifecycle",
    title: "Intake & Content Lifecycle",
    description:
      "Centralized intake, diagnosis, prioritization, routing, & updates",
    roles: ["Senior Learning Strategist"],
  },
  {
    id: "core:enterprise-standards",
    title: "Enterprise Standards",
    description:
      "Standardization of quality, style, modalities for central & BU teams",
    roles: ["Senior Learning Strategist"],
  },
  {
    id: "core:advisory-consulting",
    title: "Advisory & Consulting",
    description:
      "Learning needs analysis, modality identification, proficiency scaling",
    roles: ["Senior Learning Strategist"],
  },
  {
    id: "core:measurement-analytics",
    title: "Measurement & Analytics",
    description:
      "KPI identification, impact analysis, and learning ROI evaluation",
    roles: ["Learning Analytics Lead", "Learning Analyst"],
  },
  {
    id: "core:learning-innovation",
    title: "Learning Innovation",
    description:
      "Emerging learning trends, best practices, AI-enabled capabilities",
    roles: ["Learning Innovation Lead", "AI Learning Strategist"],
  },
];

const POOL_FUNCTIONS: FunctionItem[] = [
  {
    id: "pool:learning-strategy",
    title: "Learning Strategy",
    description:
      "Strategy-to-design bridge, business alignment, talent planning translation to skill needs, HRBP partnership",
    roles: ["Learning Strategist"],
  },
  {
    id: "pool:design-development",
    title: "Learning Design & Development Engineering",
    description:
      "Content design and development, content curation, & AI-assisted authoring / generation, course maintenance",
    roles: [
      "Learning Engineer (Instructional Designers)",
      "Curriculum Designer",
      "AI Content Specialist",
    ],
  },
  {
    id: "pool:knowledge-management",
    title: "Knowledge Management",
    description:
      "Policy & procedure governance, creation, & maintenance, content lifecycle management",
    roles: ["Knowledge Architect", "Knowledge Editor", "Content Lifecycle Specialist"],
  },
  {
    id: "pool:delivery",
    title: "Delivery",
    description:
      "Facilitation, coaching, & cohort enablement, and LMS posting for digital content",
    roles: ["Facilitation Lead", "Facilitator", "Coach"],
  },
];

const FOCUS_AREAS: FunctionItem[] = [
  {
    id: "focus:new-to-role",
    title: "New to Role Content",
    description:
      "Onboarding, systems & tools, role readiness across all servicing associates",
  },
  {
    id: "focus:growth-in-role",
    title: "Growth in Role Content",
    description:
      "Performance improvement, upskilling, competency & judgment-based skills",
  },
  {
    id: "focus:knowledge-procedures",
    title: "Knowledge & Procedures",
    description:
      "Procedure governance, content lifecycle, agent & agentic task documentation",
  },
  {
    id: "focus:initiatives-new-programs",
    title: "Initiatives & New Programs",
    description:
      "New intent, new products and services, project learning, pilots, AI & agentic readiness programs",
  },
  {
    id: "focus:refreshed-sustained",
    title: "Refreshed & Sustained Programs",
    description:
      "Content refresh & retirement, regulatory updates, performance-driven revisions, overall curriculum review",
  },
];

const TOUCHPOINTS = [
  "Annual (and as needed) Talent Planning",
  "Learning Prioritization Input",
  "Prioritized / Direct Learning Requests",
  "Advisory & SME Validation",
  "BU Learning Team Alignment",
];

const BUSINESS_BRINGS = [
  "Strategic business objectives & talent priorities",
  "Business context & market landscape",
  "Performance signals & business-driven metrics",
];

const LEARNING_PROVIDES = [
  "Capability & skill insights",
  "Learning needs analysis, design, development, & delivery",
  "Return on learning and future scaling",
];

const TECH_PARTNERS = [
  "Learning Platforms & Experiences",
  "KM & Documentation Tools",
  "AI Content Generation",
  "Business / HR Data & Analytics",
  "Emerging Technology Monitoring",
  "Vendor Management",
  "QMO",
  "Process Owners",
];

const ALL_IDS: string[] = [
  ...CORE_FUNCTIONS.map((f) => f.id),
  ...POOL_FUNCTIONS.map((f) => f.id),
  ...FOCUS_AREAS.map((f) => f.id),
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <motion.span
      aria-hidden="true"
      animate={{ rotate: open ? 45 : 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="inline-flex h-5 w-5 items-center justify-center rounded-full text-brand-primary"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 1.75v10.5M1.75 7h10.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    </motion.span>
  );
}

type FunctionCardProps = {
  item: FunctionItem;
  open: boolean;
  rolesOpen: boolean;
  onToggle: (id: string) => void;
  onRolesToggle: (id: string) => void;
};

function FunctionCard({
  item,
  open,
  rolesOpen,
  onToggle,
  onRolesToggle,
}: FunctionCardProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      // Ignore key events bubbling from focusable children (e.g. the Roles button).
      if (e.target !== e.currentTarget) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onToggle(item.id);
      }
    },
    [item.id, onToggle]
  );

  const hasRoles = !!(item.roles && item.roles.length);
  const rolesId = `roles-${item.id}`;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={open}
      onClick={() => onToggle(item.id)}
      onKeyDown={handleKey}
      className={[
        "group flex h-full cursor-pointer select-none flex-col rounded-card border bg-white px-5 py-4 text-left transition-all duration-200",
        "shadow-card hover:shadow-cardHover hover:-translate-y-[1px]",
        open
          ? "border-brand-vivid"
          : "border-brand-lavender hover:border-brand-vivid",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-[15px] font-semibold leading-snug text-ink-body group-hover:text-brand-vivid">
          {item.title}
        </h4>
        <ChevronIcon open={open} />
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="desc"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="mt-3 border-t border-brand-tint pt-3 text-[13.5px] leading-relaxed text-ink-muted">
              {item.description}
            </p>

            {hasRoles && (
              <>
                <div className="mt-3 border-t border-brand-lavender" />
                <button
                  type="button"
                  aria-expanded={rolesOpen}
                  aria-controls={rolesId}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRolesToggle(item.id);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.stopPropagation();
                    }
                  }}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-brand-vivid bg-white px-2.5 py-1 text-[12px] font-semibold text-brand-vivid transition-colors hover:bg-brand-bg"
                >
                  {rolesOpen ? "Hide Key Roles" : "View Key Roles"}
                </button>

                <AnimatePresence initial={false}>
                  {rolesOpen && (
                    <motion.div
                      key="roles"
                      id={rolesId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3">
                        <h5 className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-vivid">
                          Key Roles
                        </h5>
                        <ul className="list-disc space-y-1.5 pl-4 text-[13px] leading-relaxed text-ink-body marker:text-brand-vivid">
                          {item.roles!.map((r) => (
                            <li key={r}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type LayerControlProps = {
  allOpen: boolean;
  onExpandAll: () => void;
  onCollapseAll: () => void;
};

function LayerControl({ allOpen, onExpandAll, onCollapseAll }: LayerControlProps) {
  return (
    <button
      type="button"
      onClick={allOpen ? onCollapseAll : onExpandAll}
      className="text-[12px] font-medium uppercase tracking-wide text-brand-medium underline-offset-4 hover:text-brand-vivid hover:underline"
    >
      {allOpen ? "Collapse all" : "Expand all"}
    </button>
  );
}

export default function OperatingModel() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [rolesExpanded, setRolesExpanded] = useState<Set<string>>(new Set());

  const toggle = useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        // Collapsing the parent also collapses its nested roles section.
        setRolesExpanded((rprev) => {
          if (!rprev.has(id)) return rprev;
          const r = new Set(rprev);
          r.delete(id);
          return r;
        });
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const toggleRoles = useCallback((id: string) => {
    setRolesExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const setLayer = useCallback((layer: Layer | "all", open: boolean) => {
    const ids =
      layer === "all"
        ? ALL_IDS
        : layer === "core"
          ? CORE_FUNCTIONS.map((f) => f.id)
          : layer === "pool"
            ? POOL_FUNCTIONS.map((f) => f.id)
            : FOCUS_AREAS.map((f) => f.id);
    setExpanded((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => {
        if (open) next.add(id);
        else next.delete(id);
      });
      return next;
    });
    // Layer-level toggles always reset the nested roles for affected ids —
    // users opt into role detail intentionally per box.
    setRolesExpanded((prev) => {
      let changed = false;
      const next = new Set(prev);
      ids.forEach((id) => {
        if (next.has(id)) {
          next.delete(id);
          changed = true;
        }
      });
      return changed ? next : prev;
    });
  }, []);

  const layerStatus = useMemo(() => {
    const isAllOpen = (ids: string[]) =>
      ids.length > 0 && ids.every((id) => expanded.has(id));
    return {
      core: isAllOpen(CORE_FUNCTIONS.map((f) => f.id)),
      pool: isAllOpen(POOL_FUNCTIONS.map((f) => f.id)),
      focus: isAllOpen(FOCUS_AREAS.map((f) => f.id)),
      all: isAllOpen(ALL_IDS),
    };
  }, [expanded]);

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1400px] px-8 py-8">
        {/* Title bar */}
        <header className="mb-6 flex items-center justify-between gap-6 border-b border-brand-tint pb-5">
          <div>
            <h1 className="text-[26px] font-bold leading-tight tracking-tight text-brand-primary">
              Learning &amp; KM Operating Model Design
            </h1>
            <p className="mt-1 text-[13px] text-ink-muted">
              Click any function to reveal its description. Tab and press
              Enter / Space for keyboard navigation.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setLayer("all", !layerStatus.all)}
            className={[
              "shrink-0 rounded-md px-4 py-2 text-[12.5px] font-semibold uppercase tracking-wide transition-colors",
              layerStatus.all
                ? "bg-brand-primary text-white hover:bg-brand-soft"
                : "border border-brand-primary text-brand-primary hover:bg-brand-bg",
            ].join(" ")}
          >
            {layerStatus.all ? "Collapse all" : "Expand all"}
          </button>
        </header>

        {/* 1. Business layer */}
        <section className="mb-6 rounded-card border border-brand-lavender bg-brand-bg p-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-block h-3 w-3 rounded-sm bg-brand-primary" />
            <h2 className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-brand-primary">
              Business — Strategy, talent needs &amp; learning demand
            </h2>
          </div>

          {/* Touchpoint chips */}
          <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {TOUCHPOINTS.map((t) => (
              <div
                key={t}
                className="rounded-md bg-brand-primary px-3 py-2.5 text-center text-[12.5px] font-semibold leading-tight text-white shadow-card"
              >
                {t}
              </div>
            ))}
          </div>

          {/* Collaboration bridge */}
          <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
            {/* Left side */}
            <div className="rounded-card border border-brand-lavender bg-white p-4">
              <div className="mb-3 text-[12px] font-semibold uppercase tracking-wide text-ink-muted">
                What the business brings:
              </div>
              <ul className="space-y-2">
                {BUSINESS_BRINGS.map((s) => (
                  <li
                    key={s}
                    className="rounded-md border border-brand-lavender bg-brand-tint px-3 py-2 text-[13px] font-medium text-ink-body"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Arrow */}
            <div
              aria-hidden="true"
              className="flex items-center justify-center text-brand-medium"
            >
              <svg
                width="48"
                height="28"
                viewBox="0 0 48 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="hidden lg:block"
              >
                <path
                  d="M6 14h36M10 8 4 14l6 6M38 8l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-2xl font-bold lg:hidden">⟷</span>
            </div>

            {/* Right side */}
            <div className="rounded-card border border-brand-lavender bg-white p-4">
              <div className="mb-3 text-[12px] font-semibold uppercase tracking-wide text-ink-muted">
                What the Learning org provides:
              </div>
              <ul className="space-y-2">
                {LEARNING_PROVIDES.map((s) => (
                  <li
                    key={s}
                    className="rounded-md bg-brand-medium px-3 py-2 text-[13px] font-medium text-white"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 2. Central Core */}
        <section
          className="mb-6 rounded-card border border-brand-lavender bg-brand-bg p-6 pl-7"
          style={{ borderLeftWidth: "4px", borderLeftColor: "#460074" }}
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="inline-block h-3 w-3 rounded-sm bg-brand-primary" />
              <h2 className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-brand-primary">
                Learning &amp; Knowledge Management — Central Core
              </h2>
            </div>
            <LayerControl
              allOpen={layerStatus.core}
              onExpandAll={() => setLayer("core", true)}
              onCollapseAll={() => setLayer("core", false)}
            />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {CORE_FUNCTIONS.map((f) => (
              <FunctionCard
                key={f.id}
                item={f}
                open={expanded.has(f.id)}
                rolesOpen={rolesExpanded.has(f.id)}
                onToggle={toggle}
                onRolesToggle={toggleRoles}
              />
            ))}
          </div>
        </section>

        {/* 3. Flexible Capability Pool */}
        <section
          className="mb-6 rounded-card border border-brand-lavender bg-brand-bg p-6 pl-7"
          style={{ borderLeftWidth: "4px", borderLeftColor: "#7500C0" }}
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="inline-block h-3 w-3 rounded-sm bg-brand-medium" />
              <h2 className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-brand-medium">
                Flexible Capability Pool — Deployed by Demand
              </h2>
            </div>
            <LayerControl
              allOpen={layerStatus.pool}
              onExpandAll={() => setLayer("pool", true)}
              onCollapseAll={() => setLayer("pool", false)}
            />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {POOL_FUNCTIONS.map((f) => (
              <FunctionCard
                key={f.id}
                item={f}
                open={expanded.has(f.id)}
                rolesOpen={rolesExpanded.has(f.id)}
                onToggle={toggle}
                onRolesToggle={toggleRoles}
              />
            ))}
          </div>
        </section>

        {/* 4. Focus Areas */}
        <section
          className="mb-6 rounded-card border border-brand-lavender bg-brand-bg p-6 pl-7"
          style={{ borderLeftWidth: "4px", borderLeftColor: "#C1A3FF" }}
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="inline-block h-3 w-3 rounded-sm bg-brand-lavender" />
              <h2 className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-brand-soft">
                Focus Areas
              </h2>
            </div>
            <LayerControl
              allOpen={layerStatus.focus}
              onExpandAll={() => setLayer("focus", true)}
              onCollapseAll={() => setLayer("focus", false)}
            />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {FOCUS_AREAS.map((f) => (
              <FunctionCard
                key={f.id}
                item={f}
                open={expanded.has(f.id)}
                rolesOpen={rolesExpanded.has(f.id)}
                onToggle={toggle}
                onRolesToggle={toggleRoles}
              />
            ))}
          </div>
        </section>

        {/* 5. Technology, Vendors, Ancillary Partners */}
        <section className="rounded-card bg-brand-primary p-6 text-white">
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-block h-3 w-3 rounded-sm bg-brand-lavender" />
            <h2 className="text-[12.5px] font-bold uppercase tracking-[0.12em] text-white">
              Technology, Vendors, Ancillary Partners
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {TECH_PARTNERS.map((p) => (
              <div
                key={p}
                className="rounded-md border border-white/20 bg-white/[0.06] px-3 py-3 text-center text-[13px] font-semibold text-white"
              >
                {p}
              </div>
            ))}
          </div>
        </section>

        <p className="mt-6 text-[11.5px] italic leading-relaxed text-ink-muted">
          Senior Learning Strategists rotate across Intake, Enterprise
          Standards, and Advisory functions. Progression pathway from
          pool-based Learning Strategist to core function Senior Learning
          Strategist.
        </p>
      </div>
    </div>
  );
}
