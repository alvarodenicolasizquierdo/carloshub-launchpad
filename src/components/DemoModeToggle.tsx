import { useDemoMode } from "@/contexts/DemoModeContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

export function DemoModeToggle() {
  const { isDemoMode, toggleDemoMode, resetDemo } = useDemoMode();

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <Switch
          id="demo-mode"
          checked={isDemoMode}
          onCheckedChange={toggleDemoMode}
          aria-label="Toggle Demo Mode"
        />
        <Label htmlFor="demo-mode" className="text-xs cursor-pointer select-none">
          Demo
        </Label>
      </div>

      {isDemoMode && (
        <>
          <Badge className="bg-primary text-primary-foreground text-[10px] px-2 py-0.5 tracking-wider uppercase font-semibold animate-pulse">
            Client View
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetDemo}
            className="text-xs text-muted-foreground h-7 px-2 gap-1"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </Button>
        </>
      )}
    </div>
  );
}
