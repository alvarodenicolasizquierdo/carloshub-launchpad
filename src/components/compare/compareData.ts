export type FeatureValue = boolean | string;

export type CategoryId = "ai" | "sustainability" | "platform";

export interface Feature {
  label: string;
  description?: string;
  category: CategoryId;
  carlos: FeatureValue;
  carlosCaveat?: string;
  inspectorio: FeatureValue;
  inspectorioCaveat?: string;
  tradebeyond: FeatureValue;
  tradebeyondCaveat?: string;
  qima: FeatureValue;
  qimaCaveat?: string;
}

export const CATEGORIES = [
  { id: "all", label: "All Features" },
  { id: "ai", label: "AI & ML" },
  { id: "sustainability", label: "Sustainability" },
  { id: "platform", label: "Core Platform" },
] as const;

/*
 * Scoring methodology (16 features):
 *   ✅ Full capability = 1 point
 *   ⚠️ Partial/limited = 0.5 points
 *   ❌ Not present = 0 points
 *
 * Audited scores (Feb 2026):
 *   CARLOS:      14 / 16
 *   Inspectorio:  9 / 16
 *   TradeBeyond:  5 / 16
 *   QIMA:       3.5 / 16
 */

// Strings that score 0 points
export const NEGATIVE_VALUES = [
  "No AI",
  "N/A",
  "Not published",
  "Black-box AI",
  "No AI confidence scoring",
  "No full reasoning chains",
  "Operational AI only — no reasoning transparency",
  "Adjacent capability only (Chain of Custody)",
  "No DPP product",
];

// Strings that score 0.5 points
export const PARTIAL_VALUES = [
  "Architecture built",
  "Architecture ready",
  "Recommends actions",
  "Limited",
  "Partial",
  "Basic reporting",
  "Multi-tier CoC",
  "Single point estimates only",
  "Cites source documents; NLP queries with referenced answers",
  "End-to-end traceability; dedicated DPP content",
  "PO Line Risk Rating with ML",
  "AI Chain of Custody for EUDR/UFLPA",
  "AI report summaries",
  "Risk Radar — factory/order/country benchmarking",
  "Scope 1–3 framework designed",
  "Digital intelligence layer",
  "Scope 1 only",
  "ESG data collection",
  "Basic compliance tracking",
  "Contributing factors shown",
  "Risk factors visible",
  "Field mobile tools",
];

