import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { tagScreen } from "@/utils/clarityTracking";
import { Lightbulb } from "lucide-react";
import { FeedbackBoard } from "@/components/feedback/FeedbackBoard";

const FeedbackHub = () => {
  const [searchParams] = useSearchParams();
  const autoOpen = searchParams.get("submit") === "true";

  useEffect(() => { tagScreen("feedback"); }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-tht-dark py-16 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F47920]/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#F47920]/15"
          >
            <Lightbulb className="h-7 w-7 text-[#F47920]" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="font-display text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl"
          >
            Your ideas shape this platform.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="mt-4 text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            Whether you're a retailer, supplier, lab, or internal team — if you have a question, an idea,
            a feature request, or something isn't working right, this is the place.
            <br />
            <span className="font-semibold text-foreground/90">
              No emails. No tickets. Just write it here and the pro-bono product team will endeavour to answer in the shortest time possible.
            </span>
          </motion.p>
        </div>
      </section>

      {/* Board */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <FeedbackBoard autoOpenForm={autoOpen} />
      </section>
    </div>
  );
};

export default FeedbackHub;
