import { Flame, Target, Zap, BookOpen, Award } from "lucide-react";

export default function QuickStats() {
  const quickStats = [
    { label: "Current Streak", value: "7 days", icon: Flame, color: "text-primary" },
    { label: "Longest Streak", value: "21 days", icon: Target, color: "text-palm-green" },
    { label: "Total XP", value: "15,274", icon: Zap, color: "text-amber-500" },
    { label: "Words Learned", value: "448", icon: BookOpen, color: "text-secondary" },
    { label: "Lessons Completed", value: "127", icon: Award, color: "text-accent" },
  ];

  return (
    <div className="rounded-2xl bg-card shadow-lg border border-border overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-6">Quick Stats</h3>
      </div>
      <div className="px-6 pb-6 space-y-3">
        {quickStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-all cursor-pointer border border-border/30"
            >
              <div className="flex items-center gap-3">
                <IconComponent className={`w-5 h-5 ${stat.color}`} />
                <span className="text-muted-foreground font-medium">{stat.label}</span>
              </div>
              <span className="font-bold text-foreground">
                {stat.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}