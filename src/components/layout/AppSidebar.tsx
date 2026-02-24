import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Play,
  LayoutGrid,
  Download,
  Settings,
  PanelLeftClose,
  PanelLeft,
  Presentation,
  MessageSquarePlus,
  Radar,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePresentation } from "@/contexts/PresentationContext";
import { useDemoMode } from "@/contexts/DemoModeContext";
import { DemoModeToggle } from "@/components/DemoModeToggle";
import { useFeedbackHub } from "@/hooks/useFeedbackHub";



const NAV_ITEMS = [
  { label: "Home", icon: Home, path: "/", demoVisible: true },
  { label: "Guided Demo", icon: Play, path: "/demo", demoVisible: true },
  { label: "Apps", icon: LayoutGrid, path: "/apps", demoVisible: true },
  { label: "Market Intelligence", icon: Radar, path: "/competitive", demoVisible: false },
  { label: "Collateral", icon: Download, path: "/collateral", demoVisible: true },
  { label: "What's New", icon: Sparkles, path: "/whats-new", demoVisible: true },
  { label: "Feedback & Ideas", icon: MessageSquarePlus, path: "/feedback", demoVisible: false },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { startPresentation } = usePresentation();
  const { isDemoMode } = useDemoMode();
  const newCount = useFeedbackHub((s) => s.submissions.filter((x) => x.status === "new").length);

  const visibleNavItems = isDemoMode
    ? NAV_ITEMS.filter((item) => item.demoVisible)
    : NAV_ITEMS;

  return (
    <aside
      className={cn(
        "h-full flex flex-col border-r border-border/20 transition-all duration-300 shrink-0 backdrop-blur-xl bg-tht-dark/90",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center gap-2 px-4 border-b border-border/20">
        <span className="font-display font-bold text-primary text-lg shrink-0">THT</span>
        {!collapsed && (
          <span className="font-display font-semibold text-foreground tracking-tight">
            CARLOS
          </span>
        )}
      </div>

      {/* Demo Mode Toggle */}
      {!collapsed && (
        <div className="px-3 py-3 border-b border-border/20">
          <DemoModeToggle />
        </div>
      )}

      {/* Nav items */}
      <nav className="flex-1 py-4 flex flex-col gap-1 px-2">
        {visibleNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary border-l-2 border-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && (
                <span className="flex-1">{item.label}</span>
              )}
              {!collapsed && item.path === "/feedback" && newCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#F47920] text-[10px] font-bold text-white px-1.5">
                  {newCount}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom: Present + Settings + Collapse */}
      <div className="px-2 pb-4 flex flex-col gap-1">
        {/* Present button */}
        <button
          onClick={startPresentation}
          className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 transition-colors"
        >
          <Presentation className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Present</span>}
        </button>

        {/* Settings — hidden in demo mode */}
        {!isDemoMode && (
          <NavLink
            to="/settings"
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
              location.pathname === "/settings"
                ? "bg-primary/10 text-primary border-l-2 border-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            )}
          >
            <Settings className="w-5 h-5 shrink-0" />
            {!collapsed && <span>Settings</span>}
          </NavLink>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
        >
          {collapsed ? (
            <PanelLeft className="w-5 h-5 shrink-0" />
          ) : (
            <>
              <PanelLeftClose className="w-5 h-5 shrink-0" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
