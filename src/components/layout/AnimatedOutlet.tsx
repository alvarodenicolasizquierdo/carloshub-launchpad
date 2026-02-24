import { useLocation, useOutlet } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { PageSkeleton } from "./PageSkeleton";

export function AnimatedOutlet() {
  const location = useLocation();
  const outlet = useOutlet();
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      prevPath.current = location.pathname;
      setIsVisible(false);
      setShowSkeleton(true);
      const timer = setTimeout(() => {
        setShowSkeleton(false);
        setIsVisible(true);
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  return showSkeleton ? (
    <div className="min-h-full animate-in fade-in duration-75">
      <PageSkeleton />
    </div>
  ) : (
    <div
      className="min-h-full transition-all duration-200 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(8px)",
      }}
    >
      {outlet}
    </div>
  );
}
