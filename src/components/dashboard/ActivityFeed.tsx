import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const ACTIVITIES = [
  {
    id: 1,
    user: "System",
    avatar: "SY",
    action: "Updated market data",
    target: "Competitor Intelligence",
    time: "2 hours ago",
    type: "system",
  },
  {
    id: 2,
    user: "Sarah Chen",
    avatar: "SC",
    action: "commented on",
    target: "DPP Compliance Draft",
    time: "4 hours ago",
    type: "comment",
  },
  {
    id: 3,
    user: "New Feature",
    avatar: "✨",
    action: "released",
    target: "Sustainability Scorecard v2",
    time: "Yesterday",
    type: "release",
  },
  {
    id: 4,
    user: "Alex Morgan",
    avatar: "AM",
    action: "uploaded",
    target: "Q3 Strategy Deck.pdf",
    time: "Yesterday",
    type: "upload",
  },
];

export function ActivityFeed() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
          <Badge variant="secondary" className="text-xs font-normal">Updated just now</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {ACTIVITIES.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
            <Avatar className="h-8 w-8 mt-0.5">
              <AvatarImage src={`/avatars/${activity.avatar}.png`} />
              <AvatarFallback className={activity.type === 'release' ? 'bg-primary/10 text-primary' : ''}>
                {activity.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-0.5">
              <p className="text-sm font-medium leading-none">
                <span className="text-foreground">{activity.user}</span>{" "}
                <span className="text-muted-foreground font-normal">{activity.action}</span>{" "}
                <span className="text-foreground">{activity.target}</span>
              </p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
