type StrategicObjective = {
  label: string;
  description: string;
};

const STRATEGIC_OBJECTIVES: StrategicObjective[] = [
  {
    label: "Scalable, Business-Aligned Learning Operating Model",
    description:
      "Standardized intake, prioritization, and governance tied to business outcomes. Clear service offerings, defined roles, and capacity aligned to enterprise priorities.",
  },
  {
    label: "In-Flow Performance Enablement",
    description:
      "Learning embedded in workflows through guidance overlays, simulations, and real-time support, shifting from event-based training to continuous, applied learning.",
  },
  {
    label: "Enterprise-Wide, Future-Focused Capability Building",
    description:
      "Expansion beyond phone-based agents to all servicing roles, aligned to future skills including AI, digital, and decision-making capabilities.",
  },
  {
    label: "AI-Enabled Learning & Knowledge Ecosystem",
    description:
      "Integrated platform ecosystem with sandbox environments, simulations, and AI-driven content creation and personalization.",
  },
  {
    label: "Test-and-Learn Innovation Engine",
    description:
      "Structured pilots and experimentation model using sandbox environments, tied to measurable performance outcomes.",
  },
];

type MetricsHorizon = {
  title: string;
  window: string;
  items: string[];
};

const METRICS_HORIZONS: MetricsHorizon[] = [
  {
    title: "Now",
    window: "0–6 months",
    items: [
      "Majority of learning demand routed through standardized intake",
      "Launch of 2–4 high-impact pilots with defined success metrics",
      "Improvement in QA scores and reduction in time-to-proficiency",
      "Adoption of new learning modalities (simulations, microlearning)",
    ],
  },
  {
    title: "Next",
    window: "6–18 months",
    items: [
      "Increased learning in the flow of work",
      "Learning aligned to priority skills",
      "Measurable improvements in QA, AHT, and FCR",
      "Reduced time to develop and deploy learning solutions",
      "Adoption of learning technology ecosystem",
    ],
  },
  {
    title: "Later",
    window: "18+ months",
    items: [
      "Personalized, adaptive learning at scale",
      "Reduction in critical skill gaps",
      "Improvements in CSAT and operational performance",
      "Clear linkage between learning, skills, and business outcomes",
      "Reduced cost-to-serve through improved workforce capability",
    ],
  },
];

type CharterGroup = {
  heading: string;
  bullets: string[];
};

const WHAT_WE_DO: CharterGroup[] = [
  {
    heading: "Strategy & Governance",
    bullets: [
      "Set the overarching learning strategy, direction, and prioritization process",
      "Establish the operating model and standards across learning modalities and measurement",
    ],
  },
  {
    heading: "Advisory & Consulting",
    bullets: [
      "Provide consultative learning advisory and support for learning needs analysis",
      "Advise on modality selection",
    ],
  },
  {
    heading: "Design, Development & Delivery",
    bullets: [
      "Design and deliver learning experiences focused on technical skills, performance improvement, new hire and new-to-role content, new intent / initiatives and projects, and judgment-based skills (competencies)",
      "Continuously improve relevant, engaging, and accessible learning experiences",
    ],
  },
  {
    heading: "Enterprise Standards",
    bullets: [
      "Establish the standards for quality and style across all learning content",
      "Define clear criteria for each content type to guide consistent development and delivery",
    ],
  },
  {
    heading: "Intake & Content Lifecycle",
    bullets: [
      "Identify the intake and prioritization process on business needs (learning-focused, then redirected support for interventions that are change, communications talent, etc.)",
      "Oversee knowledge assets and the full content lifecycle",
    ],
  },
  {
    heading: "Learning Innovation",
    bullets: [
      "Evaluate learning best practices and share adult learning theory recommendations",
      "Influence the continuous exploration of the future of learning",
    ],
  },
  {
    heading: "Measurement & Analytics",
    bullets: [
      "Identify learning metrics",
      "Measure anticipated return on learning programs and investments",
    ],
  },
  {
    heading: "Technology & Vendor Management",
    bullets: [
      "Monitor learning vendor management",
      "Validate the tools, learning platforms, and content curation / creation / generation tools being used by learning instructional designers and consultants",
    ],
  },
];

const WHAT_WE_DONT_DO: CharterGroup[] = [
  {
    heading: "Non-Learning Training Activities",
    bullets: [
      "Non-learning related training content and interventions (though will provide support and route business requests to the appropriate recipient)",
    ],
  },
  {
    heading: "Change Management",
    bullets: ["Change management activities and communications not related to learning"],
  },
  {
    heading: "Skills Taxonomy",
    bullets: ["Skills taxonomy / ontology for the workforce"],
  },
  {
    heading: "Talent Mobility & Career Pathways",
    bullets: ["Talent mobility or individual career pathway creation and maintenance"],
  },
  {
    heading: "Leadership Comms & Ad Hoc Support",
    bullets: ["Leadership-led meeting / town hall support materials and communication inputs"],
  },
  {
    heading: "Business-Owned Events & Relationships",
    bullets: ["Management of events and vendor relationships initiated and owned by the business"],
  },
  {
    heading: "Custom Small-Team Content",
    bullets: ["Content to address the needs of a small team or an individual manager's request"],
  },
];

