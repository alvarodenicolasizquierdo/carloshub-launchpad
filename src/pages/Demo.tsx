import { useState, useEffect } from "react";
import { tagDemoPath, tagScreen } from "@/utils/clarityTracking";
import { usePresentation } from "@/contexts/PresentationContext";
import { useDemoMode } from "@/contexts/DemoModeContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crown,
  ShoppingBag,
  Server,
  Leaf,
  Clock,
  Star,
  ExternalLink,
  ChevronRight,
  Play,
  MessageSquareQuote,
  Shield,
  Brain,
  Map,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { APPS, WOW_MOMENTS, getAppUrl } from "@/config/constants";

/* ─── Audience Definitions ─── */

type AudienceId = "csuite" | "buyer" | "technical" | "sustainability";

interface SecondaryLaunch {
  label: string;
  app: string;
  route: string;
}

interface Act {
  title: string;
  duration: string;
  appId: string;
  route: string;
  secondaryLaunches?: SecondaryLaunch[];
  wowMoments: string[];
  talkTrack: string;
}

interface Audience {
  id: AudienceId;
  label: string;
  subtitle: string;
  icon: React.ElementType;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  totalDuration: string;
  acts: Act[];
}

const AUDIENCES: Audience[] = [
  {
    id: "csuite",
    label: "C-Suite / SteerCo",
    subtitle: "Strategic value, ROI, and AI differentiation",
    icon: Crown,
    colorClass: "text-primary",
    bgClass: "bg-primary/10",
    borderClass: "border-primary/30",
    totalDuration: "25 min",
    acts: [
      {
        title: "Act 1 — The Vision",
        duration: "5 min",
        appId: "ai",
        route: "/",
        wowMoments: ["AI Reasoning Transparency", "Role-Adaptive Views"],
        talkTrack:
          "Open on the AI Dashboard. Highlight how every AI decision shows its full reasoning chain — problem, evidence, consequence, fix. Competitors like Inspectorio do provide cited recommendations — their Paramo AI references source documents and answers NLP queries. Where CARLOS goes further is the full reasoning chain with confidence ranges rather than single scores. That's the difference between a citation and a diagnosis. Switch roles live to show how the same data adapts for a buyer vs. an executive.",
      },
      {
        title: "Act 2 — The Data Foundation",
        duration: "5 min",
        appId: "portal",
        route: "/analytics",
        wowMoments: ["Self-Documenting Platform"],
        talkTrack:
          "Navigate to Analytics. Emphasise that this is built on real production data — 63 tables, 847 ML features, 14,000+ suppliers. Say: 'This isn't a concept. It's validated against your actual data.'",
      },
      {
        title: "Act 3 — Sustainability Edge",
        duration: "8 min",
        appId: "blue",
        route: "/styles/coll-004/dpp",
        wowMoments: ["DPP Export", "Evidence Graph", "Multi-Framework Validation"],
        talkTrack:
          "Show the Digital Product Passport export. Inspectorio has explicit DPP positioning — they offer end-to-end traceability and supplier engagement automation. Where CARLOS differentiates is simultaneous multi-framework validation: bluesign, OEKO-TEX, and ZDHC in a single view. They track compliance. We validate across frameworks simultaneously. That's the difference between a checkbox and a compliance engine.",
      },
      {
        title: "Act 4 — The ROI Close",
        duration: "7 min",
        appId: "ai",
        route: "/analytics",
        wowMoments: ["AI Narratives", "Scenario Simulator"],
        talkTrack:
          "Open AI Narratives to show automated insight generation. Run the scenario simulator to project cost savings. Close with: '7.7x ROI on AI investment — this is the future-proof architecture.'",
      },
    ],
  },
  {
    id: "buyer",
    label: "Client Buyers",
    subtitle: "Day-to-day workflows, compliance lifecycle, speed",
    icon: ShoppingBag,
    colorClass: "text-accent-blue",
    bgClass: "bg-accent-blue/10",
    borderClass: "border-accent-blue/30",
    totalDuration: "34 min",
    acts: [
      {
        title: "Act 1 — Dashboard Overview",
        duration: "5 min",
        appId: "portal",
        route: "/",
        wowMoments: ["Self-Documenting Platform"],
        talkTrack:
          "Start at the Portal Dashboard. Show the at-a-glance compliance status. Say: 'Everything your team needs — one screen, zero spreadsheets.'",
      },
      {
        title: "Act 2 — Style Lifecycle",
        duration: "10 min",
        appId: "portal",
        route: "/styles",
        wowMoments: ["TRF Lifecycle"],
        talkTrack:
          "Walk through a style from creation to approval. Show TRF generation and stage progression. Say: 'From brief to compliant in half the time.'",
      },
      {
        title: "Act 3 — Sustainability & DPP",
        duration: "10 min",
        appId: "blue",
        route: "/sustainability/claims",
        secondaryLaunches: [
          { label: "DPP Export", app: "blue", route: "/styles/coll-004/dpp" },
          { label: "bluesign Propagation", app: "blue", route: "/styles/coll-004/sustainability" },
        ],
        wowMoments: ["Evidence Graph", "AI1-AI6 Pipeline", "DPP Export", "Scheme-Agnostic", "Propagation Blocking"],
        talkTrack:
          "This is where CARLOS changes the game. You're looking at a 6-stage AI pipeline for sustainability evidence. AI1 extracts data from certificates. AI2 auto-links to the right components. AI3 orchestrates verification. AI4 generates assertions. AI5 builds the compliance radar. AI6 narrates it all. No one else in the market has this. And it's scheme-agnostic — bluesign, GOTS, OEKO-TEX, FSC, EU Ecolabel — one system handles them all.\n\nAnd here's the proof it works end-to-end. This overcoat needs bluesign PRODUCT status, but one component's cert expired. Watch the propagation blocker — then watch me fix it live.",
      },
      {
        title: "Act 4 — Intelligence & Control",
        duration: "5 min",
        appId: "ai",
        route: "/analytics",
        secondaryLaunches: [
          { label: "Ask Carlos", app: "ai", route: "/" },
        ],
        wowMoments: ["AI Narratives", "World Map", "Ask Carlos"],
        talkTrack:
          "Let's close with the intelligence layer. Every chart has an AI narrative — it doesn't just show you the number, it explains what changed and why. Look at the world map — every inspection, every risk, visualised globally. And finally — Ask Carlos. Ask it anything about your compliance status. 'Which suppliers have expiring certifications this quarter?' Watch it answer in real-time.",
      },
      {
        title: "Act 5 — Encore",
        duration: "4 min",
        appId: "ai",
        route: "/approval-levels",
        secondaryLaunches: [
          { label: "Competitive Matrix", app: "smart", route: "/risk-assessment" },
        ],
        wowMoments: ["Graduated Autonomy", "Self-Documenting"],
        talkTrack:
          "One more thing. Self-approval levels — you decide how much autonomy CARLOS has. Start conservative, graduate to more automation as trust builds. And the platform documents itself — every feature, every workflow, auto-generated documentation. This platform is not just a tool, it's a strategic asset.",
      },
    ],
  },
  {
    id: "technical",
    label: "Technical / IT",
    subtitle: "Architecture, integrations, data model depth",
    icon: Server,
    colorClass: "text-accent-purple",
    bgClass: "bg-accent-purple/10",
    borderClass: "border-accent-purple/30",
    totalDuration: "35 min",
    acts: [
      {
        title: "Act 1 — Architecture Overview",
        duration: "8 min",
        appId: "portal",
        route: "/documentation",
        wowMoments: ["Self-Documenting Platform"],
        talkTrack:
          "Open the Documentation section. Show the self-documenting architecture — every component, every API, every data flow. Say: 'The platform documents itself. Your team never starts from zero.'",
      },
      {
        title: "Act 2 — AI Under the Hood",
        duration: "10 min",
        appId: "ai",
        route: "/",
        wowMoments: ["AI Reasoning Transparency", "Role-Adaptive Views"],
        talkTrack:
          "Dive into the AI reasoning chain. Show confidence scores, feature importance, and decision trees. Say: 'Full transparency. Full auditability. No magic.'",
      },
      {
        title: "Act 3 — Data Model Depth",
        duration: "10 min",
        appId: "smart",
        route: "/styles",
        wowMoments: ["TRF Lifecycle", "Component N:M Linking"],
        talkTrack:
          "Step 1 — Open /styles and select a style to show the stage progression pipeline. Step 2 — Navigate to /components and select a component — show the 'Linked Styles' panel to demonstrate the N:M relationship (one component → many styles). Step 3 — Point to the linked styles list and explain: 'When any property on this component changes — a test result, a certification — every linked style reflects that change instantly.' Step 4 — Say: '63 tables. 847 features. Update once, comply everywhere — production-grade from day one.'",
      },
      {
        title: "Act 4 — Sustainability Pipeline",
        duration: "7 min",
        appId: "blue",
        route: "/sustainability/claims",
        wowMoments: ["Evidence Graph", "DPP Export"],
        talkTrack:
          "Show the AI1–AI6 evidence pipeline and DPP export. Emphasise scheme-agnostic design. Say: 'BSCI, Higg, SLCP, or your custom scheme — one pipeline handles all.'",
      },
    ],
  },
  {
    id: "sustainability",
    label: "Sustainability / ESG",
    subtitle: "Evidence management, 2027 EU DPP Architected, scheme compliance",
    icon: Leaf,
    colorClass: "text-accent-green",
    bgClass: "bg-accent-green/10",
    borderClass: "border-accent-green/30",
    totalDuration: "27 min",
    acts: [
      {
        title: "Act 1 — Evidence Pipeline",
        duration: "8 min",
        appId: "blue",
        route: "/sustainability/claims",
        wowMoments: ["AI1-AI6 Pipeline", "Evidence Graph", "Certificate AI"],
        talkTrack:
          "Let me show you something that doesn't exist anywhere else in the market. This is a sustainability evidence graph powered by a 6-stage AI pipeline. AI1 extracts claims from uploaded certificates. AI2 links them to the correct components automatically. AI3 orchestrates third-party verification. AI4 generates compliance assertions. AI5 builds a visual compliance radar. AI6 narrates everything for your reports. This is end-to-end sustainability evidence management.",
      },
      {
        title: "Act 2 — bluesign Deep Dive",
        duration: "7 min",
        appId: "blue",
        route: "/components/comp-wol-001",
        secondaryLaunches: [
          { label: "Supplier Profile", app: "blue", route: "/suppliers/sup-001" },
          { label: "Style Propagation", app: "blue", route: "/styles/coll-004/sustainability" },
        ],
        wowMoments: ["Evidence Validation", "Sourcing Intelligence", "Propagation Blocking", "Simulate Fix"],
        talkTrack:
          "Let me show you how CARLOS handles bluesign — and by extension, any certification scheme.\n\nFirst, the component level. Every material has its bluesign evidence panel — certificate details, expiry tracking, verification log. Not a PDF in an email — a living, validated record.\n\nNow watch the sourcing intelligence — CARLOS suggests bluesign-APPROVED alternatives with match scores. If a supplier's certification expires, you already know your options.\n\nBut the real power? Style-level propagation. This overcoat needs bluesign PRODUCT status. One zipper's certificate expired — and the entire style is blocked from DPP export. Click 'Simulate Fix'... and watch it cascade to READY. That's the evidence graph in action.",
      },
      {
        title: "Act 3 — DPP Export",
        duration: "5 min",
        appId: "blue",
        route: "/styles/coll-004/dpp",
        wowMoments: ["DPP Export", "Material Traceability", "EU 2027 Architected"],
        talkTrack:
          "And here's where it all comes together. A Digital Product Passport architected for EU 2027 requirements. Every sustainability claim traced to evidence. Every material composition documented. Every certification verified. Export it, share it, audit it. Inspectorio has DPP tracking — we have multi-framework validation. Your competitors will be building this depth in 2027. You'll already have it deployed.",
      },
      {
        title: "Act 4 — Scheme-Agnostic Architecture",
        duration: "4 min",
        appId: "blue",
        route: "/sustainability/claims",
        wowMoments: ["Multi-Scheme", "Plug-In Architecture", "Future-Proof"],
        talkTrack:
          "Notice something critical — CARLOS doesn't hardcode sustainability schemes. bluesign, GOTS, OEKO-TEX, FSC, EU Ecolabel — they all plug in through the same evidence framework. When a new scheme emerges, you add it to the configuration, not the code. That's future-proofing.",
      },
      {
        title: "Act 5 — AI-Powered Compliance Radar",
        duration: "3 min",
        appId: "ai",
        route: "/analytics",
        wowMoments: ["Compliance Radar", "AI Narratives", "Portfolio View"],
        talkTrack:
          "At the portfolio level, CARLOS gives you a compliance radar with AI narratives. Which suppliers are at risk? Which certifications expire soon? What's your DPP readiness percentage? And the AI explains every metric — not just what the number is, but what it means for your sustainability strategy.",
      },
    ],
  },
];

