import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Flame } from "../icons/Flame";

export function StreakCounter({ count, className }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 shadow-md",
        className
      )}
    >
        <Flame size="sm" className="text-yellow-200" />
      <span className="font-bold text-muted-foreground">{count}</span>
    </motion.div>
  );
}