function CornerArrow() {
  return (
    <span
      aria-hidden="true"
      className="select-none text-[44px] font-bold leading-none text-brand-vivid"
    >
      ›
    </span>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-lavender">
      {children}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="9" cy="9" r="9" fill="#16A34A" />
      <path
        d="M5 9.4l2.6 2.6L13 7"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="9" cy="9" r="9" fill="#DC2626" />
      <path
        d="M5.5 5.5l7 7M12.5 5.5l-7 7"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CharterColumn({
  groups,
  twoColumn,
}: {
  groups: CharterGroup[];
  twoColumn: boolean;
}) {
  return (
    <div
      className={
        twoColumn
          ? "grid gap-x-6 gap-y-5 sm:grid-cols-2"
          : "flex flex-col gap-5"
      }
    >
      {groups.map((g) => (
        <div key={g.heading}>
          <h4 className="text-[13px] font-bold leading-tight text-brand-primary">
            {g.heading}
          </h4>
          <ul className="mt-1.5 list-disc space-y-1.5 pl-5 text-[12.5px] leading-snug text-ink-body marker:text-brand-vivid">
            {g.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function NorthStarCharter() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1400px] px-8 py-8">
        {/* Section 1: Our North Star */}
        <section className="relative rounded-card bg-brand-primary p-10 text-white">
          <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
            {/* Title (upper-left) */}
            <div>
              <h1 className="text-[44px] font-black leading-[1.02] tracking-tight text-white">
                Our
                <br />
                North
                <br />
                Star
              </h1>
            </div>

            {/* Content stack (right) */}
            <div className="flex flex-col">
              {/* Mission */}
              <div className="pb-7">
                <Eyebrow>Learning Mission</Eyebrow>
                <p className="mt-3 text-[19px] font-bold leading-snug text-white">
                  Enable Capital One employees to build the skills and knowledge
                  required to perform today and adapt for the future by
                  translating business needs into targeted, scalable learning
                  solutions.
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-white/85">
                  Partner with the business to identify capability gaps, design
                  and deliver effective learning experiences, and ensure
                  employees can apply skills in-role to drive performance,
                  consistency, and continuous improvement.
                </p>
              </div>

              <div className="border-t border-brand-lavender/40" />

              {/* Ambition */}
              <div className="py-7">
                <Eyebrow>Ambition Statement</Eyebrow>
                <p className="mt-3 text-[15px] leading-relaxed text-white">
                  Transform learning into a performance enablement engine
                  embedded in the flow of work, powered by skills data,
                  AI-enabled experiences, and business-aligned prioritization,
                  so that employees continuously build capabilities, apply
                  learning in real time, and improve business outcomes at speed
                  and scale.
                </p>
              </div>

              <div className="border-t border-brand-lavender/40" />

              {/* Strategic Objectives */}
              <div className="py-7">
                <Eyebrow>Strategic Objectives</Eyebrow>
                <ol className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                  {STRATEGIC_OBJECTIVES.map((obj, idx) => (
                    <li key={obj.label} className="flex gap-3">
                      <span className="text-[22px] font-extrabold leading-none text-brand-vivid">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="text-[13.5px] font-bold leading-snug text-white">
                          {obj.label}
                        </div>
                        <div className="mt-1 text-[12.5px] leading-snug text-white/80">
                          {obj.description}
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="border-t border-brand-lavender/40" />

              {/* Metrics & Outcomes */}
              <div className="pt-7">
                <Eyebrow>Metrics & Outcomes</Eyebrow>
                <div className="mt-4 grid gap-6 lg:grid-cols-3">
                  {METRICS_HORIZONS.map((h) => (
                    <div key={h.title}>
                      <div className="flex items-baseline gap-2">
                        <h3 className="text-[16px] font-extrabold uppercase tracking-tight text-brand-vivid">
                          {h.title}
                        </h3>
                        <span className="text-[11.5px] uppercase tracking-[0.12em] text-brand-lavender">
                          {h.window}
                        </span>
                      </div>
                      <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[12.5px] leading-snug text-white/90 marker:text-brand-lavender">
                        {h.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex">
            <CornerArrow />
          </div>
        </section>

        {/* Thin lavender divider between sections */}
        <div className="my-10 border-t border-brand-tint" />

        {/* Section 2: Our Learning Charter */}
        <section className="relative rounded-card border border-brand-tint bg-white p-10 shadow-card">
          <header className="mb-8">
            <h2 className="text-[32px] font-black leading-tight tracking-tight text-ink-body">
              Our Learning Charter
            </h2>
            <p className="mt-2 text-[14px] italic text-ink-muted">
              What do we do? What don&rsquo;t we do?
            </p>
          </header>

          <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
            {/* What we do */}
            <div className="rounded-card border border-brand-tint p-6">
              <div className="flex items-center gap-2.5">
                <CheckIcon />
                <h3 className="text-[18px] font-bold text-brand-vivid">
                  What we do
                </h3>
              </div>
              <p className="mt-1 text-[12.5px] italic text-ink-muted">
                What does our learning function own? What are we agreeing to
                deliver for the Enterprise &amp; the business?
              </p>
              <div className="mt-5">
                <CharterColumn groups={WHAT_WE_DO} twoColumn />
              </div>
            </div>

            {/* What we don't do */}
            <div className="rounded-card border border-brand-tint p-6">
              <div className="flex items-center gap-2.5">
                <XIcon />
                <h3 className="text-[18px] font-bold text-brand-vivid">
                  What we don&rsquo;t do
                </h3>
              </div>
              <p className="mt-1 text-[12.5px] italic text-ink-muted">
                What does not fall inside our remit?
              </p>
              <div className="mt-5">
                <CharterColumn groups={WHAT_WE_DONT_DO} twoColumn={false} />
              </div>
            </div>
          </div>

          <div className="mt-8 flex">
            <CornerArrow />
          </div>
        </section>
      </div>
    </div>
  );
}
