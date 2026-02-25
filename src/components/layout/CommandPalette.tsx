import * as React from "react";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  User,
  Search,
  LayoutGrid,
  Play,
  Radar,
  Download,
  Sparkles,
  MessageSquarePlus,
  Home,
  FileText,
  Lightbulb,
  ExternalLink,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useNavigate } from "react-router-dom";
import { usePresentation } from "@/contexts/PresentationContext";
import { useDemoMode } from "@/contexts/DemoModeContext";

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const { startPresentation } = usePresentation();
  const { isDemoMode, toggleDemoMode } = useDemoMode();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => navigate("/"))}>
            <Home className="mr-2 h-4 w-4" />
            <span>Home</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/demo"))}>
            <Play className="mr-2 h-4 w-4" />
            <span>Guided Demo</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/apps"))}>
            <LayoutGrid className="mr-2 h-4 w-4" />
            <span>Apps</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/competitive"))}>
            <Radar className="mr-2 h-4 w-4" />
            <span>Market Intelligence</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/collateral"))}>
            <Download className="mr-2 h-4 w-4" />
            <span>Collateral</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/whats-new"))}>
            <Sparkles className="mr-2 h-4 w-4" />
            <span>What's New</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => navigate("/feedback"))}>
            <MessageSquarePlus className="mr-2 h-4 w-4" />
            <span>Feedback & Ideas</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => runCommand(() => startPresentation())}>
            <Play className="mr-2 h-4 w-4" />
            <span>Start Presentation</span>
            <CommandShortcut>P</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => toggleDemoMode())}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Toggle Demo Mode</span>
            <CommandShortcut>D</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        
        <CommandSeparator />

        <CommandGroup heading="Resources">
           <CommandItem onSelect={() => runCommand(() => window.open("https://www.google.com", "_blank"))}>
            <ExternalLink className="mr-2 h-4 w-4" />
            <span>External Resources (Example)</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />
        
        <CommandGroup heading="Settings">
          <CommandItem onSelect={() => runCommand(() => navigate("/settings"))}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
