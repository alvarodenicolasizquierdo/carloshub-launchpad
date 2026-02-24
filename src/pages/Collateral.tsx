import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { tagScreen, startEngagementTimer, trackCollateral } from "@/utils/clarityTracking";
import { FileText, FileSpreadsheet, Video, Presentation, Download, Leaf, Radar, Swords, Table2, ExternalLink, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InternalOnly } from "@/components/InternalOnly";
import { toast } from "@/hooks/use-toast";

type Resource = {
  title: string;
  format: string;
  icon: typeof FileText;
  audience: string;
  status: "available" | "coming";
  description?: string;
  isNew?: boolean;
  downloadUrl?: string;
};

const RESOURCES: Resource[] = [
  { title: "Presenter Cheat Sheet", format: "PDF", icon: FileText, audience: "Presenter", status: "available", description: "Post-Audit Edition — SAY/AVOID, Top 10 Wow Moments, Killer Moment Script, Objection Handling, Corrected Feature Matrix, Pre-Flight Checklist", isNew: true, downloadUrl: "https://docs.google.com/document/d/1MggMjhZsECfh3IgffLskqnlZkTxadkAV/edit?usp=sharing&ouid=102387764943935718690&rtpof=true&sd=true" },
  { title: "UKI 2.0 Technical Specification", format: "DOCX", icon: FileText, audience: "Steering Committee / Architect", status: "available", description: "Comprehensive technical implementation plan for the CARLOS UKI 2.0 rebuild — architecture, Azure environments, phased delivery, budget estimates, team structure, and critical assumptions for Chief Architect review.", isNew: true, downloadUrl: "https://docs.google.com/document/d/1OpYRE1FSwJbtK3PymSxJvYXVxPGYtq4P/edit?usp=sharing&ouid=102387764943935718690&rtpof=true&sd=true" },
  { title: "GKAM Demo Script v7", format: "DOCX", icon: FileText, audience: "GKAM / Sales", status: "available", description: "Client-facing demo script for Global Key Account Managers — 2-min Hub orientation + pick-a-scenario format covering C-Suite, Buyer, Supplier, Sustainability, and Technical audiences.", isNew: true, downloadUrl: "https://docs.google.com/document/d/1JhLX-qkePSfEliJ7lMAY7enCVSfODBhP/edit?usp=sharing&ouid=102387764943935718690&rtpof=true&sd=true" },
  { title: "GKAM Presenter Cheat Sheet", format: "DOCX", icon: FileText, audience: "GKAM / Presenter", status: "available", description: "Post-Audit Edition — SAY/AVOID quick reference, Top 10 Wow Moments, corrected competitive scores, DPP language guidance. Print-and-carry format for client meetings.", isNew: true, downloadUrl: "https://docs.google.com/document/d/1Aa1cDz2EwGnMhP8rIKaE6BVgfgqSdN-l/edit?usp=sharing&ouid=102387764943935718690&rtpof=true&sd=true" },
  { title: "Leave-Behind Brochure", format: "PDF", icon: FileText, audience: "Client", status: "coming" },
  { title: "Technical Brief", format: "PDF", icon: FileText, audience: "Client IT", status: "coming" },
  { title: "bluesign Integration Tiers", format: "PDF", icon: FileText, audience: "Technical / Sustainability", status: "available" },
  { title: "bluesign Integration — Tier Architecture & Evidence Model", format: "PDF", icon: Leaf, audience: "Technical", status: "available", isNew: true, description: "11-page spec covering 3-tier bluesign architecture (SYSTEM → PRODUCT → APPROVED), component evidence panels, claim propagation blocking, DPP integration, and TRF constraints. The technical foundation behind the killer demo moment.", downloadUrl: "https://docs.google.com/document/d/1ey4z8C9OC0dwX-y97UDLSpLyui5iDC8nXw-SiTVg_HY/edit?usp=sharing" },
  { title: "TIC Competitive Intelligence Brief v2", format: "DOCX", icon: Swords, audience: "Executive / Sales", status: "available", isNew: true, description: "Revised edition with 16-feature comparison matrix, expanded scoring methodology, reframed claims guidance, and actionable next steps. Feb 2026.", downloadUrl: "/collateral/TIC_Competitive_Intelligence_Brief_v2.docx" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.4 } }),
};

