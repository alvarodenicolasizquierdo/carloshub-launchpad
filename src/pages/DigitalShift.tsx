import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tagScreen } from "@/utils/clarityTracking";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp, DollarSign, Leaf, BarChart3, ChevronDown, ChevronUp,
  Shield, AlertTriangle, X, Building2, Globe2, Target, Layers,
  Zap, Factory, Users, ShoppingCart, Brain, MapPin,
  ArrowRight, CheckCircle2, XCircle, Clock,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, ScatterChart, Scatter, ZAxis, Cell, Label,
  ReferenceLine, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";

/* ------------------------------------------------------------------ */
/*  DATA                                                              */
/* ------------------------------------------------------------------ */

const KPI = [
  { label: "TIC Market Size", value: "$240–312B", sub: "2025 Global (→ $540B by 2035)", icon: BarChart3 },
  { label: "Digital CAGR", value: "~18.5%", sub: "vs 3–6% Legacy Avg", icon: TrendingUp },
  { label: "Competitor Funding", value: "$2.1B+", sub: "Verified (Crunchbase/PitchBook)", icon: DollarSign },
  { label: "M&A Deals", value: "1,300+", sub: "2015–2025 (Digital/AI focus)", icon: Layers },
];

const DRIVERS = [
  { icon: Zap, title: "Regulatory Tsunami", desc: "CSRD expanding to 50,000 companies by 2028. DPP mandatory for batteries & textiles (2027). UFLPA adding 78 entities. Creates non-discretionary demand.", score: "9/10" },
  { icon: Globe2, title: "Supply Chain Fragility", desc: "83% of executives rank resilience equal to cybersecurity. 76% of European shippers had 5+ disruptions in 2024. $184M avg. disruption cost (Fortune 500).", score: "8/10" },
  { icon: ShoppingCart, title: "Retailer as Regulator", desc: "Amazon Direct Validation bypasses sellers; Inditex/Walmart enforce closed-loop ecosystems. Platform accreditation now as important as ISO.", score: "8/10" },
  { icon: Brain, title: "AI & Tech Disruption", desc: "AI-natives scaling rapidly — Inspectorio manages 4B products; Altana does multi-tier mapping; Prewave monitors 250K+ suppliers. Lab robotics market: $2.79B → $5.21B by 2034.", score: "9/10" },
  { icon: Leaf, title: "ESG Institutionalization", desc: "SGS targeting CHF 600M sustainability revenue by 2027. 6–8% price premiums accepted for verified ESG. ESG is now investment-grade data, not voluntary reporting.", score: "7/10" },
  { icon: MapPin, title: "Geographic Divergence", desc: "EU accelerating (CSRD, DPP, CSDDD). U.S. uncertain — BCG flags 'deregulation could limit growth tailwind.' Creates multi-speed regulatory world.", score: "6/10" },
];

const BEFORE_NOW = {
  before: [
    { dim: "Business model", val: "Transactional — per test / per inspection" },
    { dim: "Value proposition", val: "Pass/fail certification, geographic coverage" },
    { dim: "Technology", val: "PDF portals, siloed LIMS — data mover, not insight" },
    { dim: "Competition", val: "Lab footprint, turnaround speed, price" },
    { dim: "Supply chain", val: "Tier 1 only — direct supplier" },
    { dim: "Margins", val: "10–15% EBIT baseline (BCG 2018)" },
  ],
  now: [
    { dim: "Business model", val: "Hybrid: transactional + SaaS + 'Digital Handling Fees'" },
    { dim: "Value proposition", val: "Verified data interop, supply chain transparency, risk intelligence" },
    { dim: "Technology", val: "Integrated platforms (67% automotive); API-first for ERP/Amazon" },
    { dim: "Competition", val: "Platform ecosystems, AI insights, ESG assurance (premium)" },
    { dim: "Supply chain", val: "Multi-tier to raw material (UFLPA/CSDDD mandate)" },
    { dim: "Margins", val: "6–8% avg, high variability — bifurcating" },
  ],
};

