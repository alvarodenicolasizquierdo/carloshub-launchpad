import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function DesignVisionBadge() {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <div
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border cursor-help transition-all duration-300
                     bg-primary/10 border-primary/25
                     hover:bg-primary/15 hover:border-primary/40"
        >
          {/* Pulsing Dot */}
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>

          {/* Badge Text */}
          <span
            className="font-display text-[9px] font-bold uppercase tracking-wider text-primary"
            style={{ textShadow: '0 0 8px rgba(244,121,32,0.25)' }}
          >
            Design Vision
          </span>
        </div>
      </TooltipTrigger>

      <TooltipContent
        side="bottom"
        align="end"
        sideOffset={8}
        className="z-[200] max-w-[320px] p-4 bg-background/95 backdrop-blur-xl border border-primary/15 shadow-xl shadow-primary/5 rounded-lg"
      >
        <p className="font-display text-xs leading-relaxed text-muted-foreground">
          Everything you see is a{' '}
          <span className="text-primary font-semibold">design vision</span> — a
          detailed, interactive blueprint of what this platform will look like
          and how it will work. It is built on real production data from our UKI
          clients and mapped to documented functional requirements. This is not a
          finished product — it is the roadmap to production, built with strategic
          investment intent.
        </p>
      </TooltipContent>
    </Tooltip>
  );
}

export default DesignVisionBadge;
