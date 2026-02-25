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
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePresentation } from "@/contexts/PresentationContext";
import { useDemoMode } from "@/contexts/DemoModeContext";
import { DemoModeToggle } from "@/components/DemoModeToggle";
import { useFeedbackHub } from "@/hooks/useFeedbackHub";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { label: "Home", icon: Home, path: "/", demoVisible: true },
  { label: "Guided Demo", icon: Play, path: "/demo", demoVisible: true },
  { label: "Apps", icon: LayoutGrid, path: "/apps", demoVisible: true },
  { label: "Market Intelligence", icon: Radar, path: "/competitive", demoVisible: false },
  { label: "Collateral", icon: Download, path: "/collateral", demoVisible: true },
  { label: "What's New", icon: Sparkles, path: "/whats-new", demoVisible: true },
  { label: "Feedback & Ideas", icon: MessageSquarePlus, path: "/feedback", demoVisible: false },
];

function SidebarContent({ collapsed, setCollapsed, onNavigate }: { collapsed: boolean; setCollapsed?: (v: boolean) => void; onNavigate?: () => void }) {
  const location = useLocation();
  const { startPresentation } = usePresentation();
  const { isDemoMode } = useDemoMode();
  const newCount = useFeedbackHub((s) => s.submissions.filter((x) => x.status === "new").length);

  const visibleNavItems = isDemoMode
    ? NAV_ITEMS.filter((item) => item.demoVisible)
    : NAV_ITEMS;

  return (
    <>
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
              onClick={onNavigate}
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
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground px-1.5">
                  {newCount}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom: Present + Settings + Collapse */}
      <div className="px-2 pb-4 flex flex-col gap-1">
        <button
          onClick={() => { startPresentation(); onNavigate?.(); }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 transition-colors"
        >
          <Presentation className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Present</span>}
        </button>

        {!isDemoMode && (
          <NavLink
            to="/settings"
            onClick={onNavigate}
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

        {setCollapsed && (
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
        )}
      </div>
    </>
  );
}

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useIsMobile();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (isMobile) {
    return (
      <>
        {/* Mobile hamburger button — fixed top-left */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="fixed top-3 left-3 z-50 h-10 w-10 bg-tht-dark/80 backdrop-blur-sm border border-border/20 text-foreground hover:bg-tht-dark"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 bg-tht-dark/95 backdrop-blur-xl border-r border-border/20">
            <SidebarContent collapsed={false} onNavigate={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>
      </>
    );
  }

  return (
    <aside
      className={cn(
        "h-full flex flex-col border-r border-border/20 transition-all duration-300 shrink-0 backdrop-blur-xl bg-tht-dark/90",
        collapsed ? "w-16" : "w-60"
      )}
    >
      <SidebarContent collapsed={collapsed} setCollapsed={setCollapsed} />
    </aside>
  );
}
