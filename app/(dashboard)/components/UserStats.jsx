import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { GemStone } from "@/components/icons/Gem";
import { Flame } from "@/components/icons/Flame";
import { Heart } from "@/components/icons/Heart";
import { TreasureChest } from "@/components/icons/TreasureChest";

export function UserStats() {
  return (
    <div className="flex items-center space-x-4 bg-card p-4 rounded-lg shadow-sm justify-center">
      {/* Streak Hover */}
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 text-lg font-semibold"
          >
            <Flame className="text-orange-500" />
            <span>0</span>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80 space-y-4" align="center">
          <div className="space-y-2">
            <h4 className="font-medium leading-none text-lg">0 day streak</h4>
            <p className="text-sm text-muted-foreground">
              Do a lesson today to start a new streak!
            </p>
          </div>
          <div className="flex justify-between">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
              <div
                key={i}
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  i === 3
                    ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white"
                    : "bg-muted"
                }`}
              >
                {day}
              </div>
            ))}
          </div>
          <div className="p-3 bg-muted rounded-lg border border-muted-foreground/50 text-sm">
            <h5 className="font-medium">Streak Society</h5>
            <p>
              Reach a 7 day streak to join the Streak Society and earn exclusive
              rewards.
            </p>
            <Button variant="link" className="p-0 text-blue-500">
              VIEW MORE
            </Button>
          </div>
        </HoverCardContent>
      </HoverCard>

      {/* Gems Hover */}
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 text-lg font-semibold"
          >
            <GemStone />
            <span>500</span>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80 space-y-4" align="center">
          <div className="flex space-x-4 items-center">
            <TreasureChest size="xxl"/>
            <div className="space-y-1">
              <h4 className="font-medium">Gems</h4>
              <p className="text-sm text-muted-foreground">
                You have 500 gems
              </p>
              <Button variant="link" className="p-0 text-blue-500">
                Go To Shop
              </Button>
            </div>
          </div>
          <div className="p-3 bg-muted rounded-lg border border-muted-foreground/50 text-sm">
            <h5 className="font-medium">Daily Reward</h5>
            <p>Complete a lesson today to earn extra gems!</p>
          </div>
        </HoverCardContent>
      </HoverCard>

      {/* Hearts Hover */}
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 text-lg font-semibold"
          >
            <Heart className="text-destructive" />
            <span>5</span>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80 space-y-4" align="end">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Hearts</h4>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Heart key={i} className="text-destructive fill-destructive" />
              ))}
            </div>
            <p className="text-sm font-semibold">You have full hearts</p>
            <p className="text-sm text-muted-foreground">Keep on learning</p>
          </div>

          <div className="grid gap-2">
            <Button variant="outline" className="text-purple-500">
              UNLIMITED HEARTS
            </Button>
            <Button>
              REFILL HEARTS (350 gems)
            </Button>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
