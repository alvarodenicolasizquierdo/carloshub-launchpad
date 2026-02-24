import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { tagScreen, startEngagementTimer, trackAppExit } from "@/utils/clarityTracking";
import { usePresentation } from "@/contexts/PresentationContext";
import { useDemoMode } from "@/contexts/DemoModeContext";
import { InternalOnly } from "@/components/InternalOnly";
import {
  Layers,
  Monitor,
  Brain,
  Blocks,
  Globe,
  TrendingUp,
  ChevronDown,
  Shield,
  Leaf,
  Map,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCountUp } from "@/hooks/use-count-up";
import { APPS, WOW_MOMENTS, getAppUrl, APP_URLS } from "@/config/constants";


const STAT_ICONS: Record<string, React.ElementType> = { Layers, Monitor, Brain, Blocks, Globe, TrendingUp };
const APP_ICONS: Record<string, React.ElementType> = { Shield, Brain, Leaf, Map };

function StatCard({ label, value, iconName }: { label: string; value: number | string; iconName: string }) {
  const Icon = STAT_ICONS[iconName] || Layers;
  const isNumeric = typeof value === "number";
  const { count, ref } = useCountUp(isNumeric ? value : 0, 2000);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-1 css-fade-slide-up"
    >
      <Icon className="w-6 h-6 text-primary mb-1" />
      <span className="text-3xl font-display font-bold text-foreground">
        {isNumeric ? count.toLocaleString() : value}
      </span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}

function AppCard({ app }: { app: typeof APPS[number] }) {
  const navigate = useNavigate();
  const Icon = APP_ICONS[app.icon] || Shield;

  return (
    <Card
      className={`cursor-pointer hover:scale-[1.02] transition-all duration-200 border ${app.borderClass} hover:shadow-lg`}
      onClick={() => navigate("/apps")}
    >
      <CardContent className="p-6 flex flex-col items-center text-center gap-3">
        <div className={`w-12 h-12 rounded-lg ${app.bgClass} flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${app.colorClass}`} />
        </div>
        <h3 className="font-display font-semibold text-foreground">{app.name}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{app.description}</p>
        <p className="text-xs text-muted-foreground">
          {app.stats.screens} screens · {app.stats.components} components · {app.stats.ai} AI
        </p>
      </CardContent>
    </Card>
  );
}