const CollateralPage = () => {
  const navigate = useNavigate();
  useEffect(() => { tagScreen('collateral'); return startEngagementTimer('collateral'); }, []);
  const handleDownload = (r: Resource) => {
    if (r.status === "coming") {
      toast({ title: "Coming Soon", description: `"${r.title}" will be available after branding approval.` });
      return;
    }
    if (!r.downloadUrl) {
      toast({ title: "Download", description: `"${r.title}" download initiated.` });
      return;
    }
    toast({ title: "Download", description: `${r.title}${r.description ? ` (${r.description.split("—")[0].trim()})` : ""} — opening download...` });
    trackCollateral('download', r.title);
    // Convert Google Docs URLs to export/download URLs
    let downloadHref = r.downloadUrl;
    const gdocsMatch = r.downloadUrl.match(/docs\.google\.com\/document\/d\/([^/]+)/);
    if (gdocsMatch) {
      downloadHref = `https://docs.google.com/document/d/${gdocsMatch[1]}/export?format=docx`;
    }

    const a = document.createElement("a");
    a.href = downloadHref;
    a.download = r.title.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g, "_") + (r.format === "DOCX" ? ".docx" : ".pdf");
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

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
            Collateral & Downloads
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            Presentation resources, scripts, and technical briefs for your demo.
          </motion.p>
        </div>
      </section>

      {/* Resource Grid */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map((r, i) => (
            <motion.div
              key={r.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
            >
              <Card className="group relative h-full card-hover">
                {r.isNew && (
                  <span className="absolute -top-2 -right-2 z-10 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                    NEW
                  </span>
                )}
                <CardContent className="p-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10">
                        <r.icon className={`h-4 w-4 ${r.icon === Leaf ? "text-[#27AE60]" : "text-primary"}`} />
                      </div>
                      <div>
                        <h3 className="font-display text-sm font-semibold text-foreground">{r.title}</h3>
                        <p className="text-xs text-muted-foreground">{r.format}</p>
                      </div>
                    </div>
                    <Badge
                      variant={r.status === "available" ? "default" : "secondary"}
                      className={`text-[10px] shrink-0 ${
                        r.status === "available"
                          ? "bg-accent-green/10 text-accent-green border-accent-green/30"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {r.status === "available" ? "Available" : "Coming Soon"}
                    </Badge>
                  </div>
                  {r.description && (
                    <p className="text-xs text-muted-foreground leading-relaxed">{r.description}</p>
                  )}
                  <Badge variant="outline" className="text-[10px] w-fit">
                    {r.audience}
                  </Badge>
                  <Button
                    size="sm"
                    variant={r.status === "available" ? "default" : "outline"}
                    className={`mt-auto gap-1.5 w-full ${r.status === "available" && r.downloadUrl ? "bg-primary hover:bg-primary/90" : ""}`}
                    onClick={() => handleDownload(r)}
                  >
                    <Download className="h-3.5 w-3.5" />
                    {r.status === "available" ? "Download PDF" : "Notify Me"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Competitive Intelligence Pack */}
      <InternalOnly>
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">Competitive Intelligence Pack</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Market Landscape", desc: "Interactive market positioning map", icon: Radar, path: "/competitive#landscape" },
              { title: "Inspectorio Battlecard", desc: "One-page competitive positioning guide", icon: Swords, path: "/competitive#battlecard-inspectorio" },
              { title: "TradeBeyond Battlecard", desc: "One-page competitive positioning guide", icon: Swords, path: "/competitive#battlecard-tradebeyond" },
              { title: "QIMA Battlecard", desc: "One-page competitive positioning guide", icon: Swords, path: "/competitive#battlecard-qima" },
              { title: "Altana AI Battlecard", desc: "One-page competitive positioning guide", icon: Swords, path: "/competitive#battlecard-altana-ai" },
              { title: "Prewave Battlecard", desc: "One-page competitive positioning guide", icon: Swords, path: "/competitive#battlecard-prewave" },
              { title: "EcoVadis Battlecard", desc: "One-page competitive positioning guide", icon: Swords, path: "/competitive#battlecard-ecovadis" },
              { title: "Sourcemap Battlecard", desc: "One-page competitive positioning guide", icon: Swords, path: "/competitive#battlecard-sourcemap" },
              { title: "Assent Battlecard", desc: "One-page competitive positioning guide", icon: Swords, path: "/competitive#battlecard-assent" },
              { title: "IntegrityNext Battlecard", desc: "One-page competitive positioning guide", icon: Swords, path: "/competitive#battlecard-integritynext" },
              { title: "Sedex Battlecard", desc: "One-page competitive positioning guide", icon: Swords, path: "/competitive#battlecard-sedex" },
              { title: "AI Feature Comparison", desc: "14-feature matrix with source-backed scoring", icon: Table2, path: "/competitive#matrix" },
              { title: "Digital Shift Analysis", desc: "Interactive market dashboard — growth, funding, and positioning", icon: TrendingUp, path: "/digital-shift", isNew: true },
            ].map((item) => (
              <Card key={item.title} className="group card-hover relative">
                <CardContent className="p-5 flex flex-col gap-3">
                  {'isNew' in item && item.isNew && (
                    <span className="absolute -top-2 -right-2 z-10 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">NEW</span>
                  )}
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-sm font-semibold text-foreground">{item.title}</h3>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="mt-auto gap-1.5 w-full" onClick={() => navigate(item.path)}>
                    <ExternalLink className="h-3.5 w-3.5" />
                    View
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </InternalOnly>

      {/* Gradient divider */}
      <div className="divider-gradient" />
      {/* Presenter Framing */}
      <InternalOnly>
        <section className="bg-tht-dark py-16">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-2xl font-display font-bold text-center text-primary-foreground mb-10">
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
      </InternalOnly>
    </div>
  );
};

export default CollateralPage;
