import { useState } from "react";
import { ChevronRight, ExternalLink, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { WOW_MOMENTS, getAppUrl } from "@/config/constants";
import { trackAppExit } from "@/utils/clarityTracking";

export function PresenterToolkit() {
  const [expandedWow, setExpandedWow] = useState<number | null>(null);

  const handleLaunch = (appId: string, route: string) => {
    trackAppExit(appId, appId);
    window.open(getAppUrl(appId) + route, "_blank");
  };

  return (
    <Card className="border-l-4 border-l-primary bg-background/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg">Presenter Toolkit</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">Internal resources for demos and presentations.</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Demo Cheat Sheet</h4>
            <div className="space-y-1">
              {WOW_MOMENTS.slice(0, 5).map((item) => { // Show top 5 to save space
                const isExpanded = expandedWow === item.rank;
                return (
                  <div key={item.rank} className="border border-border/40 rounded-md bg-background">
                    <button
                      onClick={() => setExpandedWow(isExpanded ? null : item.rank)}
                      className="flex items-center gap-3 p-2 w-full text-left hover:bg-accent/50 transition-colors rounded-md"
                    >
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                        {item.rank}
                      </span>
                      <span className="flex-1 text-sm font-medium truncate">{item.title}</span>
                      <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                    </button>
                    {isExpanded && item.steps && (
                      <div className="p-3 pt-0 text-sm border-t border-border/40 mt-1">
                        <ol className="pl-4 space-y-1 mt-2 text-muted-foreground list-decimal">
                          {item.steps.slice(0, 2).map((step, i) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ol>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleLaunch(item.app, item.route); }}
                          className="mt-3 text-xs text-primary hover:underline flex items-center gap-1"
                        >
                          Launch App <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