function DataMetric({ value, label, end }: { value: string; label: string; end: number }) {
  const { count, ref } = useCountUp(end, 2000);
  const display = end > 1000 ? count.toLocaleString() : value.includes("£") ? `£${(count / 10).toFixed(1)}M` : count.toLocaleString();

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-display font-bold text-primary">{end > 999 ? count.toLocaleString() : value}</div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

export default function Index() {
  const navigate = useNavigate();
  const [expandedWow, setExpandedWow] = useState<number | null>(null);
  useEffect(() => { tagScreen('index'); return startEngagementTimer('index'); }, []);
  const { isPresenting } = usePresentation();
  const { isDemoMode } = useDemoMode();
  const isInternal = !isPresenting && !isDemoMode;
  const handleLaunch = (appId: string, route: string) => {
    const app = APPS.find(a => a.id === appId);
    trackAppExit(appId, app?.name || appId);
    window.open(getAppUrl(appId) + route, "_blank");
  };

  const appBadge = (appId: string) => {
    const app = APPS.find((a) => a.id === appId);
    if (!app) return null;
    return (
      <span className={`text-xs px-2 py-0.5 rounded-full ${app.bgClass} ${app.colorClass} font-medium`}>
        {app.name}
      </span>
    );
  };

  return (
    <div className="min-h-full">
      {/* Hero */}
      <section className="relative min-h-[calc(100vh-2rem)] flex flex-col items-center justify-center text-center px-8 bg-gradient-to-br from-tht-dark via-tht-charcoal to-tht-dark overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(243,111,33,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(243,111,33,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="relative z-10 max-w-4xl css-fade-slide-up-hero">
          {isInternal && (
            <p className="text-xs tracking-[0.3em] uppercase text-primary font-medium mb-6">
              Prototype — Design Vision
            </p>
          )}

          <span className="font-display text-2xl font-bold text-primary tracking-wider mb-6">THT</span>

          <h1 className="text-7xl font-display font-bold text-foreground mb-4">CARLOS</h1>
          <p className="text-xl text-foreground/80 mb-2">
            Compliance & Assurance Retail Lifecycle Operating System
          </p>
          <div className="w-28 h-0.5 bg-primary mx-auto my-6" />
          <p className="text-lg text-muted-foreground mb-10">
            AI-First Quality Intelligence for Premium Retail
          </p>

          {/* Stats */}
          <div className="grid grid-cols-6 gap-8 mb-10">
            <StatCard label="Apps" value={4} iconName="Layers" />
            <StatCard label="Screens" value={95} iconName="Monitor" />
            <StatCard label="ML Features" value={847} iconName="Brain" />
            <StatCard label="Components" value={515} iconName="Blocks" />
            <StatCard label="Suppliers" value="14K+" iconName="Globe" />
            <StatCard label="ROI" value="£5.5M" iconName="TrendingUp" />
          </div>

          {/* CTAs */}
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/demo")} className="gap-2 text-base px-8">
              Launch Guided Demo →
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/apps")} className="gap-2 text-base px-8 border-primary/40 text-primary hover:bg-primary/10">
              Explore Apps →
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 animate-bounce-down">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </section>

      {/* Gradient divider */}
      <div className="divider-gradient" />

      {/* Value Proposition */}
      <section className="py-20 px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center text-foreground mb-12">
            Four Apps. One Vision.
          </h2>
          <div className="grid grid-cols-4 gap-6">
            {APPS.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        </div>
      </section>

      {/* Gradient divider */}
      <div className="divider-gradient" />

      {/* Data Lineage */}
      <section className="py-20 px-8 bg-tht-dark">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold text-foreground mb-3">
            Built on Real Production Data
          </h2>
          <p className="text-muted-foreground mb-12">
            Validated against a large, long-standing Tier 1 retail customer — 63 tables, 847 ML features, 14,000+ suppliers
          </p>
          <div className="grid grid-cols-4 gap-8">
            <DataMetric value="847" label="ML Features Mapped" end={847} />
            <DataMetric value="63" label="Portfolio Tables" end={63} />
            <DataMetric value="14,000+" label="Suppliers Tracked" end={14000} />
            <DataMetric value="£5.5M" label="Projected Annual ROI" end={55} />
          </div>
        </div>
      </section>

      {/* Wow Moments — presenter only */}
      {isInternal && (
        <section className="py-20 px-8 bg-background">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-center text-foreground mb-12">
              Demo Cheat Sheet — Top 10 Wow Moments
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
              {WOW_MOMENTS.map((item) => {
                const isExpanded = expandedWow === item.rank;
                return (
                  <div key={item.rank} className="border-b border-border/20 last:border-b-0">
                    <button
                      onClick={() => setExpandedWow(isExpanded ? null : item.rank)}
                      className="flex items-center gap-4 p-3 w-full rounded-lg hover:bg-accent/50 transition-colors text-left group"
                    >
                      <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-display font-bold text-sm shrink-0">
                        {item.rank}
                      </span>
                      <span className="flex-1 text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </span>
                      {appBadge(item.app)}
                      <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`} />
                    </button>
                    {isExpanded && item.steps && (
                        <div className="css-expand-down">
                          <ol className="pl-16 pr-4 pb-4 space-y-2">
                            {item.steps.map((step, i) => (
                              <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                                <span className="text-primary font-semibold shrink-0">{i + 1}.</span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ol>
                          <div className="pl-16 pb-4">
                            <button
                              onClick={(e) => { e.stopPropagation(); handleLaunch(item.app, item.route); }}
                              className="text-xs text-primary hover:underline flex items-center gap-1"
                            >
                              Open in app <ExternalLink className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Competitive Positioning — presenter only */}
      {isInternal && (
        <>
        {/* Know Your Market */}
        <section className="py-20 px-8 bg-background">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-center text-foreground mb-12">Know Your Market</h2>
            <div className="grid grid-cols-3 gap-6">
              {[
                { title: "Market Landscape", desc: "See where CARLOS sits vs. Inspectorio, TradeBeyond, and QIMA", path: "/competitive#landscape" },
                { title: "Competitor Battlecards", desc: "Positioning, strengths, weaknesses, and win themes for each competitor", path: "/competitive#battlecards" },
                { title: "Feature Matrix", desc: "Side-by-side AI capabilities with source-backed scoring", path: "/competitive#matrix" },
              ].map((card) => (
                <Card key={card.title} className="cursor-pointer hover:scale-[1.02] transition-all duration-200 border-border/30 hover:shadow-lg hover:border-primary/30" onClick={() => navigate(card.path)}>
                  <CardContent className="p-6 text-center">
                    <h3 className="font-display font-semibold text-foreground mb-2">{card.title}</h3>
                    <p className="text-sm text-muted-foreground">{card.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <div className="divider-gradient" />

        <section className="py-20 px-8 bg-tht-dark">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold text-foreground mb-12">Why CARLOS?</h2>
            <div className="grid grid-cols-3 gap-8">
              {[
                { vs: "vs. Inspectorio", line: "They have AI that cites sources. We have AI that shows the full reasoning chain — problem, evidence, consequence, fix — with confidence ranges, not single numbers." },
                { vs: "vs. TradeBeyond", line: "They have workflow AI and compliance risk scoring. We go deeper — explainability, DPP export, downstream impact visualization, and scenario simulation they don't offer." },
                { vs: "vs. Status Quo", line: "Spreadsheets don't predict. CARLOS does." },
              ].map((item) => (
                <Card key={item.vs} className="border-border/30 bg-card/50">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-display font-semibold text-primary mb-3">{item.vs}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">"{item.line}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        </>
      )}

      {/* Presenter Framing — presenter only */}
      {isInternal && (
        <section className="py-20 px-8 bg-background">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-center text-foreground mb-12">
              Presenter Framing
            </h2>
            <div className="grid grid-cols-2 gap-8">
              <Card className="border-accent-green/30">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-accent-green mb-4 text-lg">✅ SAY</h3>
                  <ul className="space-y-2 text-sm text-foreground">
                    {[
                      "AI that explains itself",
                      "Future-proof architecture",
                      "Scheme-agnostic compliance",
                      "Built on real production data",
                      "EU DPP 2027 Architected",
                      "7.7x ROI on AI investment",
                      "Complements your PLM — not a replacement",
                      "They have features. We have depth.",
                    ].map((s) => (
                      <li key={s} className="flex items-start gap-2">
                        <span className="text-accent-green mt-0.5">•</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-destructive/30">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-destructive mb-4 text-lg">❌ AVOID</h3>
                  <ul className="space-y-2 text-sm text-foreground">
                    {[
                      ['"Prototype"', 'say "design vision"'],
                      ['"Demo"', 'say "preview" or "walkthrough"'],
                      ['"Not ready"', 'say "roadmap to production"'],
                      ['"Might work"', 'say "validated against real data"'],
                      ['"Just a concept"', 'say "strategic asset"'],
                      ['"We built a PLM"', 'say "intelligence layer alongside your PLM"'],
                      ['"It replaces Inspectorio"', 'say "it complements or upgrades your current stack"'],
                      ['"Everything is live"', 'say "architecture validated against real production data"'],
                      ['"They don\'t have AI"', 'acknowledge their AI, then show depth gap'],
                      ['"Inspectorio is a black box"', 'say "they cite sources; we show full reasoning chains"'],
                    ].map(([avoid, instead]) => (
                      <li key={avoid} className="flex items-start gap-2">
                        <span className="text-destructive mt-0.5">•</span>
                        <span>
                          <span className="line-through text-muted-foreground">{avoid}</span>
                          {" → "}
                          <span>{instead}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      {isInternal && (
        <div className="py-6 text-center text-xs text-muted-foreground border-t border-border/20">
          © 2026 THT — Internal Prototype — Not for Distribution
        </div>
      )}
    </div>
  );
}
