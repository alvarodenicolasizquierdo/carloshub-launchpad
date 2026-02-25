import { useState, useEffect } from "react";
import { AppSidebar } from "./AppSidebar";
import { Footer } from "./Footer";
import { PresentationControls } from "./PresentationControls";
import { AnimatedOutlet } from "./AnimatedOutlet";
import { usePresentation } from "@/contexts/PresentationContext";
import { DesignVisionBadge } from "@/components/DesignVisionBadge";
import { FeedbackFAB } from "@/components/feedback/FeedbackFAB";
import { CommandPalette } from "./CommandPalette";
import { TopHeader } from "./TopHeader";
import { useIsMobile } from "@/hooks/use-mobile";

export function MainLayout() {
  const { isPresenting } = usePresentation();
  const isMobile = useIsMobile();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar - Desktop & Mobile (Mobile handled internally via Sheet) */}
      {!isPresenting && <AppSidebar />}

      <div className="flex flex-col flex-1 min-w-0">
        {!isPresenting && (
          <TopHeader onMenuClick={() => {
             document.dispatchEvent(new Event('toggle-mobile-menu'));
          }} />
        )}
        
        <main className="flex-1 overflow-y-auto relative scroll-smooth">
          {/* Design Vision badge — fixed top-right (adjusted for header) */}
          <div className="sticky top-0 z-10 flex justify-end px-6 pt-4 pb-0 pointer-events-none">
            <div className="pointer-events-auto">
              <DesignVisionBadge />
            </div>
          </div>

          {/* Subtle atmospheric radial glows on all pages */}
          <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/3 w-[1000px] h-[1000px] rounded-full bg-primary/[0.08] blur-[180px]" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-accent-purple/[0.06] blur-[160px] animate-[pulse_6s_ease-in-out_infinite]" />
            <div className="absolute -bottom-1/4 -left-1/4 w-[700px] h-[700px] rounded-full bg-accent-blue/[0.05] blur-[130px]" />
          </div>

          <div className="relative z-10">
            <AnimatedOutlet />
          </div>
        </main>
        {!isPresenting && <Footer />}
      </div>
      <PresentationControls />
      <FeedbackFAB />
      <CommandPalette />
    </div>
  );
}
