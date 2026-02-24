import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lightbulb,
  HelpCircle,
  Wrench,
  Bug,
  ArrowUp,
  CheckCircle2,
  X,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FeedbackSubmitForm } from "./FeedbackSubmitForm";
import {
  useFeedbackHub,
  type SubmissionType,
  type SubmissionStatus,
  type FeedbackSubmission,
} from "@/hooks/useFeedbackHub";

/* ── Mappings ── */

const TYPE_META: Record<SubmissionType, { icon: React.ElementType; label: string; color: string }> = {
  idea: { icon: Lightbulb, label: "Idea", color: "#F47920" },
  question: { icon: HelpCircle, label: "Question", color: "#3B82F6" },
  request: { icon: Wrench, label: "Request", color: "#8B5CF6" },
  issue: { icon: Bug, label: "Issue", color: "#EF4444" },
};

const STATUS_META: Record<SubmissionStatus, { label: string; className: string }> = {
  new: { label: "New", className: "bg-muted text-muted-foreground" },
  under_review: { label: "Under Review", className: "bg-amber-500/15 text-amber-600 border-amber-500/30" },
  planned: { label: "Planned", className: "bg-blue-500/15 text-blue-600 border-blue-500/30" },
  resolved: { label: "Resolved", className: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30" },
};

function relativeDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const days = Math.floor(diffMs / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? "1 month ago" : `${months} months ago`;
}

/* ── Card ── */

function SubmissionCard({ submission }: { submission: FeedbackSubmission }) {
  const upvoteSubmission = useFeedbackHub((s) => s.upvoteSubmission);
  const [expanded, setExpanded] = useState(false);
  const meta = TYPE_META[submission.type];
  const statusMeta = STATUS_META[submission.status];
  const Icon = meta.icon;

  return (
    <Card className="group overflow-hidden transition-shadow duration-200 hover:shadow-md">
      <div className="flex">
        {/* Left accent bar */}
        <div className="w-1 shrink-0 rounded-l-lg" style={{ backgroundColor: meta.color }} />

        {/* Upvote */}
        <div className="flex flex-col items-center justify-start gap-0.5 px-3 py-4">
          <Button
            variant="ghost"
            size="sm"
            className={`h-8 w-8 p-0 ${submission.hasUpvoted ? "text-[#F47920]" : "text-muted-foreground hover:text-foreground"}`}
            onClick={() => upvoteSubmission(submission.id)}
          >
            <ArrowUp className="h-4 w-4" fill={submission.hasUpvoted ? "#F47920" : "none"} />
          </Button>
          <span className={`text-xs font-semibold ${submission.hasUpvoted ? "text-[#F47920]" : "text-muted-foreground"}`}>
            {submission.upvotes}
          </span>
        </div>

        {/* Content */}
        <CardContent className="flex-1 py-4 pr-4 pl-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="gap-1 text-[11px]" style={{ borderColor: meta.color, color: meta.color }}>
              <Icon className="h-3 w-3" />
              {meta.label}
            </Badge>
            <Badge variant="outline" className={`text-[11px] ${statusMeta.className}`}>
              {statusMeta.label}
            </Badge>
          </div>

          <h3 className="font-semibold text-base leading-snug">{submission.title}</h3>

          <p className={`text-sm text-muted-foreground leading-relaxed ${!expanded ? "line-clamp-2" : ""}`}>
            {submission.description}
          </p>
          {submission.description.length > 120 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-primary hover:underline"
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="font-medium text-foreground/80">{submission.submittedBy}</span>
            <span>·</span>
            <span>{submission.organisation}</span>
            <span>·</span>
            <Badge variant="secondary" className="text-[10px] py-0">{submission.module}</Badge>
            <span>·</span>
            <span>{relativeDate(submission.createdAt)}</span>
          </div>

          {/* Response */}
          {submission.response && (
            <div className="mt-3 rounded-lg bg-muted/50 border-l-4 border-primary p-4">
              <p className="text-xs font-semibold text-foreground/80 mb-1">Product Team:</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{submission.response}</p>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
}

/* ── Board ── */

interface FeedbackBoardProps {
  autoOpenForm?: boolean;
}

export function FeedbackBoard({ autoOpenForm = false }: FeedbackBoardProps) {
  const { submissions, recentSubmissionEmail, recentSubmissionType, clearRecentSubmission } = useFeedbackHub();
  const [formOpen, setFormOpen] = useState(autoOpenForm);
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sort, setSort] = useState<"newest" | "upvotes">("newest");

  useEffect(() => {
    if (autoOpenForm) setFormOpen(true);
  }, [autoOpenForm]);

  const filtered = submissions
    .filter((s) => typeFilter === "all" || s.type === typeFilter)
    .filter((s) => statusFilter === "all" || s.status === statusFilter)
    .sort((a, b) =>
      sort === "upvotes"
        ? b.upvotes - a.upvotes
        : b.createdAt.getTime() - a.createdAt.getTime()
    );

  return (
    <div>
      {/* Inline confirmation */}
      <AnimatePresence>
        {recentSubmissionEmail && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <div className="flex items-center gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4">
              <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
              <p className="text-sm flex-1">
                Your <span className="font-semibold">{recentSubmissionType}</span> has been submitted.
                The pro-bono product team endeavours to review and respond within the week. If urgent please send an owl 🦉 We'll respond at{" "}
                <span className="font-semibold">{recentSubmissionEmail}</span>.
              </p>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={clearRecentSubmission}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold">Feedback & Ideas</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Have a question, idea, or request? Submit it here — this goes directly to the product team.
          </p>
        </div>
        <Button
          className="bg-[#F47920] hover:bg-[#e06810] text-white font-semibold shrink-0"
          onClick={() => setFormOpen(true)}
        >
          + Submit Feedback
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[150px]"><SelectValue placeholder="Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="idea">💡 Ideas</SelectItem>
            <SelectItem value="question">❓ Questions</SelectItem>
            <SelectItem value="request">🔧 Requests</SelectItem>
            <SelectItem value="issue">🐛 Issues</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="under_review">Under Review</SelectItem>
            <SelectItem value="planned">Planned</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={(v) => setSort(v as "newest" | "upvotes")}>
          <SelectTrigger className="w-[150px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="upvotes">Most Upvoted</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg font-medium">No submissions match your filters.</p>
          <p className="text-sm mt-1">Try adjusting or submit something new!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
            >
              <SubmissionCard submission={s} />
            </motion.div>
          ))}
        </div>
      )}

      <FeedbackSubmitForm open={formOpen} onOpenChange={setFormOpen} />
    </div>
  );
}
