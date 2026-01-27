import { GemStone } from "@/components/icons/Gem";
import { HighVoltage } from "@/components/icons/High-Voltage";
import { Bullseye } from "@/components/icons/BullsEye";
import { Flame } from "@/components/icons/Flame";
import MissionCard from "./MissionCard";
import MissionSection from "./MissionSection";
import { useMemo } from "react";

const allMissions = [
  // Daily missions
  {
    label: "Get 25 Diamonds",
    current: 12,
    target: 25,
    icon: GemStone,
    type: "daily",
  },
  {
    label: "Get 40 XP",
    current: 24,
    target: 40,
    icon: HighVoltage,
    type: "daily",
  },
  {
    label: "Get 2 perfect lessons",
    current: 0,
    target: 2,
    icon: Bullseye,
    type: "daily",
  },
  {
    label: "Complete 1 challenge",
    current: 1,
    target: 1,
    icon: Flame,
    type: "daily",
  },

  // Weekly missions
  {
    label: "Get 100 XP Weekly",
    current: 45,
    target: 100,
    icon: HighVoltage,
    type: "weekly",
  },
  {
    label: "Complete 5 Challenges",
    current: 2,
    target: 5,
    icon: Flame,
    type: "weekly",
  },
  {
    label: "Get 150 Diamonds",
    current: 87,
    target: 150,
    icon: GemStone,
    type: "weekly",
  },

  // Special missions
  {
    label: "Win Streak Challenge",
    current: 3,
    target: 7,
    icon: Flame,
    type: "special",
  },
  {
    label: "Master 3 Lessons",
    current: 1,
    target: 3,
    icon: Bullseye,
    type: "special",
  },
];

const questSections = [
  {
    type: "daily",
    title: "Daily Quests",
    icon: "📅",
    description: "Reset every day",
  },
  {
    type: "weekly",
    title: "Weekly Challenges",
    icon: "📊",
    description: "Reset every week",
  },
  {
    type: "special",
    title: "Special Events",
    icon: "⭐",
    description: "Limited time events",
  },
];

export default function DailyMissions() {
  const sections = useMemo(() => {
    return questSections.map((section) => ({
      ...section,
      missions: allMissions.filter((m) => m.type === section.type),
    }));
  }, []);

  const activeSections = sections.filter((s) => s.missions.length > 0);

  return (
    <div className="space-y-12">
      {activeSections.map((section) => (
        <MissionSection key={section.type} section={section} />
      ))}
    </div>
  );
}