const GEO_SPEED = [
  { region: "EU", speed: "FAST", score: 9, detail: "CSRD (50K firms by 2028), DPP mandatory 2027, CSDDD enforced" },
  { region: "US", speed: "SLOW", score: 4, detail: "Deregulation risk; UFLPA continues, ESG politicized" },
  { region: "APAC", speed: "MIXED", score: 6, detail: "China own standards; SE Asia follows buyers; India leapfrog" },
];

const FUNDING_TABLE = [
  { name: "EcoVadis", amount: 735.8, desc: "Sustainability ratings utility", scale: "150K+ companies" },
  { name: "Altana AI", amount: 622, desc: "Global trade OS", scale: "$1B unicorn valuation" },
  { name: "Assent", amount: 501.6, desc: "$100M ARR", scale: "$1.3B valuation" },
  { name: "IntegrityNext", amount: 100, desc: "Bootstrapped to profit", scale: "1M suppliers monitored" },
  { name: "Prewave", amount: 98, desc: "AI risk intelligence", scale: "400+ language analysis" },
  { name: "Inspectorio", amount: 64.9, desc: "SaaS quality orchestration", scale: "Direct competitor" },
];

const GROWTH_DATA = [
  { name: "EcoVadis", value: 735.8 },
  { name: "Altana AI", value: 622 },
  { name: "Assent", value: 501.6 },
  { name: "IntegrityNext", value: 100 },
  { name: "Prewave", value: 98 },
  { name: "Inspectorio", value: 64.9 },
  { name: "QIMA", value: 75 },
];

type Company = {
  name: string;
  category: "Supply Chain & Quality" | "ESG & Traceability" | "Retail PLM";
  founded: string;
  hq: string;
  funding: string;
  growth: string;
  strengths: string[];
  weaknesses: string[];
  summary: string;
};

const COMPANIES: Company[] = [
  { name: "Inspectorio", category: "Supply Chain & Quality", founded: "2016", hq: "Minneapolis, US", funding: "$64.9M", growth: "~45% YoY", strengths: ["Broad supplier network (800+ brands)", "AI-driven risk scoring", "Strong APAC presence", "4B products managed"], weaknesses: ["Limited upstream traceability", "AI lacks explainability depth", "No certification capability"], summary: "Leading SaaS QC platform connecting brands and suppliers with real-time quality & compliance data." },
  { name: "Altana AI", category: "Supply Chain & Quality", founded: "2018", hq: "New York, US", funding: "$622M", growth: "~60% YoY", strengths: ["Multi-tier supply chain mapping", "$1B unicorn valuation", "Global trade OS positioning"], weaknesses: ["Enterprise-only pricing", "Complex implementation", "No testing capability"], summary: "AI-powered global trade intelligence platform mapping supply chains across multiple tiers." },
  { name: "EcoVadis", category: "ESG & Traceability", founded: "2007", hq: "Paris, FR", funding: "$735.8M", growth: "~30% YoY", strengths: ["150K+ companies rated", "De-facto sustainability ratings", "Strong brand trust"], weaknesses: ["Self-assessed methodology concerns", "High cost for SMEs", "Limited beyond ratings"], summary: "Global sustainability ratings platform — the most funded player in TIC tech." },
  { name: "Assent", category: "ESG & Traceability", founded: "2010", hq: "Ottawa, CA", funding: "$501.6M", growth: "~40% YoY", strengths: ["$100M ARR achieved", "$1.3B valuation", "Deep regulatory compliance"], weaknesses: ["North America-focused", "Complex onboarding", "Late to EU DPP"], summary: "Supply chain sustainability management platform with $1.3B valuation and $100M ARR." },
  { name: "Prewave", category: "Supply Chain & Quality", founded: "2017", hq: "Vienna, AT", funding: "$98M", growth: "~50% YoY", strengths: ["AI risk intelligence", "400+ language analysis", "250K+ suppliers monitored"], weaknesses: ["No physical inspection", "Early-stage revenue", "Niche focus"], summary: "AI-powered supply chain risk intelligence monitoring 250K+ suppliers across 400+ languages." },
  { name: "QIMA", category: "Supply Chain & Quality", founded: "2005", hq: "Hong Kong", funding: "$75M (PE)", growth: "32% CAGR", strengths: ["4,000+ inspectors, 88 countries", "30,000+ clients", "Physical + Digital hybrid", "PE-backed (TA Associates)"], weaknesses: ["Traditional audit model", "Low AI adoption", "Commoditised inspection fees"], summary: "The hybrid threat — 4,000+ inspectors with 32% revenue CAGR and PE backing." },
];

