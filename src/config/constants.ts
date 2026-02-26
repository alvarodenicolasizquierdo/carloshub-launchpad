export const APP_URLS: Record<string, string> = {
  portal: "https://tht-carlos.lovable.app",
  ai: "https://tht-ai-carlos.lovable.app",
  blue: "https://tht-bs-carlos.lovable.app",
  smart: "https://tht-smart-adv.lovable.app",
};

export const APPS = [
  {
    id: "portal",
    name: "CARLOS Portal",
    icon: "Shield" as const,
    colorClass: "text-accent-blue",
    bgClass: "bg-accent-blue/10",
    borderClass: "border-accent-blue/30",
    description: "Core compliance lifecycle management — styles, components, TRFs, suppliers",
    stats: { screens: 19, components: 180, ai: 8 },
    bestFor: "Full lifecycle demos, Client buyers",
    keyRoutes: [
      { label: "Dashboard", route: "/" },
      { label: "Styles", route: "/styles" },
      { label: "Components", route: "/components" },
      { label: "TRFs", route: "/trfs" },
      { label: "Suppliers", route: "/suppliers" },
      { label: "Analytics", route: "/analytics" },
    ],
  },
  {
    id: "ai",
    name: "CARLOS AI",
    icon: "Brain" as const,
    colorClass: "text-accent-purple",
    bgClass: "bg-accent-purple/10",
    borderClass: "border-accent-purple/30",
    description: "AI reasoning transparency — task prioritisation, care labelling, scenario simulation, approval levels",
    stats: { screens: 25, components: 150, ai: 15 },
    bestFor: "C-Suite demos, AI showcase",
    keyRoutes: [
      { label: "AI Dashboard", route: "/" },
      { label: "Care Labelling", route: "/care-labelling" },
      { label: "TRF Detail", route: "/trfs/trf-001" },
      { label: "Analytics", route: "/analytics" },
      { label: "Approval Levels", route: "/approval-levels" },
    ],
  },
  {
    id: "blue",
    name: "CARLOS BLUE",
    icon: "Leaf" as const,
    colorClass: "text-accent-green",
    bgClass: "bg-accent-green/10",
    borderClass: "border-accent-green/30",
    description: "Sustainability evidence management — AI1–AI6 pipeline, DPP export, scheme-agnostic compliance",
    stats: { screens: 22, components: 120, ai: 6 },
    bestFor: "Sustainability teams, ESG demos, 2027 EU DPP Architected",
    keyRoutes: [
      { label: "Evidence Graph", route: "/sustainability/claims" },
      { label: "DPP Export", route: "/styles/coll-004/dpp" },
      { label: "Styles", route: "/styles" },
      { label: "Components", route: "/components" },
    ],
  },
  {
    id: "smart",
    name: "SMART Advanced",
    icon: "Map" as const,
    colorClass: "text-primary",
    bgClass: "bg-primary/10",
    borderClass: "border-primary/30",
    description: "Operational intelligence — risk assessment world map, component management, style stage progression",
    stats: { screens: 29, components: 65, ai: 3 },
    bestFor: "Technical teams, Operations, Risk assessment",
    keyRoutes: [
      { label: "Risk Map", route: "/risk-assessment" },
      { label: "Styles", route: "/styles" },
      { label: "Components", route: "/components" },
    ],
  },
] as const;

