"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { GemStone } from "@/components/icons/Gem";

const leftWords = [
  { id: 1, text: "Anggem", matched: false },
  { id: 2, text: "Piring", matched: false },
  { id: 3, text: "Spoon", matched: false },
  { id: 4, text: "Buku", matched: false },
  { id: 5, text: "Meja", matched: false },
  { id: 6, text: "Door", matched: false },
];

const rightWords = [
  { id: 7, text: "Grapes", matched: false },
  { id: 8, text: "Plate", matched: false },
  { id: 9, text: "Sendok", matched: false },
  { id: 10, text: "Book", matched: false },
  { id: 11, text: "Table", matched: false },
  { id: 12, text: "Pintu", matched: false },
];

const correctPairs = {
  Anggem: "Grapes",
  Piring: "Plate",
  Spoon: "Sendok",
  Buku: "Book",
  Meja: "Table",
  Door: "Pintu",
};

export default function PairMatchLesson() {
  const [leftState, setLeftState] = useState(leftWords);
  const [rightState, setRightState] = useState(rightWords);
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const router = useRouter();

  const handleLeftClick = (item) => {
    if (item.matched) return;
    setSelectedLeft(item);
    if (selectedRight) {
      checkMatch(item, selectedRight);
    }
  };

  const handleRightClick = (item) => {
    if (item.matched) return;
    setSelectedRight(item);
    if (selectedLeft) {
      checkMatch(selectedLeft, item);
    }
  };

  const checkMatch = (left, right) => {
    if (correctPairs[left.text] === right.text) {
      setLeftState(
        leftState.map((p) => (p.id === left.id ? { ...p, matched: true } : p))
      );
      setRightState(
        rightState.map((p) => (p.id === right.id ? { ...p, matched: true } : p))
      );
    }
    setTimeout(() => {
      setSelectedLeft(null);
      setSelectedRight(null);
    }, 500);
  };

  const handleCheckAnswer = () => {
    const allMatched =
      leftState.every((p) => p.matched) && rightState.every((p) => p.matched);
    setIsCorrect(allMatched);
    setShowResult(true);
  };

  const handleContinue = () => {
    if (isCorrect) {
      router.push("/lesson/fill-in-the-blanks");
    } else {
      setShowResult(false);
      setLeftState(leftWords);
      setRightState(rightWords);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/")}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-accent w-3/5" />
            </div>
            <div className="flex items-center gap-2">
              <GemStone size="sm" />
              <span className="text-accent font-bold">100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Question */}
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center">
              Tap the matching word pair
            </h2>

            {/* Matching Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Left Column */}
              <div className="space-y-3">
                {leftState.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleLeftClick(item)}
                    disabled={item.matched}
                    className={`w-full p-4 rounded-xl border-2 font-semibold transition-all ${
                      item.matched
                        ? "border-green-500 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 opacity-50"
                        : selectedLeft?.id === item.id
                        ? "border-accent bg-accent/10 text-foreground"
                        : "border-border bg-card text-foreground hover:border-accent"
                    }`}
                  >
                    {item.text}
                  </motion.button>
                ))}
              </div>

              {/* Right Column */}
              <div className="space-y-3">
                {rightState.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleRightClick(item)}
                    disabled={item.matched}
                    className={`w-full p-4 rounded-xl border-2 font-semibold transition-all ${
                      item.matched
                        ? "border-green-500 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 opacity-50"
                        : selectedRight?.id === item.id
                        ? "border-accent bg-accent/10 text-foreground"
                        : "border-border bg-card text-foreground hover:border-accent"
                    }`}
                  >
                    {item.text}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Action */}
      {!showResult ? (
        <div className="border-t border-border bg-background">
          <div className="container max-w-4xl mx-auto px-4 py-6">
            <Button
              onClick={handleCheckAnswer}
              className="w-full md:w-auto md:min-w-[200px] md:ml-auto md:flex h-14 bg-accent hover:opacity-90 text-accent-foreground font-bold text-lg rounded-xl"
            >
              Check Answers
            </Button>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className={`border-t-4 ${
            isCorrect
              ? "border-green-500 bg-green-50 dark:bg-green-950"
              : "border-red-500 bg-red-50 dark:bg-red-950"
          }`}
        >
          <div className="container max-w-4xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isCorrect ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {isCorrect ? (
                    <span className="text-2xl text-white">✓</span>
                  ) : (
                    <span className="text-2xl text-white">✗</span>
                  )}
                </div>
                <div>
                  <h3
                    className={`text-xl font-bold ${
                      isCorrect
                        ? "text-green-700 dark:text-green-400"
                        : "text-red-700 dark:text-red-400"
                    }`}
                  >
                    {isCorrect ? "Correct!" : "Wrong!"}
                  </h3>
                  {!isCorrect && (
                    <p className="text-sm text-muted-foreground">
                      Match all pairs correctly
                    </p>
                  )}
                </div>
              </div>
              <Button
                onClick={handleContinue}
                className={`w-full md:w-auto md:min-w-[200px] h-14 font-bold text-lg rounded-xl ${
                  isCorrect
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-red-600 hover:bg-red-700 text-white"
                }`}
              >
                {isCorrect ? "CONTINUE" : "OK"}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
