import { lazy, Suspense, useEffect } from "react";
import { initClarityTracking } from "@/utils/clarityTracking";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PresentationProvider } from "@/contexts/PresentationContext";
import { DemoModeProvider } from "@/contexts/DemoModeContext";
import { MainLayout } from "@/components/layout/MainLayout";
import { PreviewLayout } from "@/components/layout/PreviewLayout";
import { PageSkeleton } from "@/components/layout/PageSkeleton";

const Index = lazy(() => import("./pages/Index"));
const Demo = lazy(() => import("./pages/Demo"));
const Apps = lazy(() => import("./pages/Apps"));

const Collateral = lazy(() => import("./pages/Collateral"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const FeedbackHub = lazy(() => import("./pages/FeedbackHub"));
const MarketIntelligence = lazy(() => import("./pages/MarketIntelligence"));
const DigitalShift = lazy(() => import("./pages/DigitalShift"));
const WhatsNew = lazy(() => import("./pages/WhatsNew"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    initClarityTracking();
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PresentationProvider>
          <DemoModeProvider>
            <Suspense fallback={<PageSkeleton />}>
              <Routes>
                {/* Main layout with sidebar */}
                <Route element={<MainLayout />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/demo" element={<Demo />} />
                  <Route path="/apps" element={<Apps />} />
                  <Route path="/compare" element={<Navigate to="/competitive?tab=compare" replace />} />
                  <Route path="/collateral" element={<Collateral />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/feedback" element={<FeedbackHub />} />
                  <Route path="/competitive" element={<MarketIntelligence />} />
                  <Route path="/digital-shift" element={<DigitalShift />} />
                  <Route path="/whats-new" element={<WhatsNew />} />
                </Route>

                {/* Standalone preview — shareable, no sidebar */}
                <Route element={<PreviewLayout />}>
                  <Route path="/preview" element={<Index />} />
                  <Route path="/preview/demo" element={<Demo />} />
                  <Route path="/preview/apps" element={<Apps />} />
                  <Route path="/preview/compare" element={<Navigate to="/competitive?tab=compare" replace />} />
                  <Route path="/preview/collateral" element={<Collateral />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </DemoModeProvider>
        </PresentationProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
