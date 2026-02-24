import { useDemoMode } from "@/contexts/DemoModeContext";
import type { ReactNode } from "react";

interface InternalOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function InternalOnly({ children, fallback = null }: InternalOnlyProps) {
  const { isDemoMode } = useDemoMode();
  if (isDemoMode) return <>{fallback}</>;
  return <>{children}</>;
}
