import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tagScreen } from "@/utils/clarityTracking";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp, DollarSign, Leaf, BarChart3, ChevronDown, ChevronUp,
  Shield, AlertTriangle, X, Building2, Globe2, Target, Layers,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, ScatterChart, Scatter, ZAxis, Cell, Label,
  ReferenceLine,
} from "recharts";

/* ------------------------------------------------------------------ */
/*  DATA                                                              */
/* ------------------------------------------------------------------ */

const KPI = [
  { label: "TIC Market Size", value: "$250B+", sub: "Global Estimate", icon: BarChart3 },
  { label: "Digital CAGR", value: "~18.5%", sub: "vs 3.5% Legacy Avg", icon: TrendingUp },
  { label: "Est. Tech Funding", value: "$450M+", sub: "Last 5 Years (Cumulative)", icon: DollarSign },
  { label: "Key Trend", value: "ESG & Traceability", sub: "Primary Growth Driver", icon: Leaf },
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
  { name: "Inspectorio", category: "Supply Chain & Quality", founded: "2016", hq: "Minneapolis, US", funding: "$39M Series B", growth: "~45% YoY", strengths: ["Broad supplier network (800+ brands)", "AI-driven risk scoring", "Strong APAC presence"], weaknesses: ["Limited upstream traceability", "AI lacks explainability depth", "No certification capability"], summary: "Leading SaaS QC platform connecting brands and suppliers with real-time quality & compliance data." },
  { name: "Sourcemap", category: "ESG & Traceability", founded: "2011", hq: "New York, US", funding: "$20M Series B", growth: "~35% YoY", strengths: ["Deep multi-tier supply chain mapping", "Strong ESG/due-diligence positioning", "Regulatory readiness (CSDDD, UFLPA)"], weaknesses: ["Relies on self-reported data", "Limited quality/inspection features", "Smaller network effects"], summary: "Supply chain mapping and traceability platform focused on ESG compliance and regulatory readiness." },
  { name: "TradeBeyond", category: "Retail PLM", founded: "2018 (rebrand)", hq: "Hong Kong", funding: "PE-backed", growth: "~15% YoY", strengths: ["End-to-end retail PLM", "Strong in apparel/softlines", "Integrated supplier management"], weaknesses: ["Internal-focused, weak network effects", "Legacy architecture", "Limited AI capabilities"], summary: "Retail-focused PLM and supply chain platform serving apparel and consumer goods brands." },
  { name: "QIMA", category: "Supply Chain & Quality", founded: "2005", hq: "Hong Kong", funding: "$75M (PE)", growth: "~12% YoY", strengths: ["Large inspector network", "Self-serve booking model", "Brand recognition in Asia"], weaknesses: ["Traditional audit model", "Low AI adoption", "Commoditised inspection fees"], summary: "One of the largest independent QC and compliance providers, blending physical inspections with digital booking." },
  { name: "Sedex", category: "ESG & Traceability", founded: "2001", hq: "London, UK", funding: "Non-profit / member-funded", growth: "~10% YoY", strengths: ["Massive SMETA audit database", "85K+ members globally", "Trusted by retailers"], weaknesses: ["Legacy platform UX", "Slow to innovate", "Not AI-enabled"], summary: "Member-driven ethical trade platform hosting the world's largest database of social/environmental audits." },
  { name: "Worldly (Higg)", category: "ESG & Traceability", founded: "2019 (rebrand)", hq: "Oakland, US", funding: "$100M+", growth: "~25% YoY", strengths: ["De-facto ESG measurement (FEM/MSI)", "Strong brand partnerships", "Science-based methodology"], weaknesses: ["Greenwashing scrutiny", "Self-assessed data concerns", "Narrow focus on environmental metrics"], summary: "Environmental and social impact measurement platform, successor to the Higg Index used across apparel and footwear." },
];

const GROWTH_DATA = [
  { name: "Inspectorio", digital: 45, legacy: null },
  { name: "Sourcemap", digital: 35, legacy: null },
  { name: "Worldly", digital: 25, legacy: null },
  { name: "TradeBeyond", digital: 15, legacy: null },
  { name: "QIMA", digital: 12, legacy: null },
  { name: "Sedex", digital: 10, legacy: null },
  { name: "THT", digital: null, legacy: 3.5 },
  { name: "BV", digital: null, legacy: 4.0 },
  { name: "Intertek", digital: null, legacy: 3.0 },
];

