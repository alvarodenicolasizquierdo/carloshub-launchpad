import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Home,
  Play,
  LayoutGrid,
  GitCompare,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePresentation } from "@/contexts/PresentationContext";


const SLIDES = [
  { label: "Home", icon: Home, path: "/" },
  { label: "Demo", icon: Play, path: "/demo" },
  { label: "Apps", icon: LayoutGrid, path: "/apps" },
  { label: "Compare", icon: GitCompare, path: "/compare" },
  { label: "Collateral", icon: Download, path: "/collateral" },
];

const IDLE_TIMEOUT = 3000;

export function PresentationControls() {
  const { isPresenting, stopPresentation } = usePresentation();
  const navigate = useNavigate();
  const location = useLocation();
  const [controlsVisible, setControlsVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout>>();

  const currentIndex = SLIDES.findIndex((s) => s.path === location.pathname);
  const percentage = SLIDES.length > 1 ? ((currentIndex + 1) / SLIDES.length) * 100 : 100;

  // Animate in when presenting starts
  useEffect(() => {
    if (isPresenting) {
      requestAnimationFrame(() => setMounted(true));
    } else {
      setMounted(false);
    }
  }, [isPresenting]);

  const goPrev = useCallback(() => {
    const ci = SLIDES.findIndex((s) => s.path === window.location.pathname);
    const prev = ci > 0 ? ci - 1 : SLIDES.length - 1;
    navigate(SLIDES[prev].path);
  }, [navigate]);

  const goNext = useCallback(() => {
    const ci = SLIDES.findIndex((s) => s.path === window.location.pathname);
    const next = ci < SLIDES.length - 1 ? ci + 1 : 0;
    navigate(SLIDES[next].path);
  }, [navigate]);

  // Keyboard navigation
  useEffect(() => {
    if (!isPresenting) return;
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          goPrev();
          break;
        case "ArrowRight":
        case "ArrowDown":
        case " ":
          e.preventDefault();
          goNext();
          break;
        case "Escape":
          e.preventDefault();
          stopPresentation();
          break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isPresenting, goPrev, goNext, stopPresentation]);

  // Auto-hide controls on mouse idle
  useEffect(() => {
    if (!isPresenting) {
      setControlsVisible(true);
      return;
    }

    const resetTimer = () => {
      setControlsVisible(true);
      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setControlsVisible(false), IDLE_TIMEOUT);
    };

    resetTimer();
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("mousedown", resetTimer);

    return () => {
      clearTimeout(idleTimer.current);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("mousedown", resetTimer);
    };
  }, [isPresenting]);

  if (!isPresenting) return null;

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 h-0.5 bg-primary z-50 transition-all duration-500" style={{ width: `${percentage}%` }} />

      {/* Floating toolbar */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 rounded-full backdrop-blur-2xl bg-card/70 border border-border/30 shadow-[0_8px_32px_rgba(0,0,0,0.4)] px-2 py-1.5 transition-all duration-300 ${
          mounted && controlsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"
        }`}
      >
        {/* Logo */}
        <span className="font-display font-bold text-primary text-sm mx-2">THT</span>

        <div className="w-px h-6 bg-border/40" />

        {/* Prev */}
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={goPrev}>
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Slide counter */}
        <span className="text-xs text-muted-foreground tabular-nums min-w-[3ch] text-center">
          {currentIndex + 1} / {SLIDES.length}
        </span>

        {/* Next */}
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={goNext}>
          <ChevronRight className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border/40" />

        {/* Slide indicators */}
        <div className="flex items-center gap-1 px-1">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.path}
              onClick={() => navigate(slide.path)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                i === currentIndex
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
              title={slide.label}
            >
              <slide.icon className="h-3.5 w-3.5" />
              {i === currentIndex && <span>{slide.label}</span>}
            </button>
          ))}
        </div>

        <div className="w-px h-6 bg-border/40" />

        {/* Exit */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full text-muted-foreground hover:text-destructive"
          onClick={stopPresentation}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}