const MATRIX_DATA = [
  { name: "EcoVadis", x: 5, y: 8, z: 1200, cat: "Challenger" },
  { name: "Altana AI", x: 7, y: 9, z: 1000, cat: "Challenger" },
  { name: "Inspectorio", x: 7, y: 8, z: 800, cat: "Challenger" },
  { name: "Prewave", x: 4, y: 7, z: 400, cat: "Challenger" },
  { name: "QIMA", x: 6, y: 3, z: 600, cat: "Traditional" },
  { name: "Assent", x: 5, y: 7, z: 900, cat: "Challenger" },
  { name: "THT", x: 9, y: 4, z: 2000, cat: "Incumbent" },
  { name: "BV", x: 8, y: 5, z: 1800, cat: "Incumbent" },
  { name: "Intertek", x: 7, y: 3, z: 1600, cat: "Incumbent" },
  { name: "CARLOS", x: 9, y: 9, z: 300, cat: "CARLOS" },
];

const COLORS: Record<string, string> = {
  Challenger: "hsl(var(--accent-blue))",
  Traditional: "hsl(var(--muted-foreground))",
  Incumbent: "hsl(var(--accent-orange))",
  CARLOS: "hsl(var(--primary))",
};

const SCENARIOS = [
  {
    title: "Trust Stack Consolidation",
    probability: "55%",
    badge: "MOST LIKELY",
    badgeColor: "bg-accent-green/10 text-accent-green",
    desc: "Big Three (SGS, BV, Intertek) successfully execute platform strategies. Hybrid physical + digital 'Trust Stack' creates barrier to entry for pure-play tech. EU DPP + US eFiling require verified data that only accredited labs can generate.",
    winner: "Integrated incumbents with hybrid lab/platform model.",
    trigger: "Successful DPP implementation requiring lab-verified data.",
  },
  {
    title: "Tech Bifurcation",
    probability: "30%",
    badge: "PLAUSIBLE",
    badgeColor: "bg-accent-blue/10 text-accent-blue",
    desc: "AI-native platforms (Altana, Inspectorio, Prewave) capture the intelligence layer. Traditional TICs relegated to 'lab-for-hire' subcontractors. Brands use tech platforms for decisions; labs via API calls only.",
    winner: "Tech-first orchestrators + efficient lab networks.",
    trigger: "Legacy TICs fail to deploy usable software; tech solves 'physical truth' via IoT/partnerships.",
  },
  {
    title: "Regulatory Rollback",
    probability: "15%",
    badge: "RISK CASE",
    badgeColor: "bg-destructive/10 text-destructive",
    desc: "Political pushback against ESG mandates (US under Trump, potential EU far-right shift). Demand reverts to core safety testing. Heavy investments in sustainability platforms face write-downs.",
    winner: "Lean, cost-efficient testers.",
    trigger: "Repeal of key EU directives or significant US/EU standards divergence.",
  },
];

const RISK_MATRIX = [
  { risk: "Platform Commoditization", likelihood: "HIGH", impact: "HIGH", rating: "CRITICAL", mitigation: "Build proprietary data moats (chemical lists, unique risk data sets). 'Golden Record' creates lock-in." },
  { risk: "US Regulatory Rollback", likelihood: "HIGH", impact: "MEDIUM", rating: "HIGH", mitigation: "Diversify: ensure sustainability services also deliver operational ROI. Market efficiency, not just compliance." },
  { risk: "Regulatory Fragmentation", likelihood: "HIGH", impact: "MEDIUM", rating: "HIGH", mitigation: "Build flexible 'rules engines' that adapt workflows by jurisdiction. Modular compliance architecture." },
  { risk: "AI 'Hallucination' Liability", likelihood: "MEDIUM", impact: "CRITICAL", rating: "HIGH", mitigation: "Human-in-the-loop for critical safety. Clear liability boundaries in SaaS contracts." },
  { risk: "Talent Shortage", likelihood: "HIGH", impact: "HIGH", rating: "HIGH", mitigation: "Lab automation decouples growth from headcount. Acquire boutique firms for specialized talent." },
  { risk: "'Greenhushing' Demand Shock", likelihood: "MEDIUM", impact: "HIGH", rating: "MEDIUM", mitigation: "Position sustainability = efficiency. Ensure services survive regulatory pauses by delivering cost savings." },
];