const FUNDING_DATA = [
  { year: "2019", amount: 35 },
  { year: "2020", amount: 60 },
  { year: "2021", amount: 120 },
  { year: "2022", amount: 95 },
  { year: "2023", amount: 85 },
  { year: "2024", amount: 55 },
];

const MATRIX_DATA = [
  { name: "Inspectorio", x: 7, y: 8, z: 800, cat: "Challenger" },
  { name: "Sourcemap", x: 5, y: 9, z: 400, cat: "Challenger" },
  { name: "Worldly", x: 4, y: 7, z: 500, cat: "Challenger" },
  { name: "QIMA", x: 6, y: 3, z: 600, cat: "Traditional" },
  { name: "TradeBeyond", x: 8, y: 3, z: 350, cat: "PLM" },
  { name: "Sedex", x: 3, y: 5, z: 700, cat: "Traditional" },
  { name: "THT", x: 9, y: 4, z: 2000, cat: "Incumbent" },
  { name: "CARLOS", x: 9, y: 9, z: 300, cat: "CARLOS" },
];

const COLORS: Record<string, string> = {
  Challenger: "hsl(var(--accent-blue))",
  Traditional: "hsl(var(--muted-foreground))",
  PLM: "hsl(var(--accent-purple))",
  Incumbent: "hsl(var(--accent-orange))",
  CARLOS: "hsl(var(--primary))",
};

/* ------------------------------------------------------------------ */
/*  SECTIONS                                                          */
/* ------------------------------------------------------------------ */

