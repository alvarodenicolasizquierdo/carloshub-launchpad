import { Play, Radar, MessageSquarePlus, Download, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    { label: "Launch Guided Demo", icon: Play, path: "/demo", variant: "default" as const },
    { label: "Market Intelligence", icon: Radar, path: "/competitive", variant: "outline" as const },
    { label: "View Collateral", icon: Download, path: "/collateral", variant: "outline" as const },
    { label: "Submit Feedback", icon: MessageSquarePlus, path: "/feedback", variant: "outline" as const },
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant={action.variant}
            className="w-full justify-start h-auto py-3 px-4"
            onClick={() => navigate(action.path)}
          >
            <action.icon className="mr-2 h-4 w-4" />
            <span className="truncate">{action.label}</span>
          </Button>
        ))}
        <Button
            variant="ghost"
            className="w-full justify-start h-auto py-3 px-4 text-muted-foreground hover:text-primary"
            onClick={() => navigate("/whats-new")}
        >
            <Sparkles className="mr-2 h-4 w-4" />
            <span className="truncate">See What's New</span>
        </Button>
      </CardContent>
    </Card>
  );
}
