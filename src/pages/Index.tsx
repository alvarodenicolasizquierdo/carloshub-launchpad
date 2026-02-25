import { useEffect } from "react";
import { tagScreen, startEngagementTimer } from "@/utils/clarityTracking";
import { usePresentation } from "@/contexts/PresentationContext";
import { useDemoMode } from "@/contexts/DemoModeContext";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { PresenterToolkit } from "@/components/dashboard/PresenterToolkit";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export default function Index() {
  useEffect(() => { tagScreen('index'); return startEngagementTimer('index'); }, []);
  const { isPresenting } = usePresentation();
  const { isDemoMode } = useDemoMode();
  const isInternal = !isPresenting && !isDemoMode;

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good morning" : currentHour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            {greeting}, Team.
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening in the Hub today.
          </p>
        </div>
        {/* Date/Time could go here */}
      </div>

      {/* Stats Row */}
      <StatsOverview />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3 width on large) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Quick Actions */}
          <div className="h-64"> {/* Fixed height for consistency */}
             <QuickActions />
          </div>

          {/* Featured Content / Promo / Marketing */}
          <Card className="bg-gradient-to-br from-tht-dark to-tht-charcoal text-white border-none overflow-hidden relative group cursor-pointer hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(243,111,33,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(243,111,33,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />
            <CardContent className="relative z-10 p-8 flex flex-col items-start gap-4">
              <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Featured
              </div>
              <h3 className="text-2xl font-display font-bold max-w-lg">
                The Future of Compliance: CARLOS AI 2.0
              </h3>
              <p className="text-white/70 max-w-md">
                Discover how our new reasoning engine outperforms traditional compliance tools by 7.7x.
              </p>
              <button className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-2 mt-2 group-hover:translate-x-1 transition-transform">
                Read the Case Study <ExternalLink className="w-4 h-4" />
              </button>
            </CardContent>
          </Card>

          {/* Internal Toolkit (Only visible to internal users) */}
          {isInternal && (
            <PresenterToolkit />
          )}
        </div>

        {/* Right Column (1/3 width) */}
        <div className="space-y-6">
          <div className="h-[500px]">
            <ActivityFeed />
          </div>
          
          {/* Help Center Teaser (Slack style) */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <h4 className="font-semibold text-foreground mb-2">Need Help?</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Check our new Help Center for guides on using the Hub and AI tools.
              </p>
              <button className="text-sm font-medium text-primary hover:underline">
                Visit Help Center →
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
