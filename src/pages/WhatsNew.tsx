import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Wrench,
  Palette,
  Bug,
  Rocket,
  ChevronRight,
  Filter,
} from "lucide-react";

/* ─── Types ─── */

type UpdateCategory = "feature" | "collateral" | "intelligence" | "fix" | "announcement";

interface UpdateEntry {
  id: string;
  date: string;
  title: string;
  description: string;
  category: UpdateCategory;
  highlights?: string[];
  link?: string;
}

/* ─── Category config ─── */

const CATEGORY_CONFIG: Record<UpdateCategory, { label: string; dotColor: string; icon: typeof Sparkles }> = {
  feature: { label: "Feature", dotColor: "bg-blue-400", icon: Sparkles },
  collateral: { label: "Collateral", dotColor: "bg-purple-400", icon: Wrench },
  intelligence: { label: "Intelligence", dotColor: "bg-amber-400", icon: Palette },
  fix: { label: "Fix", dotColor: "bg-emerald-400", icon: Bug },
  announcement: { label: "Announcement", dotColor: "bg-primary", icon: Rocket },
};

/* ─── Updates data ─── */

const UPDATES: UpdateEntry[] = [
  /* ─── This week (since Monday Feb 10) ─── */
  {
    id: "feedback-hub-live",
    date: "February 12, 2026",
    title: "Got Questions? Ideas? Requests? There's a Place for That Now",
    description: "We built you a Feedback & Ideas hub — think of it as your direct line to the product team. Got a question about a feature? Want something added or changed? Spotted something weird? Just write it up and submit. No emails, no tickets, no chasing people on Teams. Every submission goes straight to the team and you'll get a response right there in the hub.",
    category: "announcement",
    link: "/feedback",
    highlights: [
      "Submit ideas 💡, questions ❓, feature requests 🔧, or bug reports 🐛",
      "Upvote other people's ideas to help us prioritise what matters most",
      "Responses from the product team appear directly on your submission — no inbox digging",
    ],
  },
  {
    id: "compare-matrix",
    date: "February 12, 2026",
    title: "Side-by-Side Showdown — The Feature Comparison Matrix",
    description: "No more fumbling through slides to prove CARLOS wins. We've built a proper feature-by-feature comparison against Inspectorio, TradeBeyond, and QIMA — all on one page. Tick marks, partial support flags, and an overall score. Pull it up mid-call and watch the room go quiet.",
    category: "intelligence",
    link: "/competitive?tab=compare",
    highlights: [
      "16 features scored across 4 platforms — CARLOS leads at 14/16",
      "Credibility-first: we marked two of our own features as 'in development'",
      "Lives inside Market Intelligence now, so everything competitive is in one place",
    ],
  },
  {
    id: "know-your-rivals",
    date: "February 12, 2026",
    title: "Know Your Rivals — 10 Competitor Profiles at Your Fingertips",
    description: "Ever walked into a pitch and got blindsided by \"but what about Inspectorio?\" — yeah, those days are over. We've loaded up profiles on 10 key competitors so you can see their funding, headcount, and what they're good (and not so good) at. All in one place, sortable, filterable, zero guesswork.",
    category: "feature",
    link: "/competitive",
    highlights: [
      "Altana AI, Prewave, Inspectorio, EcoVadis, TradeBeyond, Sourcemap, Assent, IntegrityNext, QIMA, Sedex — all covered",
      "Sort by funding raised, team size, or category to find the info you need fast",
      "Full market overview with the €300B big picture — great for exec conversations",
    ],
  },
  {
    id: "market-report",
    date: "February 12, 2026",
    title: "The Market Report You'll Actually Read",
    description: "We put together a proper market report — executive summary, key findings, where the money's going. Perfect for when a client asks \"so where's the industry heading?\" and you want to sound like you just read a 200-page McKinsey deck (you didn't, but they don't need to know).",
    category: "feature",
    link: "/competitive",
  },
  {
    id: "whats-new-page",
    date: "February 12, 2026",
    title: "This Page! 👋",
    description: "You're looking at it. No more Slack threads or emails to find out what's new in CARLOS. Just pop in here whenever you want the latest — we'll keep it short and sweet.",
    category: "feature",
  },
  {
    id: "battlecards-v1",
    date: "February 10, 2026",
    title: "Battlecards — Your Secret Weapon for Inspectorio, TradeBeyond & QIMA",
    description: "Three shiny new battlecards for the competitors you bump into most. Each one gives you the quick facts, their strengths and weaknesses, the best angles to win, and — our favorite part — ready-made responses for those tricky objections prospects love to throw at you.",
    category: "feature",
    link: "/competitive",
    highlights: [
      "Print them out, stick them on your desk, take them to meetings — they're yours",
      "\"But their AI is better\" — we've got a response for that (spoiler: it's not)",
      "Win themes that actually work, pulled from real competitive intel",
    ],
  },

  /* ─── Last week ─── */
  {
    id: "regulatory-cheatsheet",
    date: "February 8, 2026",
    title: "Regulation Cheat Sheet — CSRD, EUDR, DPP & UFLPA",
    description: "Clients keep asking about regulations? Same. So we mapped out exactly which CARLOS features tackle which regulations, how urgent each one is, and how ready the market is. It's like a cheat sheet for sounding incredibly well-informed.",
    category: "feature",
    link: "/competitive",
  },
  {
    id: "white-space",
    date: "February 8, 2026",
    title: "10 Things Nobody Else Can Do (Yet)",
    description: "We found 10 major gaps that none of the big players have filled. That's 10 conversations where you can say \"actually, we're the only ones who do that.\" You're welcome.",
    category: "feature",
    link: "/competitive",
  },
  {
    id: "quadrant-glow-up",
    date: "February 6, 2026",
    title: "The Competitive Map Got a Serious Glow-Up",
    description: "Remember that quadrant with 4 dots on it? Now it has 11. Every major competitor plotted on how deep their AI goes vs. how strong their field capabilities are. Great for \"let me show you where we sit\" moments in demos.",
    category: "collateral",
    link: "/competitive",
  },
  {
    id: "demo-mode",
    date: "February 4, 2026",
    title: "Demo Mode — Hide the Messy Bits",
    description: "Presenting to a client and don't want them seeing our internal kitchen? Flip the Demo Mode toggle in the sidebar and all the behind-the-scenes stuff disappears. Flip it back when they leave. Easy.",
    category: "feature",
  },

  /* ─── Earlier ─── */
  {
    id: "design-refresh",
    date: "January 28, 2026",
    title: "Fresh Look, Same CARLOS",
    description: "We gave the whole platform a visual refresh — new fonts, cleaner cards, and that unmistakable THT orange running through everything. Looks sharp on projectors too, which is kind of the point.",
    category: "intelligence",
  },
  {
    id: "collateral-hub",
    date: "January 25, 2026",
    title: "One Place for All Your Sales Docs",
    description: "No more digging through shared drives. Competitive briefs, one-pagers, and enablement materials — all downloadable from one page. Grab what you need before your next call.",
    category: "feature",
    link: "/collateral",
  },
];

