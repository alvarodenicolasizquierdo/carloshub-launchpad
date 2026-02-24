import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

interface PresentationContextType {
  isPresenting: boolean;
  startPresentation: () => void;
  stopPresentation: () => void;
  togglePresentation: () => void;
}

const PresentationContext = createContext<PresentationContextType | null>(null);

export function PresentationProvider({ children }: { children: ReactNode }) {
  const [isPresenting, setIsPresenting] = useState(false);

  const startPresentation = useCallback(() => {
    setIsPresenting(true);
    document.documentElement.requestFullscreen?.().catch(() => {});
  }, []);

  const stopPresentation = useCallback(() => {
    setIsPresenting(false);
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    }
  }, []);

  const togglePresentation = useCallback(() => {
    setIsPresenting((prev) => {
      if (!prev) {
        document.documentElement.requestFullscreen?.().catch(() => {});
      } else if (document.fullscreenElement) {
        document.exitFullscreen?.().catch(() => {});
      }
      return !prev;
    });
  }, []);

  // Sync: if user exits fullscreen natively (browser Escape), stop presenting
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsPresenting(false);
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <PresentationContext.Provider value={{ isPresenting, startPresentation, stopPresentation, togglePresentation }}>
      {children}
    </PresentationContext.Provider>
  );
}

export function usePresentation() {
  const ctx = useContext(PresentationContext);
  if (!ctx) throw new Error("usePresentation must be used within PresentationProvider");
  return ctx;
}