const NAV_ITEMS = ["Executive Summary", "The Challengers", "Market Analysis", "Strategic Outlook"] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.35 } }),
};

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
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            The Rise of Digital Platforms in TIC
          </h1>
          <p className="text-muted-foreground max-w-3xl text-base leading-relaxed">
            The $250B+ Testing, Inspection, and Certification industry is undergoing a pivotal shift. While legacy giants grow at 3-5%, digital-native platforms focusing on supply chain transparency and ESG compliance are seeing growth rates exceeding 40%.
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

        {/* Why This Matters */}
        <Card className="mt-10 border-primary/20">
          <CardContent className="p-6">
            <h3 className="font-display font-semibold text-foreground mb-2">Why This Matters Now</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Regulatory pressure (e.g., EU Digital Product Passport, Uyghur Forced Labor Prevention Act) is forcing brands to move beyond static "pass/fail" certificates to dynamic, real-time supply chain mapping. This demand is fuelling the rapid ascent of SaaS platforms that offer network-based data transparency rather than just individual audits.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* ============ THE CHALLENGERS ============ */}
      <section id="The Challengers" className="bg-muted/30 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-2xl font-bold text-foreground mb-1">The Digital Challengers</h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
            Explore the profiles of the fastest-growing companies disrupting the traditional TIC landscape. Click on any card for deep-dive metrics.
          </p>

          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {["All", "Supply Chain & Quality", "ESG & Traceability", "Retail PLM"].map((f) => (
              <Button
                key={f}
                size="sm"
                variant={filter === f ? "default" : "outline"}
                onClick={() => setFilter(f)}
                className="text-xs"
              >
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
                      <span className="flex items-center gap-1"><TrendingUp className="h-3 w-3 text-accent-green" />{c.growth}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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
      <section id="Market Analysis" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-display text-2xl font-bold text-foreground mb-1">Market Intelligence Analysis</h2>
        <p className="text-sm text-muted-foreground mb-10 max-w-2xl">
          Quantitative breakdown of the market shift — growth differentials, positioning strategies, and capital inflows.
        </p>

        {/* Growth Chart */}
        <Card className="mb-10">
          <CardContent className="p-6">
            <h3 className="font-display font-semibold text-foreground mb-1">Revenue Growth Velocity: Digital vs. Legacy (YoY %)</h3>
            <p className="text-xs text-muted-foreground mb-4">Digital challengers are decoupling growth from physical headcount, achieving SaaS-like scaling.</p>
            <div className="w-full h-[350px]">
              <ResponsiveContainer>
                <BarChart data={GROWTH_DATA} layout="vertical" margin={{ left: 80, right: 20, top: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" domain={[0, 50]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} width={75} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="digital" fill="hsl(var(--primary))" name="Digital" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="legacy" fill="hsl(var(--muted-foreground))" name="Legacy" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Positioning Matrix */}
        <Card className="mb-10">
          <CardContent className="p-6">
            <h3 className="font-display font-semibold text-foreground mb-1">Competitive Positioning Matrix</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Players mapped by <strong>Platform Depth</strong> (X) and <strong>Network Effects</strong> (Y). Bubble size ≈ relative scale.
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

        {/* Funding Chart */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-display font-semibold text-foreground mb-1">Capital Inflow: TIC Tech Funding Trend (Est.)</h3>
            <p className="text-xs text-muted-foreground mb-4">Estimated cumulative funding into TIC digital platforms by year.</p>
            <div className="w-full h-[300px]">
              <ResponsiveContainer>
                <LineChart data={FUNDING_DATA} margin={{ left: 10, right: 20, top: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="year" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                  <Line type="monotone" dataKey="amount" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} name="Funding ($M)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ============ STRATEGIC OUTLOOK ============ */}
      <section id="Strategic Outlook" className="bg-muted/30 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-2xl font-bold text-foreground mb-1">Strategic Implications & Risks</h2>
          <p className="text-sm text-muted-foreground mb-8">What this shift means for stakeholders, incumbents, and the future of the industry.</p>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Incumbent Strategy */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-display font-semibold text-foreground flex items-center gap-2 mb-4">
                  <Shield className="h-4 w-4 text-primary" /> Incumbent Strategy (SGS, BV, Intertek)
                </h3>
                {[
                  { title: '"Phygital" Hybrid Models', desc: 'Leveraging massive physical footprint (labs/inspectors) to feed proprietary data platforms. Selling "trust" backed by physical verification, which pure software players lack.' },
                  { title: "Strategic M&A", desc: "Acquiring niche software players to plug capability gaps (e.g., specialised ESG audit tools or cybersecurity certification firms)." },
                  { title: "Certification-as-a-Service", desc: "Moving from transaction-based fees to subscription models for continuous compliance monitoring." },
                ].map((s) => {
                  const key = `inc-${s.title}`;
                  return (
                    <div key={key} className="mb-3">
                      <button className="flex items-center justify-between w-full text-left" onClick={() => setOpenRisks(p => ({ ...p, [key]: !p[key] }))}>
                        <span className="text-sm font-medium text-foreground">{s.title}</span>
                        {openRisks[key] ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                      </button>
                      <AnimatePresence>
                        {openRisks[key] && (
                          <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="text-xs text-muted-foreground mt-1 leading-relaxed overflow-hidden">
                            {s.desc}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Risks */}
            <Card className="border-destructive/20">
              <CardContent className="p-6">
                <h3 className="font-display font-semibold text-foreground flex items-center gap-2 mb-4">
                  <AlertTriangle className="h-4 w-4 text-destructive" /> Key Risks & Vulnerabilities
                </h3>
                {[
                  { title: "Data Integrity Gap", desc: 'Pure platforms rely on self-reported supplier data. Without physical validation (the incumbent moat), data quality can degrade ("Garbage In, Garbage Out").' },
                  { title: "Platform Commoditisation", desc: "As basic traceability becomes a regulatory commodity (EU DPP), software margins may compress unless advanced analytics/AI provide new value." },
                  { title: "Regulatory Fragmentation", desc: "Diverging standards between EU, US, and Asia create complex compliance logic that is hard to scale in a single software codebase." },
                ].map((r) => {
                  const key = `risk-${r.title}`;
                  return (
                    <div key={key} className="mb-3">
                      <button className="flex items-center justify-between w-full text-left" onClick={() => setOpenRisks(p => ({ ...p, [key]: !p[key] }))}>
                        <span className="text-sm font-medium text-foreground flex items-center gap-2">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-destructive/10 text-destructive text-[10px] font-bold">!</span>
                          {r.title}
                        </span>
                        {openRisks[key] ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                      </button>
                      <AnimatePresence>
                        {openRisks[key] && (
                          <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="text-xs text-muted-foreground mt-1 ml-7 leading-relaxed overflow-hidden">
                            {r.desc}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="text-center py-8 text-xs text-muted-foreground border-t">
        Analysis based on public filings, Crunchbase, Pitchbook, and press releases (2020-2024). © 2024 TIC Market Intelligence.
      </div>
    </div>
  );
};

export default DigitalShiftPage;