export const FEATURES: Feature[] = [
  // ── AI & ML ──
  {
    label: "AI Explainability",
    description: "Transparent reasoning for every decision",
    category: "ai",
    carlos: "Full reasoning transparency",
    carlosCaveat: "Problem → evidence → consequence → fix, with confidence ranges",
    inspectorio: "Cites source documents; NLP queries with referenced answers",
    inspectorioCaveat: "Provides recommendations with document citations, but does not show full reasoning chains, confidence ranges, or downstream impact analysis. Paramo AI is citation-aware but not chain-transparent.",
    tradebeyond: "No full reasoning chains",
    tradebeyondCaveat: "Risk scoring shows contributing factors but no full reasoning transparency.",
    qima: "Operational AI only — no reasoning transparency",
    qimaCaveat: "QIMA's AI is rule-based and operational (summaries, flags, alerts). No full reasoning chain, no confidence ranges, no scenario modelling.",
  },
  {
    label: "Downstream Impact Visualization",
    description: "Shows business cascade when a test fails — traces TRF failure through collection, shipment, and retail launch delays with SLA timers",
    category: "ai",
    carlos: true,
    carlosCaveat: "Dependency graph traces test failures forward through collections → shipments → retail launches. SLA timers show time remaining before downstream milestones are impacted.",
    inspectorio: false,
    inspectorioCaveat: "No downstream cascade visualization. Test failures shown in isolation without business impact context.",
    tradebeyond: false,
    tradebeyondCaveat: "No downstream impact tracing. Workflow-based, not dependency-aware.",
    qima: false,
  },
  {
    label: "AI Confidence Ranges",
    description: "Displays confidence as ranges showing uncertainty honestly",
    category: "ai",
    carlos: "75–91% ranges",
    carlosCaveat: "Scientifically rigorous uncertainty quantification",
    inspectorio: "Single point estimates only",
    inspectorioCaveat: "No uncertainty range provided",
    tradebeyond: "No AI confidence scoring",
    qima: false,
  },
  {
    label: "ML Features",
    description: "Number of machine-learning driven data points",
    category: "ai",
    carlos: "847",
    inspectorio: "Paramo AI recommendations",
    inspectorioCaveat: "Paramo AI provides cited, source-backed recommendations with autonomous agent workflows. Strong ML but focused on operational actions rather than deep analytical features.",
    tradebeyond: "PO Line Risk Rating with ML",
    tradebeyondCaveat: "ML algorithms assign risk scores to each PO line based on product type, materials, origin, and historical quality data. CARLOS extends this with scenario simulation, downstream impact tracing, and confidence ranges.",
    qima: "AI report summaries",
    qimaCaveat: "AI transforms inspection reports into instant insights, highlighting high-impact defects and corrective actions. Operational AI, not strategic.",
  },
  {
    label: "Care Labelling AI",
    description: "AI-powered care label generation",
    category: "ai",
    carlos: true,
    inspectorio: false,
    tradebeyond: false,
    qima: false,
  },
  {
    label: "Risk Assessment Map",
    description: "Visual risk mapping across supply chain",
    category: "ai",
    carlos: true,
    carlosCaveat: "Includes confidence intervals per region",
    inspectorio: "Paramo risk scoring",
    inspectorioCaveat: "Paramo AI detects risks across supply chain operations with cited recommendations.",
    tradebeyond: "AI Chain of Custody for EUDR/UFLPA",
    tradebeyondCaveat: "Automated document compiling and linking across shipments for regulatory compliance.",
    qima: "Risk Radar — factory/order/country benchmarking",
    qimaCaveat: "Factory risk scorecards, order risk ratings, country risk benchmarks, and AI-driven media scanning for supplier incidents.",
  },
  {
    label: "Predictive Quality Analytics",
    description: "Forecast defects before they happen",
    category: "ai",
    carlos: true,
    carlosCaveat: "Proactive defect prevention with scenario simulation",
    inspectorio: "Predictive risk detection",
    inspectorioCaveat: "Paramo AI provides predictive risk detection across supply chain operations.",
    tradebeyond: "PO risk categorization",
    tradebeyondCaveat: "PO Line Risk Rating uses ML to predict risk at the purchase order line level.",
    qima: false,
  },

  // ── Sustainability ──
  {
    label: "Multi-Framework DPP Assertions",
    description: "Validates DPP assertions across multiple compliance frameworks (bluesign, OEKO-TEX, ZDHC) simultaneously in a single view, surfacing cross-framework conflicts",
    category: "sustainability",
    carlos: true,
    carlosCaveat: "Single assertion view spanning bluesign, OEKO-TEX Standard 100, and ZDHC MRSL. Automatically flags when one framework's requirement conflicts with another. 11 assertions across 3 frameworks visible on one page.",
    inspectorio: "Basic compliance tracking",
    inspectorioCaveat: "Supports individual framework compliance but requires separate views. No cross-framework conflict detection.",
    tradebeyond: false,
    tradebeyondCaveat: "No multi-framework assertion management.",
    qima: false,
  },
  {
    label: "EU Digital Product Passport",
    description: "Architected for 2027 DPP regulation",
    category: "sustainability",
    carlos: "Architected for 2027",
    carlosCaveat: "Designed for 2027 EU DPP compliance requirements. Unique capability: simultaneous multi-framework validation (bluesign + OEKO-TEX + ZDHC) in a single view.",
    inspectorio: "End-to-end traceability; dedicated DPP content",
    inspectorioCaveat: "Inspectorio has the strongest explicit DPP positioning in the market — supplier engagement automation, compliance intelligence, and claims brands already use it. CARLOS differentiates with simultaneous multi-framework validation.",
    tradebeyond: "Adjacent capability only (Chain of Custody)",
    tradebeyondCaveat: "AI Chain of Custody for UFLPA/EUDR provides foundational traceability but TradeBeyond has no dedicated DPP product.",
    qima: false,
    qimaCaveat: "QIMA addresses DPP through webinars and thought leadership but has no DPP product offering.",
  },
  {
    label: "Carbon Footprint Tracking",
    description: "Track and report emissions across supply chain",
    category: "sustainability",
    carlos: "Scope 1–3 framework designed",
    carlosCaveat: "Framework architected for full Scope 1–3 coverage; data connectors in development",
    inspectorio: "ESG data collection",
    inspectorioCaveat: "ESG module supports carbon data collection as part of broader sustainability tracking.",
    tradebeyond: "Scope 1 only",
    tradebeyondCaveat: "Limited to Scope 1 emissions reporting.",
    qima: false,
  },
  {
    label: "Supply Chain Traceability",
    description: "End-to-end material and supplier tracing",
    category: "sustainability",
    carlos: "Digital intelligence layer",
    carlosCaveat: "AI-powered digital traceability focused on compliance intelligence rather than physical supply chain mapping. Complements field-based tracing.",
    inspectorio: "Network of 15,000+ suppliers",
    inspectorioCaveat: "Extensive supplier network with end-to-end traceability and compliance intelligence.",
    tradebeyond: "Nth-tier automated mapping",
    tradebeyondCaveat: "Nth-tier automated supply chain mapping across 50,000+ partners in 112 countries.",
    qima: true,
    qimaCaveat: "2,500+ owned inspectors; 30,000 clients in 120 countries. One of the largest TIC footprints globally — physical field presence that pure SaaS platforms cannot replicate.",
  },

  // ── Core Platform ──
  {
    label: "Scheme-Agnostic Compliance",
    description: "Works across all compliance schemes",
    category: "platform",
    carlos: true,
    inspectorio: "Multi-tier CoC",
    inspectorioCaveat: "Chain-of-custody tracking across tiers",
    tradebeyond: "Partial",
    qima: false,
  },
  {
    label: "Role-Adaptive Views",
    description: "Interface adapts to user role",
    category: "platform",
    carlos: "Architecture built",
    carlosCaveat: "Role engine designed; UI shells in place",
    inspectorio: false,
    tradebeyond: false,
    qima: false,
  },
  {
    label: "Projected ROI",
    description: "Return on investment for enterprise clients",
    category: "platform",
    carlos: "7.7×",
    carlosCaveat: "Based on enterprise benchmarks",
    inspectorio: "Not published",
    tradebeyond: "Not published",
    qima: "Not published",
  },
  {
    label: "Multi-language Support",
    description: "Localised interface for global teams",
    category: "platform",
    carlos: true,
    carlosCaveat: "20+ languages",
    inspectorio: true,
    inspectorioCaveat: "Multi-language document processing across platform",
    tradebeyond: true,
    qima: true,
    qimaCaveat: "120+ country operations",
  },
  {
    label: "Offline Inspection Capability",
    description: "Conduct inspections without connectivity",
    category: "platform",
    carlos: "Architecture ready",
    carlosCaveat: "Offline sync engine designed; not yet deployed",
    inspectorio: true,
    tradebeyond: false,
    tradebeyondCaveat: "Requires constant connection",
    qima: "Field mobile tools",
    qimaCaveat: "Field inspectors with mobile tools for on-site work",
  },
];
