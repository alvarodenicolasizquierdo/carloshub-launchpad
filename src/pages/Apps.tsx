import { useEffect } from "react";
import { motion } from "framer-motion";
import { tagScreen, startEngagementTimer, trackAppExit } from "@/utils/clarityTracking";
import { RefreshCw } from "lucide-react";
import {
  Shield,
  Brain,
  Leaf,
  Map,
  ExternalLink,
  Sparkles,
  FileCheck,
  Layers,
  Globe,
  Users,
  Database,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { APPS, getAppUrl } from "@/config/constants";
import { useAppStatus, type AppStatus } from "@/hooks/use-app-status";

const STATUS_STYLES: Record<AppStatus, { dot: string; label: string }> = {
  checking: { dot: "bg-yellow-400 animate-pulse", label: "Checking…" },
  online: { dot: "bg-emerald-500", label: "Online" },
  offline: { dot: "bg-red-500", label: "Offline" },
};

const ICON_MAP: Record<string, React.ElementType> = {
  Shield,
  Brain,
  Leaf,
  Map,
};

const FEATURES = [
  {
    icon: Sparkles,
    title: "Explainable AI",
    description: "Full reasoning chains — problem, evidence, consequence, fix — with confidence ranges. Goes beyond source citation to show why the AI reached its conclusion and what happens if you disagree.",
  },
  {
    icon: FileCheck,
    title: "2027 EU DPP Architected",
    description: "Architected for 2027 EU DPP requirements with simultaneous multi-framework validation (bluesign + OEKO-TEX + ZDHC). Export-ready compliance documentation in a single view.",
  },
  {
    icon: Layers,
    title: "Scheme-Agnostic",
    description: "Works across BSCI, Higg, SLCP, and custom schemes.",
  },
  {
    icon: Globe,
    title: "Real-Time Risk",
    description: "Live risk scoring across 14,000+ suppliers worldwide.",
  },
  {
    icon: Users,
    title: "Role-Adaptive Views",
    description: "UI adapts to buyer, auditor, or executive automatically.",
  },
  {
    icon: Database,
    title: "Production-Validated",
    description: "Built on 63 tables, 847 ML features from real data.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

const AppsPage = () => {
  const { statuses, refresh } = useAppStatus();
  useEffect(() => { tagScreen('apps'); return startEngagementTimer('apps'); }, []);

  return (
  <div className="min-h-screen">
    {/* ── Hero ── */}
    <section className="relative overflow-hidden bg-tht-dark py-20 text-center">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-3xl px-6">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl"
        >
          Explore the CARLOS Suite
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-4 text-lg text-muted-foreground"
        >
          Four apps. One platform. Purpose-built for retail quality
          intelligence.
        </motion.p>
      </div>
    </section>

    {/* ── App Cards Grid ── */}
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-4 flex items-center justify-end">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-xs text-muted-foreground"
          onClick={() => refresh()}
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Re-check connectivity
        </Button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {APPS.map((app, i) => {
          const Icon = ICON_MAP[app.icon];
          const baseUrl = getAppUrl(app.id);
          return (
            <motion.div
              key={app.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
            >
              <Card
                className={`group h-full border-l-4 ${app.borderClass} bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
              >
                <CardContent className="flex flex-col gap-4 p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                         className={`flex h-10 w-10 items-center justify-center rounded-lg ${app.bgClass} transition-transform duration-300 group-hover:scale-110`}
                       >
                         <Icon className={`h-5 w-5 ${app.colorClass} transition-transform duration-300 group-hover:rotate-6`} />
                      </div>
                      <h2 className="font-display text-xl font-semibold">
                        {app.name}
                      </h2>
                    </div>
                    <div className="flex items-center gap-1.5" title={STATUS_STYLES[statuses[app.id]].label}>
                      <span className={`h-2.5 w-2.5 rounded-full ${STATUS_STYLES[statuses[app.id]].dot}`} />
                      <span className="text-[10px] text-muted-foreground">{STATUS_STYLES[statuses[app.id]].label}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {app.description}
                  </p>

                  {/* Stats */}
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>{app.stats.screens} screens</span>
                    <span className="text-border">|</span>
                    <span>{app.stats.components} components</span>
                    <span className="text-border">|</span>
                    <span>{app.stats.ai} AI features</span>
                  </div>

                  {/* Best for */}
                  <p className="text-xs italic text-muted-foreground">
                    Best for: {app.bestFor}
                  </p>

                  {/* Route pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {app.keyRoutes.map((r) => (
                      <a
                        key={r.label}
                        href={`${baseUrl}${r.route}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Badge
                          variant="secondary"
                          className="cursor-pointer text-[11px] hover:bg-muted"
                        >
                          {r.label}
                        </Badge>
                      </a>
                    ))}
                  </div>

                  {/* Launch */}
                  <Button
                    asChild
                    size="sm"
                    className="mt-auto w-full gap-1.5"
                    onClick={() => trackAppExit(app.id, app.name)}
                  >
                    <a
                      href={baseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Launch App
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>

    {/* Gradient divider */}
    <div className="divider-gradient" />

    {/* ── Feature Highlights ── */}
    <section className="bg-tht-dark py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-10 text-center font-display text-2xl font-bold text-primary-foreground md:text-3xl">
          Platform Capabilities
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
            >
               <Card className="group h-full bg-card/60 backdrop-blur-sm border-border/40 transition-all duration-300 hover:bg-card/80 hover:shadow-md hover:-translate-y-0.5">
                 <CardContent className="flex gap-4 p-5">
                   <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                     <f.icon className="h-4.5 w-4.5 text-primary transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-semibold">
                      {f.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {f.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Gradient divider */}
    <div className="divider-gradient" />

    {/* ── Quick Launch Bar ── */}
    <section className="mx-auto max-w-4xl px-6 py-12">
      <h3 className="mb-4 text-center font-display text-lg font-semibold text-muted-foreground">
        Quick Launch
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {APPS.map((app) => {
          const Icon = ICON_MAP[app.icon];
          return (
            <Button
              key={app.id}
              variant="outline"
              asChild
              className={`justify-start gap-2 border-l-4 ${app.borderClass} transition-all duration-200 hover:scale-[1.03] hover:shadow-sm`}
            >
              <a
                href={getAppUrl(app.id)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className={`h-4 w-4 ${app.colorClass}`} />
                <span className="truncate text-xs">{app.name}</span>
              </a>
            </Button>
          );
        })}
      </div>
    </section>
    </div>
  );
};

export default AppsPage;
