"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LessonLoadingView from "./LessonLoadingView";

const lessonSequence = ["/lesson"];

export default function LessonLoading() {
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const [error] = useState(null);

  useEffect(() => {
    const lessonId = sessionStorage.getItem("selectedLessonId")?.trim();

    if (!lessonId) {
      console.error("No lesson ID found");
      router.push("/");
      return;
    }

    sessionStorage.setItem("currentLessonIndex", "0");
    sessionStorage.setItem("selectedLessonId", lessonId);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            router.push(lessonSequence[0]);
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <LessonLoadingView progress={progress} error={error} />
  );
}
