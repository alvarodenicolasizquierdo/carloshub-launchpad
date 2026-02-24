import { NavLink, useLocation } from "react-router-dom";
import { AnimatedOutlet } from "./AnimatedOutlet";
import {
  Home,
  Play,
  LayoutGrid,
  GitCompare,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { Footer } from "./Footer";

const NAV_ITEMS = [
  { label: "Home", icon: Home, path: "/preview" },
  { label: "Guided Demo", icon: Play, path: "/preview/demo" },
  { label: "Apps", icon: LayoutGrid, path: "/preview/apps" },
  { label: "Compare", icon: GitCompare, path: "/preview/compare" },
  { label: "Collateral", icon: Download, path: "/preview/collateral" },
];

export function PreviewLayout() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Top nav bar */}
      <header className="sticky top-0 z-40 h-14 flex items-center justify-between px-6 bg-card/80 backdrop-blur-xl border-b border-border/40">
        <div className="flex items-center gap-6">
          <span className="font-display font-bold text-primary text-lg">THT — CARLOS</span>
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>
        <span className="text-xs text-muted-foreground tracking-wide uppercase hidden sm:block">
          Preview Mode
        </span>
      </header>

      {/* Content */}
      <main className="flex-1">
        <AnimatedOutlet />
      </main>

      <Footer />
    </div>
  );
}
