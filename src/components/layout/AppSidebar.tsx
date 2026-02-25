import { useState, useEffect } from "react";
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
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePresentation } from "@/contexts/PresentationContext";
import { useDemoMode } from "@/contexts/DemoModeContext";
import { DemoModeToggle } from "@/components/DemoModeToggle";
import { useFeedbackHub } from "@/hooks/useFeedbackHub";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

// Organized Navigation Groups
const NAV_GROUPS = [
  {
    title: "Platform",
    items: [
      { label: "Home", icon: Home, path: "/", demoVisible: true },
      { label: "Guided Demo", icon: Play, path: "/demo", demoVisible: true },
      { label: "Apps", icon: LayoutGrid, path: "/apps", demoVisible: true },
    ],
  },
  {
    title: "Intelligence",
    items: [
      { label: "Market Intel", icon: Radar, path: "/competitive", demoVisible: false },
      { label: "Digital Shift", icon: Radar, path: "/digital-shift", demoVisible: false },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Collateral", icon: Download, path: "/collateral", demoVisible: true },
      { label: "What's New", icon: Sparkles, path: "/whats-new", demoVisible: true },
      { label: "Feedback", icon: MessageSquarePlus, path: "/feedback", demoVisible: false },
    ],
  },
];

export function SidebarContent({ collapsed, setCollapsed, onNavigate }: { collapsed: boolean; setCollapsed?: (v: boolean) => void; onNavigate?: () => void }) {
  const location = useLocation();
  const { startPresentation } = usePresentation();
  const { isDemoMode } = useDemoMode();
  const newCount = useFeedbackHub((s) => s.submissions.filter((x) => x.status === "new").length);

  // Group filtering logic based on demo mode
  const visibleGroups = NAV_GROUPS.map(group => ({
    ...group,
    items: isDemoMode 
      ? group.items.filter(item => item.demoVisible)
      : group.items
  })).filter(group => group.items.length > 0);

  return (
    <div className="flex flex-col h-full bg-sidebar-background text-sidebar-foreground">
      {/* Logo Area */}
      <div className={cn("h-14 flex items-center px-4 border-b border-sidebar-border transition-all duration-300", collapsed ? "justify-center px-2" : "")}>
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
             <span className="text-primary-foreground font-bold font-display">T</span>
          </div>
          {!collapsed && (
            <span className="font-display font-bold text-lg whitespace-nowrap">
              Hub
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-6">
        {visibleGroups.map((group, groupIndex) => (
          <div key={group.title} className="space-y-1">
            {!collapsed && (
              <h4 className="px-2 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider mb-2">
                {group.title}
              </h4>
            )}
            {group.items.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onNavigate}
                  className={cn(
                    "group flex items-center gap-3 px-2 py-2 rounded-md text-sm font-medium transition-colors relative",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground",
                    collapsed && "justify-center px-0"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className={cn("w-4 h-4 shrink-0", isActive && "text-primary")} />
                  {!collapsed && (
                    <span className="flex-1 truncate">{item.label}</span>
                  )}
                  {!collapsed && item.path === "/feedback" && newCount > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground px-1.5">
                      {newCount}
                    </span>
                  )}
                  {collapsed && item.path === "/feedback" && newCount > 0 && (
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
                  )}
                </NavLink>
              );
            })}
             {/* Add separator after groups except the last one */}
             {!collapsed && groupIndex < visibleGroups.length - 1 && (
               <div className="mx-2 my-2 h-px bg-sidebar-border/50" />
             )}
          </div>
        ))}
      </nav>

      {/* Footer Actions */}
      <div className="p-2 border-t border-sidebar-border space-y-1">
        {!collapsed && !isDemoMode && (
          <div className="px-2 py-2">
             <DemoModeToggle />
          </div>
        )}
        
        <button
          onClick={() => { startPresentation(); onNavigate?.(); }}
          className={cn(
            "w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm font-medium text-primary hover:bg-primary/10 transition-colors",
            collapsed && "justify-center"
          )}
          title="Start Presentation"
        >
          <Presentation className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Present</span>}
        </button>

        {!isDemoMode && (
          <NavLink
            to="/settings"
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 px-2 py-2 rounded-md text-sm font-medium transition-colors",
              location.pathname === "/settings"
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground",
               collapsed && "justify-center"
            )}
            title="Settings"
          >
            <Settings className="w-4 h-4 shrink-0" />
            {!collapsed && <span>Settings</span>}
          </NavLink>
        )}

        {setCollapsed && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50 transition-colors",
              collapsed && "justify-center"
            )}
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {collapsed ? (
              <PanelLeft className="w-4 h-4 shrink-0" />
            ) : (
              <>
                <PanelLeftClose className="w-4 h-4 shrink-0" />
                <span>Collapse</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useIsMobile();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Listen for the custom toggle event
  useEffect(() => {
    const handleToggle = () => setMobileOpen(true);
    document.addEventListener('toggle-mobile-menu', handleToggle);
    return () => document.removeEventListener('toggle-mobile-menu', handleToggle);
  }, []);

  if (isMobile) {
    return (
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
         <SheetContent side="left" className="w-72 p-0 border-r border-sidebar-border bg-sidebar-background">
          <SidebarContent collapsed={false} onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside
      className={cn(
        "h-full flex flex-col border-r border-sidebar-border transition-all duration-300 shrink-0 bg-sidebar-background",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <SidebarContent collapsed={collapsed} setCollapsed={setCollapsed} />
    </aside>
  );
}
