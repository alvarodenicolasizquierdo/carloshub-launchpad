import { useState, useEffect, useCallback } from "react";
import { APPS, getAppUrl } from "@/config/constants";

export type AppStatus = "checking" | "online" | "offline";

export function useAppStatus() {
  const [statuses, setStatuses] = useState<Record<string, AppStatus>>(
    () => Object.fromEntries(APPS.map((a) => [a.id, "checking" as AppStatus]))
  );

  const check = useCallback(() => {
    const controller = new AbortController();

    setStatuses(Object.fromEntries(APPS.map((a) => [a.id, "checking" as AppStatus])));

    APPS.forEach(async (app) => {
      const url = getAppUrl(app.id);
      if (!url) {
        setStatuses((prev) => ({ ...prev, [app.id]: "offline" }));
        return;
      }
      try {
        const res = await fetch(url, {
          method: "HEAD",
          mode: "no-cors",
          signal: controller.signal,
        });
        setStatuses((prev) => ({
          ...prev,
          [app.id]: res.status === 0 || res.ok ? "online" : "offline",
        }));
      } catch {
        if (!controller.signal.aborted) {
          setStatuses((prev) => ({ ...prev, [app.id]: "offline" }));
        }
      }
    });

    return controller;
  }, []);

  useEffect(() => {
    const controller = check();
    return () => controller.abort();
  }, [check]);

  return { statuses, refresh: check };
}