const IMPLICATIONS = {
  physical: [
    "Automate over scale: Invest in TLA islands, robotic sample prep, AI visual inspection. Lab automation cuts labor costs up to 80%.",
    "Become data factories: Every test result digitized and API-ready. Retire legacy LIMS for cloud-native systems.",
    "Specialize in high-barrier verticals: Battery testing, 5G/IoT, biopharma. Generalist labs face commoditization.",
    "Accredit for retailer programs: Amazon Direct Validation, Walmart approved lab status = new sales channel.",
    "Bridge to digital platforms: Labs must connect into cOS ecosystems. Physical truth + digital connectivity = competitive moat.",
  ],
  digital: [
    "Evolve to Compliance Operating System: Manage full quality/compliance lifecycle. Not portals — orchestration engines.",
    "Monetize interoperability: Charge for API connectors to Amazon, Walmart, EU DPP registry, SAP.",
    "Deploy AI exception management: Flag the 5 reports out of 1,000 that need attention. Predictive analytics for at-risk suppliers.",
    "Build the 'Golden Record': Single, immutable, interoperable compliance record per product. Enables premium pricing + lock-in.",
    "Enable Green Lane logistics: Digital validation as logistics accelerator. Link compliance data to customs clearance speed.",
  ],
};

const ACTIONS = [
  { num: "01", title: "Build the 'Golden Record' Capability", timeline: "NOW → Q4 2026", roi: "Enables premium 'Digital Handling Fees' (est. 15–20% uplift). Increases switching costs. Non-negotiable for EU market access by 2027." },
  { num: "02", title: "Monetize Interoperability", timeline: "Q1 → Q3 2026", roi: "New recurring SaaS revenue stream. Transforms vendor → infrastructure partner. 347% ROI over 3 years (Boomi/Forrester)." },
  { num: "03", title: "Deploy AI Exception Management", timeline: "Q2 2026 → Q1 2027", roi: "30–40% reduction in operational overhead. Faster turnaround. Competitive defense against Inspectorio/Prewave." },
  { num: "04", title: "Acquire 'Data-First' Competitors", timeline: "H2 2026 → H1 2027", roi: "Immediate digital talent + IP. Cross-sell digital services to entire physical client base." },
  { num: "05", title: "Pivot to 'Green Lane' Value Propositions", timeline: "Q3 2026 → 2027", roi: "Direct impact on client working capital cycles. Speed-to-market justifies higher margins." },
];

/* ------------------------------------------------------------------ */
/*  NAV & ANIMATION                                                   */
/* ------------------------------------------------------------------ */

const NAV_ITEMS = [
  "Executive Summary", "6 Drivers", "Before vs Now", "Competitive Investment",
  "The Challengers", "Market Analysis", "Scenarios & Risk", "Implications", "Actions",
] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.35 } }),
};

const ratingColor = (r: string) => {
  if (r === "CRITICAL") return "bg-destructive/15 text-destructive";
  if (r === "HIGH") return "bg-accent-orange/15 text-accent-orange";
  return "bg-yellow-500/15 text-yellow-600";
};

/* ------------------------------------------------------------------ */
/*  PAGE                                                              */
/* ------------------------------------------------------------------ */