/* ─── Helpers ─── */

const APP_ICONS: Record<string, React.ElementType> = { Shield, Brain, Leaf, Map };

function getAppMeta(appId: string) {
  return APPS.find((a) => a.id === appId);
}

/* ─── Sub-components ─── */

function AudienceSelector({
  audiences,
  selected,
  onSelect,
}: {
  audiences: Audience[];
  selected: AudienceId;
  onSelect: (id: AudienceId) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {audiences.map((a) => {
        const active = a.id === selected;
        return (
          <button
            key={a.id}
            onClick={() => onSelect(a.id)}
            className={`group relative flex flex-col items-center gap-2 rounded-xl border p-5 transition-all duration-200 ${
              active
                ? `${a.borderClass} ${a.bgClass} shadow-md`
                : "border-border/40 bg-card/40 hover:border-border hover:bg-card/60"
            }`}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                active ? a.bgClass : "bg-muted"
              }`}
            >
              <a.icon className={`h-5 w-5 ${active ? a.colorClass : "text-muted-foreground"}`} />
            </div>
            <span className={`text-sm font-display font-semibold ${active ? "text-foreground" : "text-muted-foreground"}`}>
              {a.label}
            </span>
            <span className="text-[11px] text-muted-foreground text-center leading-tight">{a.subtitle}</span>
            <Badge
              variant="secondary"
              className={`text-[10px] ${active ? `${a.bgClass} ${a.colorClass}` : ""}`}
            >
              <Clock className="h-3 w-3 mr-1" />
              {a.totalDuration}
            </Badge>
          </button>
        );
      })}
    </div>
  );
}

function ActCard({ act, index, audience, isPresenting, isDemoMode }: { act: Act; index: number; audience: Audience; isPresenting: boolean; isDemoMode: boolean }) {
  const app = getAppMeta(act.appId);
  const Icon = app ? APP_ICONS[app.icon] : Shield;
  const url = getAppUrl(act.appId) + act.route;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Card className={`border-l-4 ${audience.borderClass} hover:shadow-lg transition-shadow`}>
        <CardContent className="p-6 flex flex-col gap-4">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-display font-bold ${audience.bgClass} ${audience.colorClass}`}
              >
                {index + 1}
              </span>
              <div>
                <h3 className="font-display font-semibold text-foreground">{act.title}</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  {app && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${app.bgClass} ${app.colorClass} font-medium`}>
                      {app.name}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <Badge variant="outline" className="shrink-0 text-xs gap-1">
              <Clock className="h-3 w-3" />
              {act.duration}
            </Badge>
          </div>

          {/* Wow moments — presenter only */}
          {!isPresenting && !isDemoMode && act.wowMoments.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {act.wowMoments.map((w) => (
                <Badge key={w} variant="secondary" className="text-[11px] gap-1">
                  <Star className="h-3 w-3 text-primary" />
                  {w}
                </Badge>
              ))}
            </div>
          )}

          {/* Talk track — presenter only */}
          {!isPresenting && !isDemoMode && (
            <div className="rounded-lg bg-muted/50 border border-border/30 p-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquareQuote className="h-4 w-4 text-primary shrink-0" />
                <span className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider">
                  Talk Track
                </span>
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed italic whitespace-pre-line">
                "{act.talkTrack}"
              </p>
            </div>
          )}

          {/* Primary launch button */}
          <Button asChild size="sm" variant="outline" className={`w-full gap-2 ${audience.borderClass}`}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <Play className="h-3.5 w-3.5" />
              Open in {app?.name || "App"}
              <ExternalLink className="h-3 w-3 ml-auto" />
            </a>
          </Button>

          {/* Secondary launches */}
          {act.secondaryLaunches && act.secondaryLaunches.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {act.secondaryLaunches.map((sl) => {
                const slApp = getAppMeta(sl.app);
                return (
                  <Button
                    key={sl.label}
                    asChild
                    size="sm"
                    variant="ghost"
                    className="text-xs gap-1.5 h-7 px-3 border border-border/30"
                  >
                    <a href={getAppUrl(sl.app) + sl.route} target="_blank" rel="noopener noreferrer">
                      {sl.label}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ─── Page ─── */

export default function DemoPage() {
  const { isPresenting } = usePresentation();
  const { isDemoMode } = useDemoMode();
  const [selectedAudience, setSelectedAudience] = useState<AudienceId>("csuite");
  const audience = AUDIENCES.find((a) => a.id === selectedAudience)!;

  useEffect(() => { tagScreen("demo"); }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-tht-dark py-20 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-3xl px-6">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl"
          >
            Guided Demo
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            Curated walkthroughs for every audience. Pick a track, follow the acts, and deliver a flawless demo.
          </motion.p>
        </div>
      </section>

      {/* Gradient divider */}
      <div className="divider-gradient" />

      {/* Audience Selector */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <h2 className="font-display text-xl font-semibold text-center text-foreground mb-6">
          Who's in the room?
        </h2>
        <AudienceSelector
          audiences={AUDIENCES}
          selected={selectedAudience}
          onSelect={(id) => { setSelectedAudience(id); tagDemoPath(id); }}
        />
      </section>

      {/* Gradient divider */}
      <div className="divider-gradient" />

      {/* Acts Timeline */}
      <section className="bg-tht-dark py-16">
        <div className="mx-auto max-w-4xl px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedAudience}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground flex items-center gap-3">
                    <audience.icon className={`h-6 w-6 ${audience.colorClass}`} />
                    {audience.label}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">{audience.subtitle}</p>
                </div>
                <Badge variant="outline" className="text-sm gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {audience.totalDuration} total
                </Badge>
              </div>

              <div className="relative">
                {/* Timeline line */}
                <div className={`absolute left-[19px] top-8 bottom-8 w-0.5 bg-border/40`} />

                <div className="flex flex-col gap-6">
                  {audience.acts.map((act, i) => (
                    <div key={act.title} className="relative pl-12">
                      {/* Timeline dot */}
                      <div
                        className={`absolute left-2.5 top-7 h-3 w-3 rounded-full border-2 ${audience.borderClass} bg-card`}
                      />
                      <ActCard act={act} index={i} audience={audience} isPresenting={isPresenting} isDemoMode={isDemoMode} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Quick Tips — presenter only */}
      {!isPresenting && !isDemoMode && (
        <section className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="font-display text-2xl font-bold text-center text-foreground mb-8">
            Presenter Quick Tips
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { tip: 'Say "design vision" not "prototype"', icon: "✅" },
              { tip: 'Say "preview" or "walkthrough" not "demo"', icon: "✅" },
              { tip: "Always show AI reasoning before results", icon: "💡" },
              { tip: "Let the audience click — engagement > slides", icon: "💡" },
              { tip: "Close every act with the ROI number", icon: "📊" },
              { tip: "Keep each act under its time badge", icon: "⏱️" },
              { tip: "Acknowledge competitor strengths before differentiating — 'They have solid AI and DPP positioning. We go deeper.' is more credible than 'They have nothing.'", icon: "🎯" },
              { tip: "Show the depth gap: they cite sources, we show full reasoning chains with confidence ranges", icon: "💡" },
            ].map((item) => (
              <div
                key={item.tip}
                className="flex items-center gap-3 rounded-lg border border-border/30 bg-card/50 p-4 card-hover"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm text-foreground">{item.tip}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Objection Handling — presenter only */}
      {!isPresenting && !isDemoMode && (
        <section className="mx-auto max-w-4xl px-6 pb-16">
          <h2 className="font-display text-2xl font-bold text-center text-foreground mb-8">
            Objection Handling
          </h2>
          <div className="space-y-4">
            <Card className="border-border/30 bg-card/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <MessageSquareQuote className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-display font-semibold text-foreground mb-2">"What about QIMA?"</h3>
                    <p className="text-sm text-foreground/90 leading-relaxed italic">
                      "QIMA is a TIC company that added tech — 2,500 owned inspectors, strong physical presence across 120 countries. Their AI is operational: report summaries, risk flags, incident monitoring. But no DPP product, no reasoning transparency, no scenario modelling, no multi-framework validation. They're a services company with a digital layer. We're building technology that transforms how TIC services are delivered."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}
    </div>
  );
}
