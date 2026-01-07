import { Medal, Trophy, Crown, Star } from "lucide-react";
import { Mascot } from "@/components/nakhlah/Mascot";
import { ZigzagPath } from "./components/ZigzagPath";
import { UserStats } from "./components/UserStats";
import { DailyQuests } from "./components/DailyQuests";
import { ProfileSection } from "./components/ProfileSection";

// Level 1: 7 lessons + 1 trophy
// Level 2: 7 lessons + 1 trophy  
// Level 3: 7 lessons + 1 crown
const lessons = [
  // Level 1
  { id: 1, type: "lesson", title: "Lesson 1", isCompleted: true, isCurrent: false, icon: <Star />, level: 1 },
  { id: 2, type: "lesson", title: "Lesson 2", isCompleted: true, isCurrent: false, icon: <Star />, level: 1 },
  { id: 3, type: "lesson", title: "Lesson 3", isCompleted: false, isCurrent: true, icon: <Star />, level: 1 },
  { id: 4, type: "checkpoint", title: "Checkpoint", isCompleted: false, isCurrent: false, icon: <Medal />, level: 1 },
  { id: 5, type: "lesson", title: "Lesson 4", isCompleted: false, isCurrent: false, icon: <Star />, level: 1 },
  { id: 6, type: "lesson", title: "Lesson 5", isCompleted: false, isCurrent: false, icon: <Star />, level: 1 },
  { id: 7, type: "lesson", title: "Lesson 6", isCompleted: false, isCurrent: false, icon: <Star />, level: 1 },
  { id: 8, type: "lesson", title: "Lesson 7", isCompleted: false, isCurrent: false, icon: <Star />, level: 1 },
  { id: 9, type: "trophy", title: "Level 1 Complete", isCompleted: false, isCurrent: false, icon: <Trophy />, level: 1 },
  
  // Level 2
  { id: 10, type: "lesson", title: "Lesson 8", isCompleted: false, isCurrent: false, icon: <Star />, level: 2 },
  { id: 11, type: "lesson", title: "Lesson 9", isCompleted: false, isCurrent: false, icon: <Star />, level: 2 },
  { id: 12, type: "lesson", title: "Lesson 10", isCompleted: false, isCurrent: false, icon: <Star />, level: 2 },
  { id: 13, type: "checkpoint", title: "Checkpoint", isCompleted: false, isCurrent: false, icon: <Medal />, level: 2 },
  { id: 14, type: "lesson", title: "Lesson 11", isCompleted: false, isCurrent: false, icon: <Star />, level: 2 },
  { id: 15, type: "lesson", title: "Lesson 12", isCompleted: false, isCurrent: false, icon: <Star />, level: 2 },
  { id: 16, type: "lesson", title: "Lesson 13", isCompleted: false, isCurrent: false, icon: <Star />, level: 2 },
  { id: 17, type: "lesson", title: "Lesson 14", isCompleted: false, isCurrent: false, icon: <Star />, level: 2 },
  { id: 18, type: "trophy", title: "Level 2 Complete", isCompleted: false, isCurrent: false, icon: <Trophy />, level: 2 },
  
  // Level 3
  { id: 19, type: "lesson", title: "Lesson 15", isCompleted: false, isCurrent: false, icon: <Star />, level: 3 },
  { id: 20, type: "lesson", title: "Lesson 16", isCompleted: false, isCurrent: false, icon: <Star />, level: 3 },
  { id: 21, type: "crown", title: "Crown Challenge", isCompleted: false, isCurrent: false, icon: <Crown />, level: 3 },
];

const mascots = [
  {
    mood: "happy",
    position: 2,
    message: "You're doing great!",
  },
  {
    mood: "excited",
    position: 5,
    message: "Keep up the good work!",
  },
  {
    mood: "celebrating",
    position: 9,
    message: "You're a star!",
  },
];

export default function DuolingoHomePage() {
  return (
    <div className="bg-background text-foreground">
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ZigzagPath lessons={lessons} mascots={mascots} />
          </div>
          <div className="space-y-8">
            <UserStats />
            <DailyQuests />
            <ProfileSection />
          </div>
        </div>
      </main>
    </div>
  );
}