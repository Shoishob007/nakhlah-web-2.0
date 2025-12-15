"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Volume2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { GemStone } from "@/components/icons/Gem";

const options = [
  { id: 1, text: "The key is eating a burger", correct: true },
  { id: 2, text: "Kunci itu sedang makan burger", correct: false },
  { id: 3, text: "Burger is the key", correct: false },
  { id: 4, text: "Eating burger makes happy", correct: false },
];

export default function MCQLesson() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const router = useRouter();

  const handleOptionClick = (option) => {
    if (!showResult) {
      setSelectedOption(option);
    }
  };

  const handleCheckAnswer = () => {
    setIsCorrect(selectedOption?.correct || false);
    setShowResult(true);
  };

  const handleContinue = () => {
    if (isCorrect) {
      router.push("/lesson/pair-match");
    } else {
      setShowResult(false);
      setSelectedOption(null);
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
              <div className="h-full bg-accent w-2/5" />
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
        <div className="w-full max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Question */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center sm:text-start">
                What does this sentence mean?
              </h2>
              <div className="flex items-center gap-4 bg-card p-6 rounded-2xl border border-border">
                <button className="flex-shrink-0 w-12 h-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground hover:opacity-90">
                  <Volume2 className="w-6 h-6" />
                </button>
                <p className="text-xl font-semibold text-foreground">
                  Kunci itu sedang makan burger
                </p>
              </div>
            </div>

            {/* Options */}
            <div className="grid gap-3">
              {options.map((option, index) => (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleOptionClick(option)}
                  className={`p-4 rounded-xl border-2 text-left font-semibold transition-all ${
                    showResult
                      ? option.correct
                        ? "border-green-500 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400"
                        : selectedOption?.id === option.id
                        ? "border-red-500 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400"
                        : "border-border bg-card text-muted-foreground"
                      : selectedOption?.id === option.id
                      ? "border-accent bg-accent/10 text-foreground"
                      : "border-border bg-card text-foreground hover:border-accent"
                  }`}
                >
                  {option.text}
                </motion.button>
              ))}
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
              disabled={!selectedOption}
              className="w-full md:w-auto md:min-w-[200px] md:ml-auto md:flex h-14 bg-accent hover:opacity-90 text-accent-foreground font-bold text-lg rounded-xl disabled:opacity-50"
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
                      Correct answer: The key is eating a burger
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
