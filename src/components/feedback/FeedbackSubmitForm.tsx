import { useState } from "react";
import { Lightbulb, HelpCircle, Wrench, Bug } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useFeedbackHub, type SubmissionType, type SubmissionPriority } from "@/hooks/useFeedbackHub";
import { sendFeedbackToNotion } from "@/services/feedbackNotion";


const TYPE_OPTIONS: { value: SubmissionType; label: string; icon: React.ElementType }[] = [
  { value: "idea", label: "💡 Idea", icon: Lightbulb },
  { value: "question", label: "❓ Question", icon: HelpCircle },
  { value: "request", label: "🔧 Feature Request", icon: Wrench },
  { value: "issue", label: "🐛 Issue", icon: Bug },
];

const MODULE_OPTIONS = [
  "Dashboard",
  "Test Requests",
  "Supplier Management",
  "Inspections",
  "Sustainability",
  "Analytics",
  "Support Center",
  "Other",
];

interface FeedbackSubmitFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FeedbackSubmitForm({ open, onOpenChange }: FeedbackSubmitFormProps) {
  const { toast } = useToast();
  const addSubmission = useFeedbackHub((s) => s.addSubmission);

  const [type, setType] = useState<SubmissionType>("idea");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [module, setModule] = useState("");
  const [priority, setPriority] = useState<SubmissionPriority>("medium");
  const [name, setName] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const resetForm = () => {
    setType("idea");
    setTitle("");
    setDescription("");
    setModule("");
    setPriority("medium");
    setName("");
    setOrganisation("");
    setEmail("");
    setErrors({});
  };

  const validate = () => {
    const e: Record<string, boolean> = {};
    if (!title.trim()) e.title = true;
    if (!description.trim()) e.description = true;
    if (!module) e.module = true;
    if (!name.trim()) e.name = true;
    if (!organisation.trim()) e.organisation = true;
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    addSubmission({
      type,
      title: title.trim(),
      description: description.trim(),
      module,
      priority,
      submittedBy: name.trim(),
      organisation: organisation.trim(),
      email: email.trim(),
    });

    // Fire-and-forget Notion sync — does not block UI
    const TYPE_LABELS: Record<SubmissionType, string> = {
      idea: '💡 Idea', question: '❓ Question', request: '🔧 Request', issue: '🐛 Issue',
    };
    const PRIORITY_LABELS: Record<SubmissionPriority, string> = {
      low: 'Low', medium: 'Medium', high: 'High',
    };
    sendFeedbackToNotion({
      title: title.trim(),
      type: TYPE_LABELS[type],
      description: description.trim(),
      module,
      priority: PRIORITY_LABELS[priority],
      submittedBy: name.trim(),
      organisation: organisation.trim(),
      email: email.trim(),
      submittedAt: new Date().toISOString(),
      source: 'CARLOS HUB',
    });

    toast({
      title: "✓ Submitted",
      description: `The pro-bono product team endeavours to review and respond within the week. If urgent please send an owl 🦉 You'll hear back at ${email.trim()}.`,
    });

    resetForm();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-[480px] overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="font-display text-xl">Submit Feedback</SheetTitle>
          <SheetDescription>
            This is the fastest way to reach the product team. No email required — we review every submission.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-5">
          {/* Type */}
          <div className="space-y-2">
            <Label>Type *</Label>
            <Select value={type} onValueChange={(v) => setType(v as SubmissionType)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {TYPE_OPTIONS.map((t) => (
                  <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="fb-title">Title *</Label>
            <Input
              id="fb-title"
              maxLength={120}
              placeholder="Short summary of your feedback"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="text-xs text-red-500">Title is required</p>}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="fb-desc">Description *</Label>
            <Textarea
              id="fb-desc"
              rows={4}
              placeholder="Provide as much detail as possible…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && <p className="text-xs text-red-500">Description is required</p>}
          </div>

          {/* Module */}
          <div className="space-y-2">
            <Label>Related Module *</Label>
            <Select value={module} onValueChange={setModule}>
              <SelectTrigger className={errors.module ? "border-red-500" : ""}>
                <SelectValue placeholder="Select module" />
              </SelectTrigger>
              <SelectContent>
                {MODULE_OPTIONS.map((m) => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.module && <p className="text-xs text-red-500">Module is required</p>}
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label>Priority</Label>
            <Select value={priority} onValueChange={(v) => setPriority(v as SubmissionPriority)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="fb-name">Your Name *</Label>
            <Input
              id="fb-name"
              placeholder="e.g. Sarah Chen"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-xs text-red-500">Name is required</p>}
          </div>

          {/* Organisation */}
          <div className="space-y-2">
            <Label htmlFor="fb-org">Organisation *</Label>
            <Input
              id="fb-org"
              placeholder="e.g. Retailer – Quality Team"
              value={organisation}
              onChange={(e) => setOrganisation(e.target.value)}
              className={errors.organisation ? "border-red-500" : ""}
            />
            {errors.organisation && <p className="text-xs text-red-500">Organisation is required</p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="fb-email">Email *</Label>
            <Input
              id="fb-email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-xs text-red-500">Valid email is required</p>}
          </div>

          {/* Submit */}
          <Button
            onClick={handleSubmit}
            className="w-full mt-4 bg-[#F47920] hover:bg-[#e06810] text-white font-semibold"
          >
            Submit to Product Team
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