const DigitalShiftPage = () => {
  const [activeSection, setActiveSection] = useState<string>(NAV_ITEMS[0]);
  const [filter, setFilter] = useState<string>("All");
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [openRisks, setOpenRisks] = useState<Record<string, boolean>>({});

  useEffect(() => { tagScreen("digital-shift"); }, []);

  const filtered = filter === "All" ? COMPANIES : COMPANIES.filter(c => c.category === filter);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Nav */}
      <nav className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl flex items-center gap-6 px-6 overflow-x-auto">
          <span className="font-display font-bold text-primary text-sm whitespace-nowrap py-3">TICIntel</span>
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className={`whitespace-nowrap py-3 text-xs font-medium transition-colors border-b-2 ${
                activeSection === item
                  ? "border-primary text-primary font-semibold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* ============ EXECUTIVE SUMMARY ============ */}
      <section id="Executive Summary" className="mx-auto max-w-6xl px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Badge variant="outline" className="mb-3 text-xs">84 Sources Validated · Confidence: 8/10 · Feb 2026</Badge>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            THE TRUST SHIFT
          </h1>
          <p className="text-lg text-primary font-medium mb-2">From Commodity Testing to the Compliance Operating System</p>
          <p className="text-muted-foreground max-w-3xl text-sm leading-relaxed">
            The TIC industry is undergoing a structural, regulation-driven transformation. Market size: $240–312B (2025), growing at 3–6% CAGR to ~$540B by 2035. 
            Winners will hybridize 'unimpeachable truth' of physical labs with frictionless API-first digital connectivity. Pure testing commoditizes; pure digital lacks regulatory trust.
          </p>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-10">
          {KPI.map((k, i) => (
            <motion.div key={k.label} custom={i} initial="hidden" animate="visible" variants={fadeUp}>
              <Card className="h-full">
                <CardContent className="p-5 text-center">
                  <k.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">{k.label}</p>
                  <p className="font-display text-2xl font-bold text-foreground mt-1">{k.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{k.sub}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Confidence Levels */}
        <Card className="mt-10 border-primary/20">
          <CardContent className="p-6">
            <h3 className="font-display font-semibold text-foreground mb-3">Confidence Levels on 5 Key Predictions</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
              {[
                { claim: "Structural shift thesis", level: "HIGH", color: "text-accent-green" },
                { claim: "EU regulatory expansion", level: "HIGH", color: "text-accent-green" },
                { claim: "US regulatory continuity", level: "LOW", color: "text-destructive" },
                { claim: "Premium willingness-to-pay", level: "MED", color: "text-accent-orange" },
                { claim: "DPP standard interop", level: "MED", color: "text-accent-orange" },
              ].map(c => (
                <div key={c.claim} className="bg-muted/50 rounded-lg p-3 text-center">
                  <p className={`font-bold ${c.color} mb-1`}>{c.level}</p>
                  <p className="text-muted-foreground">{c.claim}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ============ 6 DRIVERS ============ */}
      <section id="6 Drivers" className="bg-muted/30 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-2xl font-bold text-foreground mb-1">Top 6 Drivers of Change</h2>
          <p className="text-sm text-muted-foreground mb-8">The forces that continue to drive structural transformation in the TIC industry.</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DRIVERS.map((d, i) => (
              <motion.div key={d.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Card className="h-full">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                          <d.icon className="h-4 w-4 text-primary" />
                        </div>
                        <h3 className="font-display text-sm font-semibold text-foreground">{d.title}</h3>
                      </div>
                      <Badge variant="outline" className="text-[10px]">{d.score}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{d.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BEFORE VS NOW ============ */}
      <section id="Before vs Now" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-display text-2xl font-bold text-foreground mb-1">The TIC Industry: Before & Now</h2>
        <p className="text-sm text-muted-foreground mb-8">How every dimension of the business has shifted from 2015 to 2026.</p>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-muted-foreground/20">
            <CardContent className="p-5">
              <h3 className="font-display font-semibold text-muted-foreground mb-4 flex items-center gap-2">
                <Clock className="h-4 w-4" /> Before (2015–2019)
              </h3>
              <div className="space-y-3">
                {BEFORE_NOW.before.map(b => (
                  <div key={b.dim} className="text-xs">
                    <span className="font-semibold text-foreground">{b.dim}:</span>{" "}
                    <span className="text-muted-foreground">{b.val}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/20">
            <CardContent className="p-5">
              <h3 className="font-display font-semibold text-primary mb-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" /> Now (2024–2026)
              </h3>
              <div className="space-y-3">
                {BEFORE_NOW.now.map(b => (
                  <div key={b.dim} className="text-xs">
                    <span className="font-semibold text-foreground">{b.dim}:</span>{" "}
                    <span className="text-muted-foreground">{b.val}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Geographic Speed */}
        <Card className="mt-8">
          <CardContent className="p-5">
            <h3 className="font-display font-semibold text-foreground mb-4">Speed of Change by Geography</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              {GEO_SPEED.map(g => (
                <div key={g.region} className="rounded-lg bg-muted/50 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display font-bold text-foreground text-lg">{g.region}</span>
                    <Badge variant="outline" className={`text-[10px] ${g.score >= 8 ? "text-accent-green" : g.score >= 5 ? "text-accent-orange" : "text-destructive"}`}>
                      {g.speed} · {g.score}/10
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{g.detail}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4 italic">
              A multi-speed regulatory world. EU sets the pace; others follow or diverge. Winners build modular 'rules engines' that adapt by jurisdiction.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* ============ COMPETITIVE INVESTMENT ============ */}
      <section id="Competitive Investment" className="bg-muted/30 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-2xl font-bold text-foreground mb-1">Competitive Investment</h2>
          <p className="text-sm text-muted-foreground mb-8">$2B+ is flooding into platforms that compete with us. Verified from Crunchbase, CB Insights, and PitchBook (Feb 2026).</p>

          {/* Revenue Growth Velocity Chart */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="font-display font-semibold text-foreground mb-1">Revenue Growth Velocity: Competitor Funding ($M)</h3>
              <p className="text-xs text-muted-foreground mb-4">These are not startups — they are scaled, well-funded competitors reshaping the TIC landscape.</p>
              <div className="w-full h-[350px]">
                <ResponsiveContainer>
                  <BarChart data={GROWTH_DATA} layout="vertical" margin={{ left: 90, right: 30, top: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" domain={[0, 800]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `$${v}M`} />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} width={85} />
                    <Tooltip
                      contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                      formatter={(val: number) => [`$${val}M`, "Total Funding"]}
                    />
                    <Bar dataKey="value" fill="hsl(var(--primary))" name="Funding" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Funding Table */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {FUNDING_TABLE.map((f, i) => (
              <motion.div key={f.name} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Card className="h-full">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-display text-sm font-semibold text-foreground">{f.name}</h4>
                      <span className="font-display font-bold text-primary">${f.amount}M</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{f.desc}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{f.scale}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* QIMA Callout */}
          <Card className="mt-6 border-accent-orange/30">
            <CardContent className="p-5">
              <h3 className="font-display font-semibold text-foreground flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-accent-orange" /> QIMA — The Hybrid Threat
              </h3>
              <p className="text-xs text-muted-foreground">
                4,000+ inspectors across 88 countries · 30,000+ clients · 32% revenue CAGR · PE-backed (TA Associates) · Physical + Digital hybrid model.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ============ THE CHALLENGERS ============ */}
      <section id="The Challengers" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-display text-2xl font-bold text-foreground mb-1">The Digital Challengers</h2>
        <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
          Profiles of the fastest-growing companies disrupting the traditional TIC landscape. Click any card for deep-dive metrics.
        </p>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["All", "Supply Chain & Quality", "ESG & Traceability", "Retail PLM"].map((f) => (
            <Button key={f} size="sm" variant={filter === f ? "default" : "outline"} onClick={() => setFilter(f)} className="text-xs">
              {f}
            </Button>
          ))}
        </div>

        {/* Company Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c, i) => (
            <motion.div key={c.name} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <Card className="cursor-pointer card-hover h-full" onClick={() => setSelectedCompany(c)}>
                <CardContent className="p-5 flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10">
                      <Building2 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-sm font-semibold text-foreground">{c.name}</h3>
                      <Badge variant="outline" className="text-[10px]">{c.category}</Badge>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{c.summary}</p>
                  <div className="flex items-center gap-3 mt-auto text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Globe2 className="h-3 w-3" />{c.hq}</span>
                    <span className="flex items-center gap-1"><DollarSign className="h-3 w-3 text-primary" />{c.funding}</span>
                    <span className="flex items-center gap-1"><TrendingUp className="h-3 w-3 text-accent-green" />{c.growth}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Company Detail Modal */}
        <AnimatePresence>
          {selectedCompany && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedCompany(null)}
            >
              <motion.div
                className="bg-card rounded-xl shadow-xl max-w-lg w-full p-6 relative"
                initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="absolute top-3 right-3 text-muted-foreground hover:text-foreground" onClick={() => setSelectedCompany(null)}>
                  <X className="h-5 w-5" />
                </button>
                <h3 className="font-display text-xl font-bold text-foreground">{selectedCompany.name}</h3>
                <Badge variant="outline" className="mt-1 text-xs">{selectedCompany.category}</Badge>
                <p className="text-sm text-muted-foreground mt-3">{selectedCompany.summary}</p>
                <div className="grid grid-cols-3 gap-3 mt-4 text-xs">
                  <div className="bg-muted/50 rounded-md p-2 text-center"><span className="block text-muted-foreground">Founded</span><span className="font-semibold text-foreground">{selectedCompany.founded}</span></div>
                  <div className="bg-muted/50 rounded-md p-2 text-center"><span className="block text-muted-foreground">Funding</span><span className="font-semibold text-foreground">{selectedCompany.funding}</span></div>
                  <div className="bg-muted/50 rounded-md p-2 text-center"><span className="block text-muted-foreground">Growth</span><span className="font-semibold text-foreground text-accent-green">{selectedCompany.growth}</span></div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="text-xs font-semibold text-accent-green mb-1">Strengths</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {selectedCompany.strengths.map(s => <li key={s} className="flex gap-1.5"><span className="text-accent-green">•</span>{s}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-destructive mb-1">Weaknesses</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {selectedCompany.weaknesses.map(w => <li key={w} className="flex gap-1.5"><span className="text-destructive">•</span>{w}</li>)}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ============ MARKET ANALYSIS ============ */}
      <section id="Market Analysis" className="bg-muted/30 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-2xl font-bold text-foreground mb-1">Strategic Positioning Matrix</h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
            Where value is migrating — from Legacy Generalists (bottom-left) toward the Orchestrator quadrant (top-right).
          </p>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-display font-semibold text-foreground mb-1">Competitive Positioning: Platform Depth × Network Effects</h3>
              <p className="text-xs text-muted-foreground mb-4">
                The 'kill zone' is bottom-left where firms compete solely on price without digital differentiation.
              </p>
              <div className="w-full h-[400px]">
                <ResponsiveContainer>
                  <ScatterChart margin={{ top: 20, right: 30, bottom: 30, left: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" dataKey="x" domain={[0, 10]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}>
                      <Label value="Platform Depth →" position="bottom" offset={10} style={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                    </XAxis>
                    <YAxis type="number" dataKey="y" domain={[0, 10]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}>
                      <Label value="Network Effects →" angle={-90} position="insideLeft" offset={-15} style={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                    </YAxis>
                    <ZAxis type="number" dataKey="z" range={[80, 400]} />
                    <Tooltip
                      contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                      formatter={(_val: any, _name: string, props: any) => [props.payload.name, props.payload.cat]}
                    />
                    <ReferenceLine x={5} stroke="hsl(var(--border))" strokeDasharray="4 4" />
                    <ReferenceLine y={5} stroke="hsl(var(--border))" strokeDasharray="4 4" />
                    <Scatter data={MATRIX_DATA} name="Companies">
                      {MATRIX_DATA.map((entry) => (
                        <Cell key={entry.name} fill={COLORS[entry.cat] || "hsl(var(--primary))"} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-3 mt-4 text-xs text-muted-foreground">
                {Object.entries(COLORS).map(([cat, color]) => (
                  <span key={cat} className="flex items-center gap-1.5">
                    <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: color }} /> {cat}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ============ SCENARIOS & RISK ============ */}
      <section id="Scenarios & Risk" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-display text-2xl font-bold text-foreground mb-1">Three Scenarios for TIC (2026–2028)</h2>
        <p className="text-sm text-muted-foreground mb-8">Critical assumption: EU regulatory continuity (codified, HIGH confidence). U.S. trajectory uncertain.</p>

        <div className="grid gap-4 md:grid-cols-3 mb-12">
          {SCENARIOS.map((s, i) => (
            <motion.div key={s.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <Card className="h-full">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={`text-[10px] ${s.badgeColor}`}>{s.badge} ({s.probability})</Badge>
                  </div>
                  <h3 className="font-display text-sm font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">{s.desc}</p>
                  <div className="space-y-2 text-xs">
                    <p><span className="font-semibold text-foreground">Who wins:</span> <span className="text-muted-foreground">{s.winner}</span></p>
                    <p><span className="font-semibold text-foreground">Key trigger:</span> <span className="text-muted-foreground">{s.trigger}</span></p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Risk Matrix */}
        <h2 className="font-display text-2xl font-bold text-foreground mb-1">Risk Matrix: Likelihood × Impact</h2>
        <p className="text-sm text-muted-foreground mb-6">The two highest-rated risks (Platform Commoditization + Talent Shortage) reinforce each other.</p>
        <div className="space-y-3">
          {RISK_MATRIX.map((r) => (
            <Card key={r.risk}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge className={`text-[10px] ${ratingColor(r.rating)}`}>{r.rating}</Badge>
                  <h4 className="font-display text-sm font-semibold text-foreground flex-1">{r.risk}</h4>
                  <span className="text-[10px] text-muted-foreground">L: {r.likelihood} · I: {r.impact}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{r.mitigation}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ============ IMPLICATIONS ============ */}
      <section id="Implications" className="bg-muted/30 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-2xl font-bold text-foreground mb-1">Implications for Incumbents</h2>
          <p className="text-sm text-muted-foreground mb-8">Physical labs and digital platforms have distinct but converging strategies.</p>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-display font-semibold text-foreground flex items-center gap-2 mb-4">
                  <Factory className="h-4 w-4 text-accent-orange" /> Physical Labs
                </h3>
                <ul className="space-y-3">
                  {IMPLICATIONS.physical.map((item, i) => (
                    <li key={i} className="text-xs text-muted-foreground leading-relaxed flex gap-2">
                      <span className="text-accent-orange mt-0.5 shrink-0">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="p-6">
                <h3 className="font-display font-semibold text-foreground flex items-center gap-2 mb-4">
                  <Layers className="h-4 w-4 text-primary" /> Digital Platforms
                </h3>
                <ul className="space-y-3">
                  {IMPLICATIONS.digital.map((item, i) => (
                    <li key={i} className="text-xs text-muted-foreground leading-relaxed flex gap-2">
                      <span className="text-primary mt-0.5 shrink-0">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8 border-primary/20 bg-primary/5">
            <CardContent className="p-5 text-center">
              <p className="text-sm font-medium text-foreground">
                By 2030: the lab IS the data factory · the platform IS the customer interface · <span className="text-primary font-bold">WINNERS HYBRIDIZE BOTH</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ============ RECOMMENDED ACTIONS ============ */}
      <section id="Actions" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-display text-2xl font-bold text-foreground mb-1">Recommended Actions & ROI</h2>
        <p className="text-sm text-muted-foreground mb-8">Five prioritized actions with timeline and expected return.</p>

        <div className="space-y-4">
          {ACTIONS.map((a, i) => (
            <motion.div key={a.num} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="flex items-center justify-center w-16 shrink-0 bg-primary/10">
                      <span className="font-display font-bold text-primary text-lg">{a.num}</span>
                    </div>
                    <div className="p-5 flex-1">
                      <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                        <h3 className="font-display text-sm font-bold text-foreground">{a.title}</h3>
                        <Badge variant="outline" className="text-[10px]">{a.timeline}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        <span className="font-semibold text-foreground">ROI:</span> {a.roi}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Closing */}
        <Card className="mt-12 border-primary/30 bg-primary/5">
          <CardContent className="p-8 text-center">
            <h3 className="font-display text-xl font-bold text-foreground mb-3">The Window Is Open. Now.</h3>
            <div className="space-y-2 text-sm text-muted-foreground max-w-2xl mx-auto">
              <p>The structural shift is real and irreversible in premium segments.</p>
              <p>Winners hybridize physical lab credibility with digital platform connectivity.</p>
              <p className="font-medium text-foreground">Pure testing commoditizes. Pure digital lacks regulatory trust.</p>
              <p>DPP mandatory timelines (2027) create a <span className="text-primary font-bold">hard deadline</span> for platform readiness.</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <div className="text-center py-8 text-xs text-muted-foreground border-t">
        Analysis based on 84 validated sources: BCG TIC 2025, EY TIC Study 2025, SGS 2024 IR, Mordor Intelligence, Crunchbase, PitchBook, EU Commission. © 2026 DNAVentures Insight.
      </div>
    </div>
  );
};

export default DigitalShiftPage;
