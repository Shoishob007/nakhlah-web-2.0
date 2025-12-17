import HeaderSection from "./components/HeaderSection";
import StatisticsGrid from "./components/StatisticsGrid";
import XPChart from "./components/XPChart";
import AchievementsList from "./components/AchievementsList";
import MotivationCard from "./components/MotivationCard";
import QuickStats from "./components/QuickStats";
import ShareProfile from "./components/ShareProfile";
import { Flame, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProfilePage({ onNavigateSettings }) {
  const stats = [
    { label: "Followers", value: "1,536" },
    { label: "Following", value: "195" },
    { label: "Activity XP", value: "15,274" },
  ];

  return (
    <div className="max-w-7xl mx-auto min-h-[calc(100vh-64px)] overflow-x-hidden">
      <HeaderSection stats={stats} onNavigateSettings={onNavigateSettings} />
      
      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-6 lg:space-y-8">
          <StatisticsGrid />
          <XPChart />
          <AchievementsList />
        </div>

        {/* Sidebar - Only on Desktop */}
        <div className="hidden lg:block space-y-8">
          <MotivationCard />
          <QuickStats />
          <ShareProfile />
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-card border-t border-border px-4 py-3 lg:hidden overflow-x-hidden">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Streak: 7 days</span>
          </div>
          <Button size="sm" className="bg-gradient-accent text-accent-foreground">
            <Share2 className="w-4 h-4 mr-1" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}