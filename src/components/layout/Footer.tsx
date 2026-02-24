import { getPresenterName } from "@/config/constants";
import { usePresentation } from "@/contexts/PresentationContext";
import { useDemoMode } from "@/contexts/DemoModeContext";

export function Footer() {
  const { isPresenting } = usePresentation();
  const { isDemoMode } = useDemoMode();

  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (isPresenting) return null;

  return (
    <footer className="h-8 flex items-center justify-between px-4 backdrop-blur-xl bg-tht-dark/90 text-muted-foreground text-xs shrink-0 border-t border-border/20">
      {isDemoMode ? (
        <>
          <span />
          <span className="text-muted-foreground/60">{today}</span>
          <span />
        </>
      ) : (
        <>
          <span className="tracking-wide uppercase">
            Prototype — Design Vision — Not Production Software
          </span>
          <span>{today}</span>
          <span>© DNA Ventures</span>
        </>
      )}
    </footer>
  );
}
