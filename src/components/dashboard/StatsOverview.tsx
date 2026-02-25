import { Layers, Monitor, Brain, Blocks, TrendingUp, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useCountUp } from "@/hooks/use-count-up";

const STATS = [
  { label: "Apps", value: 4, icon: Layers, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Screens", value: 95, icon: Monitor, color: "text-purple-500", bg: "bg-purple-500/10" },
  { label: "ML Features", value: 847, icon: Brain, color: "text-pink-500", bg: "bg-pink-500/10" },
  { label: "Components", value: 515, icon: Blocks, color: "text-orange-500", bg: "bg-orange-500/10" },
];

function StatItem({ stat }: { stat: typeof STATS[number] }) {
  const { count, ref } = useCountUp(stat.value, 2000);
  
  return (
    <Card ref={ref}>
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
          <div className="text-2xl font-bold">{count}</div>
        </div>
        <div className={`p-2 rounded-lg ${stat.bg}`}>
          <stat.icon className={`w-5 h-5 ${stat.color}`} />
        </div>
      </CardContent>
    </Card>
  );
}

export function StatsOverview() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {STATS.map((stat) => (
        <StatItem key={stat.label} stat={stat} />
      ))}
    </div>
  );
}
