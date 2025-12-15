"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Volume2, X, Check, X as XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { GemStone } from "@/components/icons/Gem";

// Dummy data
const DUMMY_STATEMENT = "The Earth is the third planet from the Sun.";
const DUMMY_CORRECT_ANSWER = true; // true = statement is True

export default function TrueFalseLesson() {
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
    if (selectedOption !== null) {
      const correct = selectedOption === DUMMY_CORRECT_ANSWER;
      setIsCorrect(correct);
      setShowResult(true);
    }
  };

  const handleContinue = () => {
    if (isCorrect) {
      // Navigate to completed lesson page
      router.push("/lesson/completed");
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
              <div className="h-full bg-accent w-4/5" />
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
                True or False?
              </h2>
              
              {/* Audio Statement */}
              <div className="flex items-center gap-4 bg-card p-6 rounded-2xl border border-border mb-6">
                <button className="flex-shrink-0 w-12 h-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground hover:opacity-90">
                  <Volume2 className="w-6 h-6" />
                </button>
                <p className="text-xl font-semibold text-foreground">
                  Listen to the statement
                </p>
              </div>

              {/* Statement */}
              <div className="bg-card border border-border rounded-2xl p-8 mb-6">
                <h3 className="text-2xl font-bold text-foreground text-center">
                  {DUMMY_STATEMENT}
                </h3>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* True Option */}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  onClick={() => handleOptionClick(true)}
                  className={`p-6 rounded-2xl border-2 text-center font-bold transition-all ${
                    showResult
                      ? DUMMY_CORRECT_ANSWER === true
                        ? "border-green-500 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400"
                        : selectedOption === true
                        ? "border-red-500 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400"
                        : "border-border bg-card text-muted-foreground"
                      : selectedOption === true
                      ? "border-accent bg-accent/10 text-foreground"
                      : "border-border bg-card text-foreground hover:border-accent"
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${
                        selectedOption === true
                          ? "bg-accent text-white"
                          : "bg-muted text-muted-foreground"
                      } ${
                        showResult && DUMMY_CORRECT_ANSWER === true && "bg-green-500 text-white"
                      }`}
                    >
                      ✓
                    </div>
                    <span className="text-xl">True</span>
                  </div>
                </motion.button>

                {/* False Option */}
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  onClick={() => handleOptionClick(false)}
                  className={`p-6 rounded-2xl border-2 text-center font-bold transition-all ${
                    showResult
                      ? DUMMY_CORRECT_ANSWER === false
                        ? "border-green-500 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400"
                        : selectedOption === false
                        ? "border-red-500 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400"
                        : "border-border bg-card text-muted-foreground"
                      : selectedOption === false
                      ? "border-accent bg-accent/10 text-foreground"
                      : "border-border bg-card text-foreground hover:border-accent"
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${
                        selectedOption === false
                          ? "bg-accent text-white"
                          : "bg-muted text-muted-foreground"
                      } ${
                        showResult && DUMMY_CORRECT_ANSWER === false && "bg-red-500 text-white"
                      }`}
                    >
                      ✗
                    </div>
                    <span className="text-xl">False</span>
                  </div>
                </motion.button>
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
              disabled={selectedOption === null}
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
                    <Check className="w-6 h-6 text-white" />
                  ) : (
                    <XIcon className="w-6 h-6 text-white" />
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
                      The statement is {DUMMY_CORRECT_ANSWER ? "true" : "false"}
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
                {isCorrect ? "CONTINUE" : "TRY AGAIN"}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}