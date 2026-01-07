import { Circle } from "./Circle";
import { Mascot } from "@/components/nakhlah/Mascot";
import { useEffect, useState } from "react";
import { Medal, Trophy, Crown, Star, Lock } from "lucide-react";

export function ZigzagPath({ lessons, mascots }) {
  const [currentLevel, setCurrentLevel] = useState(1);

  // Group lessons by level
  const groupedLessons = lessons.reduce((acc, lesson) => {
    if (!acc[lesson.level]) acc[lesson.level] = [];
    acc[lesson.level].push(lesson);
    return acc;
  }, {});

  // Smooth S-curve positions
  const getPosition = (index) => {
    const amplitude = 25;
    const center = 50;
    const frequency = 0.8;
    const x = center + Math.sin(index * frequency) * amplitude;
    return { left: `${x}%`, transform: "translateX(-50%)" };
  };

  // Mascot opposite side
  const getMascotPosition = (index) => {
    const lessonPos = getPosition(index);
    const leftPercent = parseInt(lessonPos.left);
    return leftPercent > 50
      ? { left: "15%", transform: "translateX(-50%)" }
      : { left: "85%", transform: "translateX(-50%)" };
  };

  // Level colors
  const getLevelColor = (level) => {
    const colors = [
      "from-green-400 to-green-600",
      "from-blue-400 to-blue-600",
      "from-purple-400 to-purple-600",
      "from-orange-400 to-orange-600",
      "from-red-400 to-red-600",
    ];
    return colors[(level - 1) % colors.length];
  };

  // Smooth header update with IntersectionObserver
  useEffect(() => {
    const observers = [];
    const levelElements = document.querySelectorAll("[data-level-barrier]");

    levelElements.forEach((el) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const level = parseInt(el.getAttribute("data-level-barrier"));
            setCurrentLevel(level);
          }
        },
        { root: null, threshold: 0.6 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="relative max-w-md mx-auto">
      {/* Sticky level header */}
      <div className="sticky top-0 z-10 py-4 bg-background">
        <div
          className={`text-center bg-gradient-to-r ${getLevelColor(
            currentLevel
          )} text-white py-3 rounded-lg shadow-lg transition-all duration-700 ease-in-out`}
        >
          <h2 className="text-2xl font-bold">Level {currentLevel}</h2>
        </div>
      </div>

      {/* All lessons (page scroll) */}
      <div className="relative mt-6">
        {Object.entries(groupedLessons).map(([level, levelLessons], levelIndex) => (
          <div key={level} className="mb-12 relative">
            {/* Level barrier */}
            {levelIndex > 0 && (
              <div
                data-level-barrier={level}
                className="relative h-12 flex items-center justify-center mb-8"
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-dashed border-gray-400"></div>
                </div>
                <div className="relative bg-background px-4">
                  <span className="text-sm font-semibold text-gray-500">
                    Level {level}
                  </span>
                </div>
              </div>
            )}

            {/* Zigzag path */}
            <div className="relative">
              {levelLessons.map((lesson, index) => {
                const position = getPosition(index);
                const mascotPosition = getMascotPosition(index);

                return (
                  <div key={lesson.id} className="relative h-24 w-full">
                    {/* Lesson circle */}
                    <div
                      className="absolute"
                      style={{
                        left: position.left,
                        top: "50%",
                        transform: `${position.transform} translateY(-50%)`,
                      }}
                    >
                      <Circle
                        isCompleted={lesson.isCompleted}
                        isCurrent={lesson.isCurrent}
                        isLocked={!lesson.isCompleted && !lesson.isCurrent}
                        icon={lesson.icon}
                        type={lesson.type}
                      />
                    </div>

                    {/* Mascot */}
                    {mascots.map(
                      (mascot) =>
                        mascot.position === lesson.id && (
                          <div
                            key={mascot.mood}
                            className="absolute"
                            style={{
                              left: mascotPosition.left,
                              top: "50%",
                              transform: `${mascotPosition.transform} translateY(-50%)`,
                            }}
                          >
                            <Mascot
                              mood={mascot.mood}
                              message={mascot.message}
                              className="max-w-[250px]" // wider message
                            />
                          </div>
                        )
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Section unlocker */}
        <div className="mt-8 flex justify-center">
          <div className="bg-card border-2 border-dashed border-border rounded-xl p-6 w-full max-w-md text-center">
            <div className="flex justify-center mb-3">
              <Lock className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              Section 2
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Learn words, phrases, and grammar concepts for basic interactions
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
              JUMP HERE?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
