import { useState, useEffect } from "react";
import { Save, RotateCcw, ExternalLink } from "lucide-react";
import { tagScreen } from "@/utils/clarityTracking";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { APPS, APP_URLS, STORAGE_KEYS } from "@/config/constants";

function loadOverrides(): Record<string, string> {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEYS.appUrls) || "{}");
    if (typeof raw === "object" && raw !== null && !Array.isArray(raw)) return raw;
  } catch {}
  return {};
}

const SettingsPage = () => {
  const { toast } = useToast();
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [client, setClient] = useState("");

  useEffect(() => { tagScreen("settings"); }, []);

  useEffect(() => {
    const overrides = loadOverrides();
    // Pre-fill with current overrides or defaults
    const initial: Record<string, string> = {};
    APPS.forEach((app) => {
      initial[app.id] = overrides[app.id] || "";
    });
    setUrls(initial);
    setClient(localStorage.getItem(STORAGE_KEYS.clientName) || "");
  }, []);

  const handleSave = () => {
    // Only store non-empty overrides
    const overrides: Record<string, string> = {};
    Object.entries(urls).forEach(([id, url]) => {
      if (url.trim()) overrides[id] = url.trim();
    });
    localStorage.setItem(STORAGE_KEYS.appUrls, JSON.stringify(overrides));

    if (client.trim()) localStorage.setItem(STORAGE_KEYS.clientName, client.trim());

    toast({ title: "Settings saved", description: "Your preferences have been saved." });
  };

  const handleReset = () => {
    const cleared: Record<string, string> = {};
    APPS.forEach((app) => { cleared[app.id] = ""; });
    setUrls(cleared);
    localStorage.removeItem(STORAGE_KEYS.appUrls);
    toast({ title: "URLs reset", description: "All app URLs restored to defaults." });
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold">Settings</h1>
        <p className="mt-1 text-muted-foreground">Configure audience details and custom app URLs.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Audience</CardTitle>
          <CardDescription>Used in the demo walkthrough and collateral.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-w-sm">
            <Label htmlFor="client">Client / Audience</Label>
            <Input
              id="client"
              placeholder="e.g. Shanghai Workshop"
              value={client}
              onChange={(e) => setClient(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* App URL overrides */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">App URL Overrides</CardTitle>
          <CardDescription>
            Enter custom domain URLs (e.g. <code className="text-xs bg-muted px-1 py-0.5 rounded">tht-carlos.dnaventures.es</code>). Leave blank to use the default Lovable URL.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {APPS.map((app) => (
            <div key={app.id} className="space-y-1.5">
              <Label htmlFor={`url-${app.id}`} className="flex items-center gap-2">
                {app.name}
                <span className="text-[10px] text-muted-foreground font-normal">
                  default: {APP_URLS[app.id]}
                </span>
              </Label>
              <div className="flex gap-2">
                <Input
                  id={`url-${app.id}`}
                  type="url"
                  placeholder={APP_URLS[app.id]}
                  value={urls[app.id] || ""}
                  onChange={(e) => setUrls((prev) => ({ ...prev, [app.id]: e.target.value }))}
                />
                {urls[app.id]?.trim() && (
                  <Button variant="ghost" size="icon" asChild className="shrink-0">
                    <a href={urls[app.id]} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-3 justify-end">
        <Button variant="outline" onClick={handleReset} className="gap-1.5">
          <RotateCcw className="h-4 w-4" />
          Reset URLs
        </Button>
        <Button onClick={handleSave} className="gap-1.5">
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;
