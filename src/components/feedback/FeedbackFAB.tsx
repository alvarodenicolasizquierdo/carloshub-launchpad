import { useNavigate, useLocation } from "react-router-dom";
import { MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { InternalOnly } from "@/components/InternalOnly";

export function FeedbackFAB() {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show on /feedback itself
  if (location.pathname === "/feedback") return null;

  return (
    <InternalOnly>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => navigate("/feedback?submit=true")}
            className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[#F47920] hover:bg-[#e06810] text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 p-0"
          >
            <MessageSquarePlus className="h-6 w-6" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          Share feedback or ask a question
        </TooltipContent>
      </Tooltip>
    </InternalOnly>
  );
}