export const WOW_MOMENTS = [
  {
    rank: 1, title: "AI Reasoning Transparency", app: "ai", route: "/",
    steps: [
      "Open the AI Dashboard — look for the 'AI Recommendations' or 'Task Prioritisation' panel.",
      "Click any recommendation card to expand it.",
      "Point to the 'Reasoning' section: the AI explains WHY it flagged this item, citing specific data points.",
      "Say: 'Every recommendation is explainable. The AI shows its full reasoning chain — problem, evidence, consequence, fix.'",
    ],
  },
  {
    rank: 2, title: "Role-Adaptive Views", app: "ai", route: "/",
    steps: [
      "On the AI Dashboard, locate the role selector (top-right or header area).",
      "Switch between roles (e.g., Quality Manager → Buyer → Sustainability Lead).",
      "Point out how the dashboard layout, metrics, and priorities change for each role.",
      "Say: 'Same platform, different lens. Each role sees what matters most to them.'",
    ],
  },
  {
    rank: 3, title: "DPP Export", app: "blue", route: "/styles/coll-004/dpp",
    steps: [
      "The page opens directly on a Digital Product Passport for a specific style.",
      "Scroll through the DPP sections: material composition, supply chain, certifications, environmental impact.",
      "Point to the QR code and export options.",
      "Say: 'EU Digital Product Passport regulation hits in 2027. CARLOS is ready today — one click to generate a compliant DPP.'",
    ],
  },
  {
    rank: 4, title: "Claim Propagation Blocking", app: "blue", route: "/styles/coll-004/sustainability",
    steps: [
      "Open the Style sustainability view — Navy Wool Overcoat with 6 components.",
      "Point to the blocked DPP export: one zipper certificate expired, blocking the bluesign PRODUCT claim.",
      "Click 'Simulate Fix' to show the entire evidence chain cascading to green.",
      "Say: 'CARLOS won't let an invalid claim reach your Digital Product Passport. It catches the gap before your customer does.'",
    ],
  },
  {
    rank: 5, title: "Risk Assessment Map", app: "smart", route: "/risk-assessment",
    steps: [
      "The world map loads with colour-coded risk indicators by region.",
      "Hover over a high-risk region to show the tooltip with supplier count and risk factors.",
      "Click into a region to drill down to individual supplier risk scores.",
      "Say: 'Real-time geopolitical and compliance risk — before it hits your supply chain.'",
    ],
  },
  {
    rank: 6, title: "Scenario Simulator", app: "ai", route: "/",
    steps: [
      "On the AI Dashboard, find the 'Scenario Simulation' or 'What-If' panel.",
      "Select a scenario (e.g., 'Supplier fails audit' or 'New regulation enacted').",
      "Show the impact analysis: which styles, components, and suppliers are affected.",
      "Say: 'What happens if your top supplier fails an audit tomorrow? CARLOS tells you the blast radius in seconds.'",
    ],
  },
  {
    rank: 7, title: "Component N:M Linking", app: "smart", route: "/components",
    steps: [
      "Open /components and pick any component (e.g., 'Organic Cotton Jersey 180gsm').",
      "Click into the component detail card.",
      "Scroll to the 'Linked Styles' panel — point out that this single component is shared across multiple styles.",
      "Say: 'In production, when a lab result updates on this component, every linked style inherits the change automatically. Update once, comply everywhere.'",
    ],
  },
  {
    rank: 8, title: "Self-Documenting Platform", app: "portal", route: "/documentation",
    steps: [
      "The documentation page opens with auto-generated platform docs.",
      "Scroll through the sections: API reference, data model, workflow definitions.",
      "Point out that the documentation is generated from the live system — always up to date.",
      "Say: 'The platform documents itself. No stale wikis, no outdated PDFs — the docs are the system.'",
    ],
  },
  {
    rank: 9, title: "AI Narratives", app: "ai", route: "/analytics",
    steps: [
      "Open the Analytics page — charts and KPIs load.",
      "Point to the AI-generated narrative summary below or beside the charts.",
      "Highlight how the narrative explains trends, anomalies, and recommended actions in plain language.",
      "Say: 'The AI doesn't just show you charts — it tells you what they mean and what to do next.'",
    ],
  },
  {
    rank: 10, title: "TRF Lifecycle", app: "smart", route: "/styles",
    steps: [
      "Open /styles and select any style to show the stage progression pipeline.",
      "Point to the lifecycle stages: Draft → Submitted → In Testing → Approved.",
      "Show how each stage has associated TRFs, test results, and approval gates.",
      "Say: 'Full traceability from concept to shelf. Every test, every approval, every decision — captured and auditable.'",
    ],
  },
];

export const HERO_STATS = [
  { label: "Apps", value: 4, icon: "Layers" as const },
  { label: "Screens", value: 95, icon: "Monitor" as const },
  { label: "ML Features", value: 847, icon: "Brain" as const },
  { label: "Components", value: 515, icon: "Blocks" as const },
  { label: "Suppliers", value: "14K+", icon: "Globe" as const },
  { label: "ROI", value: "£5.5M", icon: "TrendingUp" as const },
];

export const STORAGE_KEYS = {
  onboardingComplete: "carlos_onboarding_complete",
  presenterName: "carlos_presenter_name",
  clientName: "carlos_client_name",
  audience: "carlos_audience",
  enabledApps: "carlos_enabled_apps",
  appUrls: "carlos_app_urls",
  theme: "carlos_theme",
} as const;

const ALLOWED_DOMAINS = [".lovable.app", ".lovable.dev", ".dnaventures.es"];

export function getAppUrl(appId: string): string {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEYS.appUrls) || "{}");
    if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
      return APP_URLS[appId] || "";
    }
    const override = raw[appId];
    if (typeof override !== "string") {
      return APP_URLS[appId] || "";
    }
    // Validate URL format and restrict to trusted domains
    const url = new URL(override);
    const isTrusted = ALLOWED_DOMAINS.some((d) => url.hostname.endsWith(d));
    if (!isTrusted || !["https:", "http:"].includes(url.protocol)) {
      return APP_URLS[appId] || "";
    }
    return override;
  } catch {
    return APP_URLS[appId] || "";
  }
}

export function getPresenterName(): string {
  return localStorage.getItem(STORAGE_KEYS.presenterName) || "Alvaro de Nicolas";
}

export function getAppName(appId: string): string {
  return APPS.find((a) => a.id === appId)?.name || appId;
}
