"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";

export function LessonResultHandler({
  isCorrect,
  correctAnswer,
  onCheck,
  onContinue,
  onSkip,
  disabled,
}) {
  return (
    <div className="border-t-2 border-border bg-background h-[120px] flex flex-col overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        {isCorrect === null ? (
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="h-[120px] w-full flex flex-col sm:flex-row items-center justify-between px-4 gap-4 container max-w-4xl mx-auto"
          >
            <button
              onClick={onSkip}
              className="text-muted-foreground hover:text-foreground font-bold text-lg underline underline-offset-4 order-2 sm:order-1"
            >
              Skip
            </button>
            <Button
              onClick={onCheck}
              disabled={disabled}
              className="w-full sm:w-auto sm:min-w-[200px] h-14 bg-accent hover:opacity-90 text-accent-foreground font-bold text-lg rounded-xl order-1 sm:order-2"
            >
              Check Answer
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`w-full h-[120px] flex items-center px-4 ${
              isCorrect
                ? "bg-green-100 dark:bg-green-900/40"
                : "bg-red-100 dark:bg-red-900/40"
            }`}
          >
            <div className="container max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                {isCorrect ? (
                  <CheckCircle2 className="w-10 h-10 shrink-0 text-green-600 shadow-sm" />
                ) : (
                  <XCircle className="w-10 h-10 shrink-0 text-red-600 shadow-sm" />
                )}
                <div className="min-w-0">
                  <h3
                    className={`text-xl font-black ${isCorrect ? "text-green-800 dark:text-green-400" : "text-red-800 dark:text-red-400"}`}
                  >
                    {isCorrect ? "Correct!" : "Correct answer:"}
                  </h3>
                  {!isCorrect && correctAnswer && (
                    <p className="text-red-700 dark:text-red-300 font-bold text-base truncate">
                      {correctAnswer}
                    </p>
                  )}
                </div>
              </div>
              <Button
                onClick={onContinue}
                className={`w-full sm:w-auto sm:min-w-[200px] h-14 font-bold text-lg rounded-xl shadow-lg transform active:scale-95 transition-transform shrink-0 ${
                  isCorrect
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-red-600 hover:bg-red-700 text-white"
                }`}
              >
                Continue
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
