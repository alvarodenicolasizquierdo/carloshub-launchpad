import { Check, X, AlertTriangle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { NEGATIVE_VALUES, PARTIAL_VALUES, type FeatureValue } from "./compareData";

interface CompareValueCellProps {
  value: FeatureValue;
  caveat?: string;
  isCarlos?: boolean;
}

const CompareValueCell = ({ value, caveat, isCarlos }: CompareValueCellProps) => {
  const renderValue = () => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="h-5 w-5 text-accent-green mx-auto" />
      ) : (
        <X className="h-5 w-5 text-destructive/60 mx-auto" />
      );
    }

    const isNegative = NEGATIVE_VALUES.includes(value);
    const isPartial = PARTIAL_VALUES.includes(value);
    return (
      <span className="inline-flex items-center justify-center gap-1.5">
        {isCarlos && !isPartial ? (
          <Check className="h-3.5 w-3.5 text-accent-green shrink-0" />
        ) : isPartial ? (
          <AlertTriangle className="h-3.5 w-3.5 text-yellow-500 shrink-0" />
        ) : isNegative ? (
          <X className="h-3.5 w-3.5 text-destructive/60 shrink-0" />
        ) : null}
        <span
          className={
            isCarlos && !isPartial
              ? "font-semibold text-foreground"
              : isPartial
                ? "text-yellow-500"
                : isNegative
                  ? "text-muted-foreground"
                  : "text-foreground"
          }
        >
          {value}
        </span>
      </span>
    );
  };

  const content = (
    <div className="flex flex-col items-center gap-0.5">
      {renderValue()}
    </div>
  );

  if (caveat) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex flex-col items-center gap-0.5 cursor-help">
            {renderValue()}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs text-xs">
          <p>{caveat}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
};

export default CompareValueCell;
