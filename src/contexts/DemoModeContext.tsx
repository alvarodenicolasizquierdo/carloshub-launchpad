import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface DemoModeContextType {
  isDemoMode: boolean;
  toggleDemoMode: () => void;
  resetDemo: () => void;
}

const DemoModeContext = createContext<DemoModeContextType | null>(null);

const DEMO_BLOCKED_ROUTES = ["/settings", "/feedback"];

export function DemoModeProvider({ children }: { children: ReactNode }) {
  const [isDemoMode, setIsDemoMode] = useState(
    () => sessionStorage.getItem("carlos_demo_mode") === "true"
  );
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDemoMode = useCallback(() => {
    setIsDemoMode((prev) => {
      const next = !prev;
      if (next) {
        sessionStorage.setItem("carlos_demo_mode", "true");
      } else {
        sessionStorage.removeItem("carlos_demo_mode");
      }
      return next;
    });
  }, []);

  const resetDemo = useCallback(() => {
    navigate("/", { replace: true });
    toast({ title: "Demo reset", description: "Ready for next presentation" });
  }, [navigate]);

  // Route guard: redirect blocked routes
  useEffect(() => {
    if (isDemoMode && DEMO_BLOCKED_ROUTES.some((r) => location.pathname.startsWith(r))) {
      navigate("/", { replace: true });
    }
  }, [isDemoMode, location.pathname, navigate]);

  // Ctrl+Shift+D — secret exit from demo mode
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "d") {
        e.preventDefault();
        e.stopPropagation();
        if (isDemoMode) {
          setIsDemoMode(false);
          sessionStorage.removeItem("carlos_demo_mode");
          toast({ title: "Demo mode off", description: "Internal view restored" });
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isDemoMode]);

  return (
    <DemoModeContext.Provider value={{ isDemoMode, toggleDemoMode, resetDemo }}>
      {children}
    </DemoModeContext.Provider>
  );
}

const DEMO_MODE_DEFAULTS: DemoModeContextType = {
  isDemoMode: false,
  toggleDemoMode: () => {},
  resetDemo: () => {},
};

export function useDemoMode() {
  const ctx = useContext(DemoModeContext);
  return ctx ?? DEMO_MODE_DEFAULTS;
}
