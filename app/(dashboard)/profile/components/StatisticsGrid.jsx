"use client";
import { motion } from "framer-motion";
import { Flame, BookOpen, Zap, Crown, Target, Award } from "lucide-react";
import { TrendingUp } from "lucide-react";

export default function StatisticsGrid() {
  const userStats = [
    { icon: Flame, value: "127", label: "Subscribers", color: "text-primary", bg: "bg-primary/10" },
    { icon: BookOpen, value: "448", label: "Lesson Passed", color: "text-secondary", bg: "bg-secondary/10" },
    { icon: Zap, value: "957", label: "Total Lessons", color: "text-accent", bg: "bg-accent/10" },
    { icon: Crown, value: "15,274", label: "Total XP Gained", color: "text-amber-500", bg: "bg-amber-500/10" },
    { icon: Target, value: "289", label: "Current Practice", color: "text-palm-green", bg: "bg-palm-green/10" },
    { icon: Award, value: "36", label: "Top 10 Position", color: "text-violet", bg: "bg-violet/10" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className="bg-transparent lg:bg-card rounded-none lg:rounded-2xl shadow-none lg:shadow-lg border-0 lg:border lg:border-border p-0 lg:p-6"
    >
      <div className="lg:p-6 mb-4 lg:mb-6">
        <h3 className="flex items-center gap-2 text-xl font-semibold">
          <TrendingUp className="w-5 h-5 text-accent" />
          Your Statistics
        </h3>
      </div>
      <div className="lg:px-6 lg:pb-6">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          {userStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
                className={`${stat.bg} rounded-xl lg:rounded-2xl p-4 lg:p-6 hover:shadow-sm lg:hover:shadow-md transition-all cursor-pointer border border-border/30`}
              >
                <IconComponent className={`w-6 h-6 lg:w-8 lg:h-8 ${stat.color} mb-2 lg:mb-3`} />
                <div className="text-xl lg:text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-xs lg:text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}