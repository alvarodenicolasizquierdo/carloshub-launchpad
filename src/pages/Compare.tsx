import { useState, useMemo, useEffect } from "react";
import { tagScreen } from "@/utils/clarityTracking";
import { Check, X, Crown, Trophy, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CompareValueCell from "@/components/compare/CompareValueCell";
import { FEATURES, CATEGORIES, type CategoryId } from "@/components/compare/compareData";

const CATEGORY_LABELS: Record<string, string> = {
  ai: "AI & Machine Learning",
  sustainability: "Sustainability & Compliance",
  platform: "Core Platform",
};

/*
 * Audited scores (Feb 2026, 24 source references):
 *   ✅ Full capability = 1 pt | ⚠️ Partial/limited = 0.5 pt | ❌ Not present = 0 pt
 */
const SCORES = {
  carlos: 14,
  inspectorio: 9,
  tradebeyond: 5,
  qima: 3.5,
} as const;

const ComparePage = () => {
  const [category, setCategory] = useState<string>("all");
  useEffect(() => { tagScreen('compare'); }, []);

  const grouped = useMemo(() => {
    if (category !== "all") {
      return [{ category: category as CategoryId, features: FEATURES.filter((f) => f.category === category) }];
    }
    const order: CategoryId[] = ["ai", "sustainability", "platform"];
    return order.map((cat) => ({
      category: cat,
      features: FEATURES.filter((f) => f.category === cat),
    }));
  }, [category]);

  const totalFeatures = FEATURES.length;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-tht-dark py-16 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-3xl px-6">
          <Badge variant="secondary" className="text-xs tracking-wide uppercase mb-4">
            Competitive Analysis
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-primary-foreground">
            How <span className="text-primary">CARLOS</span> measures up
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg mt-4">
            See exactly where CARLOS leads against the most-compared alternatives in quality &amp; compliance software.
          </p>
        </div>
      </section>

      <div className="px-4 py-12 sm:px-6 lg:px-10 max-w-7xl mx-auto space-y-10">

      {/* Category tabs */}
      <div className="flex justify-center">
        <Tabs value={category} onValueChange={setCategory}>
          <TabsList>
            {CATEGORIES.map((c) => (
              <TabsTrigger key={c.id} value={c.id}>
                {c.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Table */}
      <TooltipProvider delayDuration={200}>
        <Card className="overflow-hidden border-border/60">
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-card">
                <TableRow className="border-b-2">
                  <TableHead className="w-[220px] text-foreground font-display text-sm">
                    Feature
                  </TableHead>
                  <TableHead className="text-center bg-primary/5 border-x border-primary/20 ring-1 ring-primary/10 rounded-t-lg">
                    <div className="flex items-center justify-center gap-1.5 font-display text-primary font-bold">
                      <Crown className="h-4 w-4" />
                      CARLOS
                    </div>
                  </TableHead>
                  <TableHead className="text-center text-muted-foreground font-medium">
                    Inspectorio
                  </TableHead>
                  <TableHead className="text-center text-muted-foreground font-medium">
                    TradeBeyond
                  </TableHead>
                  <TableHead className="text-center text-muted-foreground font-medium">
                    QIMA
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {grouped.map((group) => (
                  <>
                    {/* Category section header */}
                    {category === "all" && (
                      <TableRow key={`header-${group.category}`} className="bg-muted/50 hover:bg-muted/50">
                        <TableCell colSpan={5} className="py-2.5 px-4">
                          <span className="font-display font-bold text-sm text-foreground uppercase tracking-wide">
                            {CATEGORY_LABELS[group.category]}
                          </span>
                        </TableCell>
                      </TableRow>
                    )}
                    {group.features.map((feature, i) => (
                      <TableRow
                        key={feature.label}
                        className={i % 2 === 1 ? "bg-muted/30" : ""}
                      >
                        <TableCell>
                          <div>
                            <span className="font-medium text-foreground">{feature.label}</span>
                            {feature.description && (
                              <p className="text-xs text-muted-foreground mt-0.5">{feature.description}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-center bg-primary/5 border-x border-primary/20">
                          <CompareValueCell value={feature.carlos} caveat={feature.carlosCaveat} isCarlos />
                        </TableCell>
                        <TableCell className="text-center">
                          <CompareValueCell value={feature.inspectorio} caveat={feature.inspectorioCaveat} />
                        </TableCell>
                        <TableCell className="text-center">
                          <CompareValueCell value={feature.tradebeyond} caveat={feature.tradebeyondCaveat} />
                        </TableCell>
                        <TableCell className="text-center">
                          <CompareValueCell value={feature.qima} caveat={feature.qimaCaveat} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ))}
              </TableBody>

              <TableFooter>
                <TableRow className="bg-primary/5 hover:bg-primary/5">
                  <TableCell className="font-display font-bold text-foreground">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-primary" />
                      Summary
                    </div>
                  </TableCell>
                  <TableCell className="text-center bg-primary/10 border-x border-primary/20 font-display font-bold text-primary">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="inline-flex items-center gap-1 cursor-help">
                          {SCORES.carlos} / {totalFeatures}
                          <Info className="h-3 w-3 opacity-50" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs text-xs">
                        <p className="font-semibold mb-1">Score breakdown</p>
                        <p>✓ Full support = 1 pt</p>
                        <p>⚠ Partial / limited = 0.5 pt</p>
                        <p>✗ No support = 0 pt</p>
                        <p className="mt-1 text-muted-foreground">2 features marked as "in development" (Role-Adaptive Views, Offline Inspection, Carbon Footprint framework, Digital intelligence layer).</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="text-center text-muted-foreground text-sm">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="inline-flex items-center gap-1 cursor-help">
                          {SCORES.inspectorio} / {totalFeatures}
                          <Info className="h-3 w-3 opacity-50" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs text-xs">
                        <p className="font-semibold mb-1">Score breakdown</p>
                        <p>✓ Full support = 1 pt</p>
                        <p>⚠ Partial / limited = 0.5 pt</p>
                        <p>✗ No support = 0 pt</p>
                        <p className="mt-1 text-muted-foreground">Strong Paramo AI with cited recommendations and autonomous agents. Closest competitor on AI depth and DPP positioning.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="text-center text-muted-foreground text-sm">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="inline-flex items-center gap-1 cursor-help">
                          {SCORES.tradebeyond} / {totalFeatures}
                          <Info className="h-3 w-3 opacity-50" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs text-xs">
                        <p className="font-semibold mb-1">Score breakdown</p>
                        <p>✓ Full support = 1 pt</p>
                        <p>⚠ Partial / limited = 0.5 pt</p>
                        <p>✗ No support = 0 pt</p>
                        <p className="mt-1 text-muted-foreground">Strong workflow AI, PO risk rating, and end-to-end supply chain coverage. Lacks explainability, DPP product, and downstream impact visualization.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="text-center text-muted-foreground text-sm">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="inline-flex items-center gap-1 cursor-help">
                          {SCORES.qima} / {totalFeatures}
                          <Info className="h-3 w-3 opacity-50" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-sm text-xs">
                        <p className="font-semibold mb-1">Score breakdown</p>
                        <p>✓ Full support = 1 pt</p>
                        <p>⚠ Partial / limited = 0.5 pt</p>
                        <p>✗ No support = 0 pt</p>
                        <p className="mt-1 text-muted-foreground">QIMA is services-first with a digital overlay — strong inspection footprint (2,500 owned inspectors), but AI is operational (report summaries, risk flags), not strategic. No DPP product, no reasoning transparency, no scenario modelling.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
      </TooltipProvider>

      {/* Strategic positioning footnote */}
      <p className="text-xs text-muted-foreground text-center max-w-3xl mx-auto">
        <strong>Note:</strong> CARLOS is <em>not</em> a PLM. It sits alongside existing PLMs (Centric, Infor, etc.) as a
        compliance-and-quality intelligence layer. Where PLMs manage product data, CARLOS adds AI-driven risk,
        sustainability evidence, and regulatory readiness on top.
      </p>

      {/* QIMA summary footnote */}
      <blockquote className="text-xs text-muted-foreground text-center max-w-3xl mx-auto border-l-4 border-primary/30 pl-4 italic">
        "QIMA is services-first with a digital overlay — strong inspection footprint (2,500 owned inspectors), but AI is operational (report summaries, risk flags), not strategic. No DPP product, no reasoning transparency, no scenario modelling."
      </blockquote>

      {/* Differentiator callouts */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { stat: "847", label: "ML features powering every decision" },
          { stat: "7.7×", label: "Projected ROI for enterprise clients" },
          { stat: "2027", label: "EU Digital Product Passport Architected" },
        ].map((item) => (
          <Card key={item.stat} className="text-center py-6 card-hover">
            <CardContent className="p-0 space-y-1">
              <span className="text-3xl font-display font-bold text-primary">{item.stat}</span>
              <p className="text-sm text-muted-foreground">{item.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      </div>
    </div>
  );
};

export default ComparePage;
