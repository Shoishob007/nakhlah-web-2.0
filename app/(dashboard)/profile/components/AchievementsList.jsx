"use client";
import { motion } from "framer-motion";
import { Award, Sparkles, CheckCircle } from "lucide-react";

export default function AchievementsList() {
  const achievements = [
    {
      title: "Great King",
      description: "Get 5000 XP in the month to get this badge",
      progress: 3.7,
      total: 5,
      color: "bg-violet",
      icon: "👑",
      sparkle: true,
    },
    {
      title: "Einstein's Brain",
      description: "Completed 80% in solo lesson to earn this",
      progress: 12,
      total: 20,
      color: "bg-palm-green",
      icon: "🧠",
      sparkle: true,
    },
    {
      title: "Tough Knight",
      description: "Solve 3000 mix words to pass this quest",
      progress: 1.8,
      total: 25,
      color: "bg-primary",
      icon: "⚔️",
      sparkle: false,
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="flex items-center gap-2 text-xl font-semibold">
          <Award className="w-5 h-5 text-accent" />
          Achievements
        </h3>
      </div>
      
      <div className="space-y-4">
        {achievements.map((achievement, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index + 0.4, duration: 0.5 }}
            className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl border border-border/30"
          >
            <div className="relative">
              <div className={`w-12 h-12 rounded-xl ${achievement.color} flex items-center justify-center text-2xl`}>
                {achievement.icon}
                {achievement.sparkle && (
                  <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-300" />
                )}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm">{achievement.title}</h4>
              <p className="text-xs text-muted-foreground mb-2">{achievement.description}</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${achievement.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                    transition={{ delay: 0.1 * index + 0.6, duration: 1, ease: "easeOut" }}
                  />
                </div>
                <span className="text-xs whitespace-nowrap">
                  {achievement.progress}K / {achievement.total}K
                </span>
              </div>
            </div>

            <CheckCircle className="w-5 h-5 text-accent" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}