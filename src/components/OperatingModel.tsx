import {
  useMemo,
  useState,
  useCallback,
  useEffect,
  KeyboardEvent,
  ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

type RoleEntry = { id: string; title: string };

type FunctionItem = {
  id: string;
  title: string;
  description: string;
  roles?: RoleEntry[];
};

type Layer = "core" | "pool" | "focus";

type RoleCardData = {
  id: string;
  layer: "Central Core" | "Capability Pool";
  title: string;
  description: string;
  responsibilities: string[];
  skills: string[];
  outcomes: string[];
};

const ROLE_CARDS: Record<string, RoleCardData> = {
  "head-of-learning": {
    id: "head-of-learning",
    layer: "Central Core",
    title: "Head of Learning",
    description:
      "The Head of Learning leads the enterprise learning and knowledge management ecosystem, translating business strategy and workforce needs into a scalable, AI-enabled performance enablement model. This role ensures that learning is embedded in the flow of work, aligned to the learning mission and north star, and directly tied to measurable business outcomes. The Head of Learning governs strategy, prioritization, and execution across the Central Core and Flexible Capability Pool, ensuring that capability investments improve performance metrics, reduce risk, and build critical skills at speed and scale.",
    responsibilities: [
      "Lead the enterprise learning and knowledge management strategy, aligning capability investments to business priorities, performance gaps, and risk considerations.",
      "Establish and govern the intake, prioritization, and funding model for learning demand, ensuring focus on high-impact, outcome-driven initiatives.",
      "Ensure learning and knowledge solutions are embedded in workflow, reducing reliance on event-based training and increasing real-time performance support.",
      "Oversee measurement frameworks and analytics to track impact on business metrics such as QA, AHT, FCR, CSAT, and error rates.",
      "Orchestrate the Central Core and Flexible Capability Pool to deliver integrated learning, knowledge, and performance enablement solutions.",
      "Partner with business, HR, and analytics leaders to align workforce planning, skills strategy, and capability development to future business needs.",
      "Govern enterprise learning platforms, knowledge systems, and emerging technologies (e.g., AI-enabled learning, skills intelligence) to enable scalable solutions.",
      "Serve as executive sponsor for learning transformation, driving adoption, stakeholder alignment, and cultural shift toward continuous capability building.",
    ],
    skills: [
      "Learning Strategy & Performance Enablement",
      "Stakeholder Management & Executive Influence",
      "Business & Operational Acumen (Consumer Banking, Ops, Risk)",
      "Data & Measurement Strategy (QA, AHT, CSAT, Risk Metrics)",
      "Workforce & Skills Strategy",
      "Digital Learning Ecosystems & Platforms",
      "Strategic Decision Making",
      "Knowledge Management & Content Lifecycle Understanding",
      "Data Analysis & Reporting",
      "Skills Management",
      "Consumer Banking & Operations Knowledge",
      "Risk & Compliance Awareness (e.g., KYC, AML)",
      "Systems Thinking",
    ],
    outcomes: [
      "Learning investments aligned to measurable business outcomes and strategic priorities mapped to business strategy and talent objectives",
      "Enterprise learning ecosystem drives improvement in core business metrics",
      "Reduced operational errors and compliance risk via governed, enterprise knowledge systems",
      "High adoption of AI-enabled, in-workflow learning and knowledge solutions.",
      "Clear enterprise prioritization and governance of learning investments, focused on highest-impact outcomes.",
      "Reduced fragmentation across learning, knowledge, and tools, enabling a cohesive performance ecosystem.",
    ],
  },
  "senior-learning-strategist": {
    id: "senior-learning-strategist",
    layer: "Central Core",
    title: "Senior Learning Strategist",
    description:
      "The Senior Learning Strategist partners with business leaders and the learning organization to translate business strategy and performance gaps into prioritized capability investments and performance enablement strategies. This role ensures that learning is embedded in the flow of work, aligned to the North Star, and focused on improving business outcomes rather than delivering training. Drawing on data insights, skills intelligence, and systems thinking, this role shapes adaptive, personalized, and scalable learning solutions, and plays a critical role in learning intake, demand planning, and consultative design across the ecosystem.",
    responsibilities: [
      "Serve as a strategic learning partner to business leaders, aligning learning priorities with evolving capability needs",
      "Develop the learning strategy and the learning plan, built to drive forward both the talent strategy and people agenda",
      "Translate skills data, performance trends, and business inputs into high-impact learning experiences",
      "Lead enterprise demand planning and scenario reviews to inform resource prioritization and development, informed by external labor market trends",
      "Collaborate across HR, Talent, and Analytics to connect learning to workforce planning and measurable outcomes",
      "Guide the creation of targeted learning experiences, from simulations to skill pathways, ensuring future skill readiness",
      "Prioritize learning content and assign Instructional Designers for learning design, development, and generation",
      "Maintain visibility into learning performance through dashboards, learning ROI insights, and reporting loops",
    ],
    skills: [
      "Learning Strategy & Performance Consulting",
      "Adult Learning Principles and Concepts",
      "Stakeholder Management",
      "Learning & Development Solutions",
      "Learning Culture",
      "Talent Management Strategy",
      "Data-Driven Decision-Making",
      "Knowledge Management & Content Lifecycle Understanding",
      "Data Analysis & Performance Diagnosis",
      "Skills Management",
      "Consumer Banking & Operations Knowledge",
      "Risk & Compliance Awareness (e.g., KYC, AML)",
      "Systems Thinking",
    ],
    outcomes: [
      "Learning investments aligned to measurable business outcomes and strategic priorities with clear prioritization of learning demand",
      "Reduction in time-to-proficiency for new hires and role transitions",
      "Improvement in operational performance metrics such as QA, AHT, and CSAT",
      "Reduction in errors and risk exposure through improved learning and application",
      "Increased adoption of critical skills in workflow, evidenced by behavior and performance improvements",
      "Strong alignment between business leaders and learning on capability needs and expected outcomes",
    ],
  },
  "learning-analytics-lead": {
    id: "learning-analytics-lead",
    layer: "Central Core",
    title: "Learning Analytics Lead",
    description:
      "The Learning Analytics Lead defines and governs the measurement strategy for the enterprise learning ecosystem, ensuring all capability investments are tied to measurable business outcomes. This role connects learning activity to operational performance by translating business metrics into clear measurement frameworks, dashboards, and insights. The Learning Analytics Lead enables data-driven prioritization, validates impact, and ensures transparency of learning effectiveness at all levels of the organization. This role is central to shifting learning from activity-based reporting to outcome-based performance management.",
    responsibilities: [
      "Define and govern the enterprise learning measurement strategy, aligning metrics to business outcomes, performance goals, and risk indicators",
      "Establish standardized measurement frameworks linking learning interventions to metrics such as QA, AHT, FCR, CSAT, and error rates",
      "Partner with business, strategy, and analytics teams to identify leading and lagging indicators of capability effectiveness",
      "Develop and maintain dashboards and reporting to provide visibility into learning impact, adoption, and performance trends",
      "Enable data-driven prioritization by providing insights that inform intake, funding decisions, and resource allocation",
      "Validate effectiveness of learning and knowledge interventions, identifying what drives performance improvement versus low-impact activity",
      "Collaborate with Learning, Knowledge Management, and embedded Business Unit Learning teams to embed measurement into solution design, ensuring impact is defined and tracked from the outset",
      "Identify data gaps, system limitations, and measurement risks that may impact accuracy or decision-making",
    ],
    skills: [
      "Learning Strategy & Performance Consulting",
      "Learning Measurement & Analytics Strategy",
      "Data Analysis & Performance Diagnosis",
      "Business & Operational Metrics (QA, AHT, CSAT, Risk)",
      "Dashboarding & Data Visualization",
      "Stakeholder Management",
      "Data Storytelling",
      "Knowledge of Consumer Banking & Operations",
      "Risk & Compliance Awareness (e.g., KYC, AML)",
      "Systems Thinking",
      "Data-Driven Decision Making",
    ],
    outcomes: [
      "Standardized enterprise measurement framework linking learning to business performance outcomes",
      "Clear visibility into learning impact through dashboards and reporting aligned to QA, AHT, FCR, CSAT, and risk metrics",
      "Data-driven prioritization of learning investments, focus on high-impact initiatives",
      "Improved decision-making through actionable insights on capability effectiveness and performance drivers",
      "Increased accountability across learning and business stakeholders",
      "Identification and elimination of low-impact learning activity based on performance data",
    ],
  },
  "learning-analyst": {
    id: "learning-analyst",
    layer: "Central Core",
    title: "Learning Analyst",
    description:
      "The Learning Analyst executes the measurement and analytics strategy defined by the Learning Analytics Lead, ensuring accurate tracking, reporting, and analysis of learning impact. This role translates data into actionable insights that inform learning prioritization, solution effectiveness, and performance outcomes. The Learning Analyst connects learning activity to business metrics by maintaining dashboards, analyzing trends, and identifying performance drivers. This role is essential to embedding measurement into day-to-day operations and enabling a shift toward data-driven performance management.",
    responsibilities: [
      "Execute enterprise learning measurement frameworks, ensuring consistent tracking of learning impact against business metrics such as QA, AHT, FCR, CSAT, and error rates",
      "Develop and maintain dashboards and reports that provide visibility into learning activity, adoption, and performance outcomes",
      "Analyze data to identify trends, performance gaps, and drivers of capability effectiveness",
      "Partner with Learning Strategists and business stakeholders to support data-informed prioritization and decision-making",
      "Validate data accuracy and integrity across systems, identifying and resolving discrepancies or reporting issues",
      "Support evaluation of learning and knowledge interventions by analyzing impact and highlighting improvement opportunities",
      "Translate data into clear, actionable insights through reporting and stakeholder communication",
      "Identify data gaps and support continuous improvement of measurement processes and tools",
    ],
    skills: [
      "Learning Measurement & Analytics Execution",
      "Data Analysis & Reporting",
      "Business & Operational Metrics (QA, AHT, CSAT, Risk)",
      "Dashboarding & Data Visualization",
      "Data Management & Quality Assurance",
      "Data-Driven Problem Solving",
      "Stakeholder Communication & Data Storytelling",
      "Knowledge of Consumer Banking & Operations",
      "Risk & Compliance Awareness (e.g., KYC, AML)",
    ],
    outcomes: [
      "Accurate and consistent reporting of learning impact aligned to business performance metrics",
      "Timely visibility into learning adoption, effectiveness, and performance trends",
      "Improved data quality and reliability across learning and performance reporting systems",
      "Actionable insights that support prioritization and continuous improvement of learning interventions",
      "Identification of performance trends and gaps to inform capability and business decisions",
    ],
  },
  "learning-innovation-lead": {
    id: "learning-innovation-lead",
    layer: "Central Core",
    title: "Learning Innovation Lead",
    description:
      "The Learning Innovation Lead drives the evolution of the enterprise learning ecosystem by identifying emerging trends, technologies, and practices that improve performance enablement. This role monitors the external market, evaluates new capabilities, and translates innovation into scalable solutions aligned to business priorities and the North Star. The Learning Innovation Lead partners across the learning organization and business teams to pilot, validate, and scale new approaches, including AI-enabled learning, ensuring innovation is practical, measurable, and embedded into workflow, while ensuring alignment to enterprise strategy and operating model standards.",
    responsibilities: [
      "Monitor external learning trends, technologies, and best practices to identify opportunities that improve performance enablement and capability development",
      "Evaluate and prioritize innovation opportunities based on business impact, scalability, and alignment to enterprise strategy",
      "Design and lead pilots for new learning approaches, including AI-enabled solutions, to test effectiveness in real business environments",
      "Partner with Learning Strategy, Analytics, and Knowledge Management teams to ensure innovations are aligned, measurable, and integrated into the operating model",
      "Translate successful pilots into scalable solutions, enabling adoption across the enterprise",
      "Collaborate with the AI Learning Strategist to advance AI-driven learning capabilities and embed them into workflow",
      "Establish standards and guardrails for adoption of new technologies and practices, ensuring consistency and risk alignment",
      "Identify risks, constraints, and dependencies related to emerging technologies, including regulatory, data, and operational considerations",
    ],
    skills: [
      "Learning Innovation & Emerging Practices",
      "AI-Enabled Learning & Digital Technologies",
      "Learning Strategy & Performance Enablement",
      "Experimentation & Pilot Design",
      "Business & Operational Acumen (Consumer Banking, Ops, Risk)",
      "Stakeholder Management & Influence",
      "Data-Informed Decision Making",
      "Risk & Compliance Awareness (e.g., KYC, AML, data considerations)",
      "Systems Thinking",
    ],
    outcomes: [
      "Continuous pipeline of validated innovation initiatives aligned to business priorities and performance needs",
      "Successful scaling of high-impact learning innovations, including AI-enabled solutions, across the enterprise",
      "Increased adoption of modern, workflow-embedded learning practices and technologies, with improved speed and effectiveness of capability development through innovative approaches",
      "Clear governance and standards for adoption of emerging learning technologies",
      "Reduced risk in deploying new technologies through structured testing, validation, and alignment processes",
    ],
  },
  "ai-learning-strategist": {
    id: "ai-learning-strategist",
    layer: "Central Core",
    title: "AI Learning Strategist",
    description:
      "The AI Learning Strategist partners with the Learning Innovation Lead and business stakeholders to translate AI capabilities into targeted, workflow-embedded learning and knowledge solutions. This role applies learning strategy principles specifically to AI-enabled experiences, ensuring they are aligned to business needs, measurable outcomes, and enterprise standards. The AI Learning Strategist supports the design, testing, and scaling of AI-driven learning interventions, bridging the gap between emerging technology and real-world performance improvement. This role ensures AI is applied in a practical, scalable way that enhances capability development and operational performance.",
    responsibilities: [
      "Translate business needs and performance gaps into AI-enabled learning and knowledge use cases aligned to capability priorities",
      "Define how AI can enhance the learner experience, including personalization, adaptive learning, and real-time, in-workflow support",
      "Support the design and execution of AI-driven learning pilots, ensuring alignment to business workflows and measurable outcomes",
      "Partner with Learning Innovation, Analytics, and Knowledge Management teams to integrate AI solutions into learning and knowledge ecosystems",
      "Define requirements for AI-enabled experiences that improve how learners access, consume, and apply knowledge in day-to-day work",
      "Collaborate with technology and data teams to ensure AI solutions are feasible, scalable, and aligned to enterprise standards",
      "Evaluate effectiveness of AI-enabled interventions, including impact on learner behavior, experience, and performance outcomes",
      "Support scaling of successful AI learning solutions across business units and roles",
      "Identify risks and constraints related to AI adoption, including data quality, regulatory considerations, and user trust and adoption challenges",
    ],
    skills: [
      "Learning Strategy & Performance Consulting (Foundational)",
      "AI-Enabled Learning & Digital Capabilities",
      "Learner Experience Design & Personalization",
      "Data Analysis & Performance Interpretation",
      "Business & Operational Acumen (Consumer Banking, Ops, Risk)",
      "Knowledge Management Integration",
      "Stakeholder Management",
      "Experimentation & Iteration Pilot Design",
      "Growth Mindset",
      "AI Adoption",
      "Risk & Compliance Awareness (e.g., KYC, AML, data considerations)",
    ],
    outcomes: [
      "AI-enabled learning use cases that improve both performance outcomes and learner experience",
      "Increased adoption of personalized, in-workflow learning and knowledge solutions",
      "Improved speed and effectiveness of capability development through AI-driven experiences",
      "Measurable impact of AI interventions on learner behavior, engagement, and performance",
      "Scalable AI learning solutions aligned to enterprise standards",
      "Reduced friction in how learners access and apply knowledge in day-to-day work",
    ],
  },
  "learning-strategist": {
    id: "learning-strategist",
    layer: "Capability Pool",
    title: "Learning Strategist",
    description:
      "The Learning Strategist operates within the Flexible Capability Pool, partnering with Senior Learning Strategists and business stakeholders to translate prioritized capability needs into targeted learning and knowledge solutions. This role focuses on applying performance enablement strategies within specific initiatives, ensuring solutions are aligned to business goals, embedded in workflow, and designed to drive measurable outcomes. The Learning Strategist supports the design and orchestration of learning experiences, knowledge integration, and skill activation, while building capability in strategy, consulting, and data-driven decision-making as part of a progression toward senior roles.",
    responsibilities: [
      "Partner with Senior Learning Strategists to translate prioritized business needs and performance gaps into actionable learning and knowledge solutions",
      "Support definition of capability requirements and performance outcomes for specific initiatives and roles",
      "Contribute to the design of performance enablement strategies, ensuring alignment to workflow, knowledge access, and skill application",
      "Collaborate with Design & Development, Knowledge Management, and Delivery teams to build and implement integrated solutions",
      "Incorporate business context, operational realities, and user needs into solution design to ensure relevance and adoption",
      "Support measurement planning by aligning solutions to defined success metrics and expected performance outcomes",
      "Gather feedback and performance data to inform iteration and continuous improvement of solutions",
      "Identify risks, dependencies, and constraints that may impact effectiveness or adoption",
    ],
    skills: [
      "Learning Strategy & Performance Enablement (Developing)",
      "Knowledge Management Fundamentals",
      "Learning Design & Development Understanding",
      "Business & Operational Acumen (Consumer Banking, Ops)",
      "Data Awareness & Performance Interpretation",
      "Stakeholder Collaboration",
      "Problem Solving & Critical Thinking",
      "Adaptability & Learning Agility",
      "Systems Thinking (Foundational)",
    ],
    outcomes: [
      "Effective translation of prioritized capability needs into actionable, workflow-embedded learning solutions",
      "Alignment of learning and knowledge interventions to defined business outcomes and performance metrics",
      "Increased adoption of learning solutions within day-to-day workflows",
      "Contribution to improvements in performance metrics (QA, AHT, FCR, and CSAT)",
      "High-quality execution of learning strategies within initiatives, supporting overall program success",
      "Continuous improvement of solutions based on feedback and performance data",
    ],
  },
  "learning-engineer": {
    id: "learning-engineer",
    layer: "Capability Pool",
    title: "Learning Engineer",
    description:
      "The Learning Engineer designs and builds performance enablement solutions that integrate learning, knowledge, and workflow tools to drive measurable behavior change. This role moves beyond traditional instructional design to engineer experiences that are embedded in the flow of work, leveraging modern technologies, data, and AI where appropriate. The Learning Engineer partners with Learning Strategists, Knowledge Management, and business stakeholders to translate capability needs into scalable, user-centered solutions that improve how employees access, apply, and retain critical knowledge in real time.",
    responsibilities: [
      "Design and build workflow-embedded learning and knowledge solutions aligned to defined capability needs and performance outcomes",
      "Translate learning strategies into scalable, user-centered experiences that drive skill application and behavior change",
      "Integrate knowledge assets, job aids, and performance support tools directly into day-to-day workflows",
      "Leverage modern learning technologies, platforms, and AI capabilities to enhance effectiveness and scalability",
      "Collaborate with Learning Strategists, Knowledge Management, and Delivery teams to ensure cohesive, end-to-end solutions",
      "Apply user experience and design principles to improve how learners interact with content and systems",
      "Iterate on solutions based on user feedback, performance data, and evolving business needs",
      "Identify constraints and risks related to technology, adoption, and integration within existing systems",
    ],
    skills: [
      "Learning Experience Design & Development",
      "Performance Enablement & Workflow Integration",
      "Knowledge Management Integration",
      "Digital Learning Technologies & Tools",
      "User Experience (UX) & Interaction Design",
      "Content Engineering & Modular Design",
      "Data Awareness & Continuous Improvement",
      "Stakeholder Collaboration",
      "Problem Solving",
      "Content Prioritization",
    ],
    outcomes: [
      "High-quality, workflow-embedded learning and knowledge solutions that enable real-time performance",
      "Increased adoption and usability of learning experiences within day-to-day work",
      "Improved speed and effectiveness of skill application and knowledge transfer",
      "Reduced reliance on event-based training through scalable, in-workflow solutions",
      "Contribution to improved business performance metrics through learning design and development",
      "Continuous improvement of solutions based on user behavior and performance data",
    ],
  },
  "curriculum-designer": {
    id: "curriculum-designer",
    layer: "Capability Pool",
    title: "Curriculum Designer",
    description:
      "The Curriculum Designer defines and structures end-to-end learning journeys that enable employees to build capabilities progressively over time. This role translates capability requirements into sequenced pathways across onboarding, growth, and mastery, ensuring alignment to business outcomes and performance expectations. The Curriculum Designer ensures that learning experiences are not fragmented, but intentionally connected to support skill development, reinforcement, and long-term retention. This role partners with Learning Strategists and Learning Engineers to ensure curricula are both strategically aligned and effectively executed within the flow of work.",
    responsibilities: [
      "Design end-to-end curricula aligned to defined capability needs, business outcomes, and role expectations",
      "Sequence learning experiences across time (e.g., new to role, growth in role, mastery) to enable progressive skill development",
      "Define how learning, knowledge, and practice experiences connect to reinforce capability building and retention",
      "Partner with Learning Strategists to translate capability priorities into structured learning journeys",
      "Collaborate with Learning Engineers and Knowledge Management to ensure curriculum components are embedded in workflow and built effectively",
      "Ensure consistency and standardization across learning journeys for similar roles and capabilities",
      "Incorporate reinforcement, practice, and application into curricula to drive sustained behavior change",
      "Evaluate effectiveness of curricula and identify opportunities for optimization based on performance data and feedback",
    ],
    skills: [
      "Curriculum Architecture & Learning Path Design",
      "Capability Modeling & Skill Progression",
      "Learning Experience Design (Journey-Level)",
      "Knowledge Management Integration",
      "Business & Role-Based Performance Understanding",
      "Data Awareness & Continuous Improvement",
      "Stakeholder Collaboration",
      "Problem Solving",
      "Content Prioritization",
      "Storytelling",
    ],
    outcomes: [
      "Structured, role-based curricula that enable consistent capability progression across the enterprise",
      "Reduced fragmentation of learning experiences through connected and sequenced learning journeys",
      "Improved retention and application of skills through reinforcement and practice",
      "Faster ramp and more effective growth in role through defined learning pathways",
      "Alignment of learning journeys to business outcomes and performance expectations",
      "Increased consistency in how critical capabilities are developed across teams and roles",
    ],
  },
  "ai-content-architect": {
    id: "ai-content-architect",
    layer: "Capability Pool",
    title: "AI Content Architect",
    description:
      "The AI Content Architect designs and manages how content is created, structured, and curated using AI to support performance enablement at scale. This role ensures that learning and knowledge content is modular, reusable, and optimized for AI-driven delivery in the flow of work. The AI Content Architect leverages generative AI to accelerate content creation while maintaining quality, accuracy, and alignment to enterprise standards. This role bridges content, knowledge, and technology to ensure employees can access the right information at the right time, without relying on traditional courses or static materials.",
    responsibilities: [
      "Design content architectures that enable modular, reusable, and AI-consumable learning and knowledge assets",
      "Generate and curate content using AI tools, ensuring accuracy, consistency, and alignment to business and regulatory requirements",
      "Structure content for in-workflow delivery, enabling real-time access through knowledge systems and AI interfaces",
      "Partner with Learning Engineers and Knowledge Management to integrate content into learning experiences and knowledge ecosystems",
      "Apply prompt engineering and AI configuration techniques to improve quality and efficiency of content generation",
      "Maintain content quality through validation processes, ensuring alignment to risk, compliance, and business standards",
      "Continuously optimize content based on usage data, feedback, and performance impact",
      "Identify risks related to AI-generated content, including hallucination, outdated information, and regulatory exposure",
    ],
    skills: [
      "Content Architecture & Modular Design",
      "AI Content Generation & Prompt Engineering",
      "AI Content Curation & Prompt Engineering",
      "Knowledge Management & Content Lifecycle",
      "Learning Content Development (Modern, Non-Course-Based)",
      "Business & Operational Acumen (Consumer Banking, Ops, Risk)",
      "Risk & Compliance Awareness (e.g., KYC, AML, regulatory content)",
      "Data Awareness & Content Optimization",
      "Stakeholder Collaboration",
      "Systems Thinking",
    ],
    outcomes: [
      "Scalable, modular content that supports AI-driven, in-workflow learning and knowledge access",
      "Increased speed and efficiency of content creation through effective use of AI",
      "Improved accuracy and consistency of content across learning and knowledge systems",
      "Reduced reliance on static, course-based content in favor of dynamic, reusable assets",
      "Faster access to critical knowledge, improving performance and reducing errors",
      "Continuous improvement of content based on usage patterns and performance data",
    ],
  },
  "knowledge-architect": {
    id: "knowledge-architect",
    layer: "Capability Pool",
    title: "Knowledge Architect",
    description:
      "The Knowledge Architect designs the structure, organization, and flow of knowledge across systems to ensure employees can access and apply the right information at the right time. This role defines how knowledge is created, structured, stored, and retrieved, ensuring alignment to business processes, regulatory requirements, and performance needs. The Knowledge Architect enables a shift from static documentation to dynamic, system-driven knowledge access embedded in workflow. This role partners across Learning, AI, and business teams to ensure knowledge is accurate, connected, and optimized for usability and scalability.",
    responsibilities: [
      "Design and define knowledge architecture, including taxonomy, metadata, and content structure aligned to business processes and user needs",
      "Establish how knowledge is organized and accessed across systems, ensuring seamless integration into workflow and tools",
      "Partner with Knowledge Management, Learning, and Technology teams to align knowledge systems with performance enablement strategies",
      "Ensure knowledge is structured for usability, findability, and accuracy, reducing time to access and apply critical information",
      "Define standards for knowledge creation, tagging, and maintenance to enable consistency and scalability",
      "Align knowledge architecture to regulatory and compliance requirements, ensuring controlled and auditable information access",
      "Support integration of AI-enabled knowledge retrieval and search capabilities",
      "Identify risks related to knowledge fragmentation, duplication, and outdated or inaccurate content",
    ],
    skills: [
      "Knowledge Architecture & Information Design",
      "Taxonomy, Metadata, and Content Structuring",
      "Knowledge Management Systems & Tools",
      "Business Process & Operational Understanding (Consumer Banking, Ops, Risk)",
      "Risk Reporting & Risk Data Aggregation",
      "Risk & Compliance Awareness (e.g., KYC, AML, audit requirements)",
      "User Experience & Findability Design",
      "Data & Systems Integration Awareness",
      "Stakeholder Collaboration",
      "Systems Thinking",
    ],
    outcomes: [
      "Structured, scalable knowledge architecture enabling fast and accurate access to information",
      "Reduced time to find and apply knowledge in day-to-day workflows",
      "Decreased knowledge fragmentation and duplication across systems",
      "Improved accuracy and consistency of knowledge supporting operational and compliance needs",
      "Increased adoption of knowledge systems embedded in workflow",
      "Reduced operational errors driven by unclear, outdated, or inaccessible information",
    ],
  },
  "knowledge-editor": {
    id: "knowledge-editor",
    layer: "Capability Pool",
    title: "Knowledge Editor",
    description:
      "The Knowledge Editor is responsible for validating, refining, and maintaining knowledge content to ensure it is accurate, clear, and usable in the flow of work. This role operates as a critical quality layer within the knowledge ecosystem, ensuring that both human- and AI-generated content meets business, operational, and regulatory standards. The Knowledge Editor curates and improves knowledge assets, ensuring they are structured for usability and aligned to defined knowledge architecture. This role enables reliable knowledge access at scale while reducing risk associated with incorrect or outdated information.",
    responsibilities: [
      "Review, validate, and refine knowledge content to ensure accuracy, clarity, and alignment to business and regulatory requirements",
      "Curate and maintain knowledge assets, ensuring they are up-to-date, relevant, and aligned to current processes and policies",
      "Partner with Knowledge Architects and AI Content Architects to ensure content is properly structured and optimized for system use",
      "Apply editorial standards to improve readability, consistency, and usability of knowledge in workflow",
      "Validate AI-generated content, identifying and correcting errors, inconsistencies, or gaps",
      "Ensure knowledge reflects current regulatory and compliance requirements (e.g., KYC, AML, policy updates)",
      "Monitor feedback and usage data to identify content gaps, confusion points, or opportunities for improvement",
      "Support continuous updates to knowledge based on business changes, product updates, and operational feedback",
    ],
    skills: [
      "Knowledge Curation & Editorial Skills",
      "Content Quality Assurance & Validation",
      "Knowledge Management & Content Lifecycle",
      "Business & Operational Acumen (Consumer Banking, Ops, Risk)",
      "Risk & Compliance Awareness (e.g., KYC, AML, procedures)",
      "Attention to Detail & Accuracy",
      "Clarity in Written Communication",
      "Data Awareness & Continuous Improvement",
      "Stakeholder Collaboration",
    ],
    outcomes: [
      "High accuracy and reliability of knowledge used in day-to-day operations",
      "Reduced errors and compliance risk due to incorrect or outdated content",
      "Improved clarity and usability of knowledge in workflow",
      "Faster updates and maintenance of knowledge aligned to business changes",
      "Increased trust and adoption of knowledge systems by employees",
      "Effective quality control of AI-generated content supporting performance",
    ],
  },
  "content-lifecycle-specialist": {
    id: "content-lifecycle-specialist",
    layer: "Capability Pool",
    title: "Content Lifecycle Specialist",
    description:
      "The Content Lifecycle Specialist manages the end-to-end lifecycle of learning and knowledge content, ensuring assets are created, maintained, reviewed, and retired in alignment with business and regulatory requirements. This role operationalizes lifecycle processes, enabling content to remain accurate, relevant, and accessible over time. The Content Lifecycle Specialist partners with Knowledge Management, Learning, and business teams to ensure timely updates driven by product changes, policy updates, and performance needs. This role ensures that content does not become stale, duplicated, or misaligned, supporting a reliable and scalable knowledge ecosystem.",
    responsibilities: [
      "Execute content lifecycle processes, including intake, review, update, archival, and retirement of learning and knowledge assets",
      "Monitor triggers for content updates, including policy changes, product updates, regulatory requirements, and performance feedback",
      "Partner with Knowledge Managers and business stakeholders to ensure timely and accurate content updates",
      "Track content ownership, review cycles, and approval workflows to maintain accountability and compliance",
      "Coordinate with Knowledge Editors and AI Content Architects to ensure updates are applied consistently and efficiently",
      "Maintain content inventories and ensure visibility into content status, usage, and lifecycle stage",
      "Identify outdated, duplicate, or unused content and drive cleanup and consolidation efforts",
      "Ensure adherence to governance standards, audit requirements, and regulatory expectations (e.g., KYC, AML)",
    ],
    skills: [
      "Content Lifecycle Management & Governance Execution",
      "Knowledge Management Processes & Tools",
      "Business & Operational Acumen (Consumer Banking, Ops, Risk)",
      "Risk & Compliance Awareness (e.g., KYC, AML, audit requirements)",
      "Process Management & Operational Execution",
      "Data Tracking & Content Inventory Management",
      "Attention to Detail & Accountability",
      "Stakeholder Coordination",
      "Systems Thinking",
    ],
    outcomes: [
      "Content remains current, accurate, and aligned to business and regulatory changes",
      "Reduced risk from outdated, duplicate, or unmanaged content",
      "Clear visibility into content ownership, status, and lifecycle across systems",
      "Improved efficiency in updating and maintaining learning and knowledge assets",
      "Increased consistency and compliance in content management practices",
      "Reduced content sprawl, enabling a more streamlined and usable knowledge ecosystem",
    ],
  },
  "facilitator-coach": {
    id: "facilitator-coach",
    layer: "Capability Pool",
    title: "Facilitator / Coach",
    description:
      "The Facilitator enables the application of skills and knowledge in the flow of work by guiding practice, reinforcing behaviors, and providing targeted coaching to improve performance. This role moves beyond traditional classroom delivery to orchestrate interactive, digital, and in-workflow experiences that drive real behavior change. The Facilitator partners with Learning Strategists, Curriculum Designers, and business leaders to ensure that capability development is activated through practice, feedback, and coaching aligned to real business scenarios. This role bridges the gap between learning and performance, particularly in complex, high-risk, or customer-facing environments.",
    responsibilities: [
      "Facilitate structured practice, simulations, and application activities aligned to critical capabilities and performance outcomes",
      "Provide in-the-moment coaching and feedback to improve skill application, decision-making, and confidence",
      "Reinforce learning through in-workflow touchpoints, digital sessions, and guided discussions focused on real business scenarios",
      "Partner with business leaders and managers to support on-the-job application and accountability for behavior change",
      "Leverage digital tools and AI-enabled platforms to deliver scalable, interactive learning and coaching experiences",
      "Monitor learner performance and identify gaps requiring additional reinforcement or intervention",
      "Support onboarding and role transition experiences to accelerate time-to-proficiency",
      "Identify risks to adoption and escalate challenges related to engagement, understanding, or performance gaps",
    ],
    skills: [
      "Facilitation & Guided Practice (Modern, Digital-First)",
      "Coaching & Feedback (Performance-Focused, In-Workflow)",
      "Business & Operational Acumen (Consumer Banking, Ops, Risk)",
      "Digital Learning Tools & Platforms",
      "Performance Enablement & Behavior Reinforcement",
      "Stakeholder Collaboration (Managers, Business Leaders)",
      "Communication & Engagement",
      "Adaptability & Real-Time Problem Solving",
    ],
    outcomes: [
      "Improved speed and effectiveness of skill application in day-to-day work",
      "Reduction in time-to-proficiency for new hires and role transitions",
      "Increased adoption of critical behaviors and workflows",
      "Improved performance metrics such as QA, AHT, FCR, and CSAT in targeted areas",
      "Reduced performance variability across teams through consistent coaching and reinforcement",
      "Increased confidence and capability in high-risk or complex tasks",
    ],
  },
};

const CORE_FUNCTIONS: FunctionItem[] = [
  {
    id: "core:strategy-governance",
    title: "Strategy & Governance",
    description:
      "Vision, mission, operating model, oversight, & experience design",
    roles: [{ id: "head-of-learning", title: "Head of Learning" }],
  },
  {
    id: "core:intake-content-lifecycle",
    title: "Intake & Content Lifecycle",
    description:
      "Centralized intake, diagnosis, prioritization, routing, & updates",
    roles: [
      { id: "senior-learning-strategist", title: "Senior Learning Strategist" },
    ],
  },
  {
    id: "core:enterprise-standards",
    title: "Enterprise Standards",
    description:
      "Standardization of quality, style, modalities for central & BU teams",
    roles: [
      { id: "senior-learning-strategist", title: "Senior Learning Strategist" },
    ],
  },
  {
    id: "core:advisory-consulting",
    title: "Advisory & Consulting",
    description:
      "Learning needs analysis, modality identification, proficiency scaling",
    roles: [
      { id: "senior-learning-strategist", title: "Senior Learning Strategist" },
    ],
  },
  {
    id: "core:measurement-analytics",
    title: "Measurement & Analytics",
    description:
      "KPI identification, impact analysis, and learning ROI evaluation",
    roles: [
      { id: "learning-analytics-lead", title: "Learning Analytics Lead" },
      { id: "learning-analyst", title: "Learning Analyst" },
    ],
  },
  {
    id: "core:learning-innovation",
    title: "Learning Innovation",
    description:
      "Emerging learning trends, best practices, AI-enabled capabilities",
    roles: [
      { id: "learning-innovation-lead", title: "Learning Innovation Lead" },
      { id: "ai-learning-strategist", title: "AI Learning Strategist" },
    ],
  },
];

const POOL_FUNCTIONS: FunctionItem[] = [
  {
    id: "pool:learning-strategy",
    title: "Learning Strategy",
    description:
      "Strategy-to-design bridge, business alignment, talent planning translation to skill needs, HRBP partnership",
    roles: [{ id: "learning-strategist", title: "Learning Strategist" }],
  },
  {
    id: "pool:design-development",
    title: "Learning Design & Development Engineering",
    description:
      "Content design and development, content curation, & AI-assisted authoring / generation, course maintenance",
    roles: [
      { id: "learning-engineer", title: "Learning Engineer" },
      { id: "curriculum-designer", title: "Curriculum Designer" },
      { id: "ai-content-architect", title: "AI Content Architect" },
    ],
  },
  {
    id: "pool:knowledge-management",
    title: "Knowledge Management",
    description:
      "Policy & procedure governance, creation, & maintenance, content lifecycle management",
    roles: [
      { id: "knowledge-architect", title: "Knowledge Architect" },
      { id: "knowledge-editor", title: "Knowledge Editor" },
      {
        id: "content-lifecycle-specialist",
        title: "Content Lifecycle Specialist",
      },
    ],
  },
  {
    id: "pool:delivery",
    title: "Delivery",
    description:
      "Facilitation, coaching, & cohort enablement, and LMS posting for digital content",
    roles: [
      { id: "facilitator-coach", title: "Facilitator / Coach" },
    ],
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

function SectionIcon({ kind }: { kind: "desc" | "resp" | "skills" | "outcomes" }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (kind === "desc") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
    );
  }
  if (kind === "resp") {
    return (
      <svg {...common}>
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    );
  }
  if (kind === "skills") {
    return (
      <svg {...common}>
        <path d="M12 2l2.39 7.36H22l-6.18 4.49 2.39 7.36L12 16.72l-6.21 4.49 2.39-7.36L2 9.36h7.61L12 2z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M3 3v18h18" />
      <path d="M7 14l3-3 4 4 5-5" />
      <path d="M19 10V6h-4" />
    </svg>
  );
}

type ModalSectionProps = {
  title: string;
  icon: "desc" | "resp" | "skills" | "outcomes";
  children: ReactNode;
};

function ModalSection({ title, icon, children }: ModalSectionProps) {
  return (
    <section className="mt-6 first:mt-0">
      <div className="flex items-center gap-2 text-brand-vivid">
        <SectionIcon kind={icon} />
        <h3 className="text-[14px] font-bold uppercase tracking-[0.1em]">
          {title}
        </h3>
      </div>
      <div className="mt-2 border-t border-brand-lavender" />
      <div className="mt-3 text-[14px] leading-[1.7] text-ink-body">
        {children}
      </div>
    </section>
  );
}

type RoleModalProps = {
  role: RoleCardData;
  onClose: () => void;
};

function RoleModal({ role, onClose }: RoleModalProps) {
  // Lock background scroll while modal is open.
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  // Close on Escape.
  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const eyebrow = `LEARNING ${role.layer.toUpperCase()}`;
  const titleId = `role-modal-title-${role.id}`;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/55"
      />

      {/* Card */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
        className="relative flex max-h-[80vh] w-full max-w-[900px] flex-col overflow-hidden rounded-[10px] bg-white shadow-2xl"
      >
        {/* Header */}
        <header className="flex items-start justify-between gap-4 bg-brand-primary px-8 py-5 text-white">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-lavender">
              {eyebrow}
            </div>
            <h2
              id={titleId}
              className="mt-1 text-[26px] font-bold uppercase leading-tight tracking-tight"
            >
              {role.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close role details"
            className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-white/60 text-white transition-colors hover:border-white hover:bg-white/10"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 2l10 10M12 2L2 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        {/* Body (scrolls if content overflows) */}
        <div className="overflow-y-auto px-8 py-6">
          <ModalSection title="Description & Purpose" icon="desc">
            <p>{role.description}</p>
          </ModalSection>

          <ModalSection title="Key Responsibilities" icon="resp">
            <ul className="list-disc space-y-2 pl-5 marker:text-brand-vivid">
              {role.responsibilities.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </ModalSection>

          <ModalSection title="Required Skills & Capabilities" icon="skills">
            <ul className="grid list-disc grid-cols-1 gap-x-8 gap-y-2 pl-5 marker:text-brand-vivid sm:grid-cols-2">
              {role.skills.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </ModalSection>

          <ModalSection title="Expected Outcomes" icon="outcomes">
            <ul className="list-disc space-y-2 pl-5 marker:text-brand-vivid">
              {role.outcomes.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </ModalSection>
        </div>
      </motion.div>
    </motion.div>
  );
}

type FunctionCardProps = {
  item: FunctionItem;
  open: boolean;
  rolesOpen: boolean;
  onToggle: (id: string) => void;
  onRolesToggle: (id: string) => void;
  onRoleClick: (roleId: string) => void;
};

function FunctionCard({
  item,
  open,
  rolesOpen,
  onToggle,
  onRolesToggle,
  onRoleClick,
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
                          {item.roles!.map((r) => {
                            const hasCard = !!ROLE_CARDS[r.id];
                            return (
                              <li key={r.id}>
                                {hasCard ? (
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onRoleClick(r.id);
                                    }}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter" || e.key === " ") {
                                        e.stopPropagation();
                                      }
                                    }}
                                    className="text-left font-medium text-brand-vivid underline-offset-2 hover:underline focus-visible:underline"
                                  >
                                    {r.title}
                                  </button>
                                ) : (
                                  <span>{r.title}</span>
                                )}
                              </li>
                            );
                          })}
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
  const [activeRoleId, setActiveRoleId] = useState<string | null>(null);

  const openRole = useCallback((roleId: string) => {
    if (ROLE_CARDS[roleId]) setActiveRoleId(roleId);
  }, []);
  const closeRole = useCallback(() => setActiveRoleId(null), []);
  const activeRole = activeRoleId ? ROLE_CARDS[activeRoleId] : null;

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
                onRoleClick={openRole}
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
                onRoleClick={openRole}
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
                onRoleClick={openRole}
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

      {activeRole && <RoleModal role={activeRole} onClose={closeRole} />}
    </div>
  );
}