/* ─── Group by month ─── */

function groupByMonth(entries: UpdateEntry[]) {
  const groups: { month: string; entries: UpdateEntry[] }[] = [];
  for (const entry of entries) {
    const d = new Date(entry.date);
    const key = d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    const last = groups[groups.length - 1];
    if (last && last.month === key) {
      last.entries.push(entry);
    } else {
      groups.push({ month: key, entries: [entry] });
    }
  }
  return groups;
}

/* ─── Page ─── */

export default function WhatsNewPage() {
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  const filtered = categoryFilter === "All"
    ? UPDATES
    : UPDATES.filter((u) => u.category === categoryFilter);

  const grouped = groupByMonth(filtered);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-tht-dark py-20 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl">
              What's New
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-lg mx-auto">
              Latest features, enhancements, and updates to the CARLOS platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-3xl px-6 py-12">
        {/* Category filter pills */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          <Filter className="h-4 w-4 text-muted-foreground mr-1" />
          {["All", ...Object.keys(CATEGORY_CONFIG)].map((cat) => {
            const config = cat !== "All" ? CATEGORY_CONFIG[cat as UpdateCategory] : null;
            const isActive = categoryFilter === cat;
            return (
              <Button
                key={cat}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => setCategoryFilter(cat)}
                className={`text-xs gap-2 rounded-full ${
                  isActive
                    ? ""
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {config && (
                  <span className={`h-2 w-2 rounded-full ${config.dotColor}`} />
                )}
                {config ? config.label : "All"}
              </Button>
            );
          })}
        </div>

        {/* Timeline — editorial style */}
        <div className="space-y-0">
          {grouped.map((group, gi) => (
            <div key={group.month}>
              {/* Sticky month header */}
              <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm py-3 mb-2">
                <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-primary">
                  {group.month}
                </h2>
              </div>

              {group.entries.map((entry, i) => {
                const config = CATEGORY_CONFIG[entry.category];
                return (
                  <motion.article
                    key={entry.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (gi * 3 + i) * 0.04, duration: 0.4 }}
                    className="py-8 border-b border-border/20 last:border-b-0"
                  >
                    {/* Date + category dot */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm text-muted-foreground">
                        {entry.date}
                      </span>
                      <span className="text-muted-foreground/30">·</span>
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span className={`h-2 w-2 rounded-full ${config.dotColor}`} />
                        {config.label}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-xl font-bold text-foreground mb-3 leading-tight">
                      {entry.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[15px] text-muted-foreground leading-relaxed">
                      {entry.description}
                    </p>

                    {/* Link */}
                    {entry.link && (
                      <Link
                        to={entry.link}
                        className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        Check it out →
                      </Link>
                    )}

                    {/* Highlights */}
                    {entry.highlights && (
                      <ul className="mt-4 space-y-2">
                        {entry.highlights.map((h, j) => (
                          <li key={j} className="text-sm text-foreground/75 flex items-start gap-2.5">
                            <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.article>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border/20 text-center">
          <p className="text-sm text-muted-foreground">
            You're all caught up! Check back soon for more updates.
          </p>
        </div>
      </section>
    </div>
  );
}
