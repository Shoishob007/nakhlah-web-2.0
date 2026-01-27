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
import { StreakCalendar } from "@/components/nakhlah/StreakCalendar";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function UserStats() {
  const router = useRouter();
  const [mobileOpenCard, setMobileOpenCard] = useState(null);

  const handleMobileClick = (stat) => {
    setMobileOpenCard(mobileOpenCard === stat ? null : stat);
  };

  const handleCloseAll = () => {
    setMobileOpenCard(null);
  };

  const getMobilePopupPosition = (stat) => {
    switch (stat) {
      case "streak":
        return "left-0 -translate-x-0"; // Streak: align to left
      case "gems":
        return "left-1/2 -translate-x-1/2"; // Gems: center
      case "hearts":
        return "right-0 translate-x-0"; // Hearts: align to right
      default:
        return "left-1/2 -translate-x-1/2";
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpenCard && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={handleCloseAll}
        />
      )}

      <div className="flex items-center bg-accent lg:bg-card p-4 rounded-none lg:rounded-lg shadow-sm justify-around lg:shadow-sm">
        {/* Streak */}
        <div className="relative">
          <div
            onClick={() => handleMobileClick("streak")}
            className="lg:hidden flex items-center space-x-2 text-lg font-semibold cursor-pointer"
          >
            <Flame className="text-orange-500" />
            <span className="text-white">0</span>
          </div>

          <div className="hidden lg:block">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2 text-lg font-semibold"
                >
                  <Flame className="text-orange-500" />
                  <span className="text-foreground">0</span>
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 space-y-4" align="start">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none text-lg">
                    0 day streak
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Do a lesson today to start a new streak!
                  </p>
                </div>
                <StreakCalendar activities={{}} />
              </HoverCardContent>
            </HoverCard>
          </div>

          {/* Mobile Popup for Streak - positioned to the right */}
          {mobileOpenCard === "streak" && (
            <div
              className={`lg:hidden absolute top-full mt-2 w-80 bg-card border rounded-lg shadow-lg z-50 p-4 space-y-4 ${getMobilePopupPosition("streak")}`}
            >
              <div className="space-y-2">
                <h4 className="font-medium leading-none text-lg">
                  0 day streak
                </h4>
                <p className="text-sm text-muted-foreground">
                  Do a lesson today to start a new streak!
                </p>
              </div>
              <StreakCalendar activities={{}} />
            </div>
          )}
        </div>

        {/* Gems */}
        <div className="relative">
          <div
            onClick={() => handleMobileClick("gems")}
            className="lg:hidden flex items-center space-x-2 text-lg font-semibold cursor-pointer"
          >
            <GemStone />
            <span className="text-white">500</span>
          </div>

          <div className="hidden lg:block">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2 text-lg font-semibold"
                >
                  <GemStone />
                  <span className="text-foreground">500</span>
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 space-y-4" align="center">
                <div className="flex space-x-4 items-center">
                  <TreasureChest size="xxl" />
                  <div className="space-y-1">
                    <h4 className="font-medium">Gems</h4>
                    <p className="text-sm text-muted-foreground">
                      You have 500 gems
                    </p>
                    <Button
                      variant="link"
                      className="p-0 text-blue-500"
                      onClick={() => router.push("/store")}
                    >
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
          </div>

          {/* Mobile Popup for Gems - centered */}
          {mobileOpenCard === "gems" && (
            <div
              className={`lg:hidden absolute top-full mt-2 w-80 bg-card border rounded-lg shadow-lg z-50 p-4 space-y-4 ${getMobilePopupPosition("gems")}`}
            >
              <div className="flex space-x-4 items-center">
                <TreasureChest size="xxl" />
                <div className="space-y-1">
                  <h4 className="font-medium">Gems</h4>
                  <p className="text-sm text-muted-foreground">
                    You have 500 gems
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCloseAll();
                    }}
                    className="text-blue-500 hover:underline"
                  >
                    Go To Shop
                  </button>
                </div>
              </div>
              <div className="p-3 bg-muted rounded-lg border border-muted-foreground/50 text-sm">
                <h5 className="font-medium">Daily Reward</h5>
                <p>Complete a lesson today to earn extra gems!</p>
              </div>
            </div>
          )}
        </div>

        {/* Hearts */}
        <div className="relative">
          <div
            onClick={() => handleMobileClick("hearts")}
            className="lg:hidden flex items-center space-x-2 text-lg font-semibold cursor-pointer"
          >
            <Heart className="text-destructive" />
            <span className="text-white">5</span>
          </div>

          <div className="hidden lg:block">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2 text-lg font-semibold"
                >
                  <Heart className="text-destructive" />
                  <span className="text-foreground">5</span>
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 space-y-4" align="end">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Hearts</h4>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Heart
                        key={i}
                        className="text-destructive fill-destructive"
                      />
                    ))}
                  </div>
                  <p className="text-sm font-semibold">You have full hearts</p>
                  <p className="text-sm text-muted-foreground">
                    Keep on learning
                  </p>
                </div>

                <div className="grid gap-2">
                  <Button variant="outline" className="text-purple-500">
                    UNLIMITED HEARTS
                  </Button>
                  <Button>REFILL HEARTS (350 gems)</Button>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>

          {/* Mobile Popup for Hearts - positioned to the left */}
          {mobileOpenCard === "hearts" && (
            <div
              className={`lg:hidden absolute top-full mt-2 w-80 bg-card border rounded-lg shadow-lg z-50 p-4 space-y-4 ${getMobilePopupPosition("hearts")}`}
            >
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Hearts</h4>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Heart
                      key={i}
                      className="text-destructive fill-destructive"
                    />
                  ))}
                </div>
                <p className="text-sm font-semibold">You have full hearts</p>
                <p className="text-sm text-muted-foreground">
                  Keep on learning
                </p>
              </div>

              <div className="grid gap-2">
                <button className="w-full py-2 border rounded-md text-purple-500">
                  UNLIMITED HEARTS
                </button>
                <button className="w-full py-2 bg-primary text-primary-foreground rounded-md">
                  REFILL HEARTS (350 gems)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
