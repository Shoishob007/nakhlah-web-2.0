import { motion } from "framer-motion";
import { Medal } from "@/components/icons/Medal";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

const getIconUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (!API_URL) return url;
  return `${API_URL}${url}`;
};

export default function MissionCard({ mission }) {
  const safeTarget = Number(mission.target) > 0 ? Number(mission.target) : 1;
  const progress = Math.min((Number(mission.current) / safeTarget) * 100, 100);

  const Icon = mission.icon;
  const iconUrl = getIconUrl(
    mission.iconUrl || mission.icon?.url || mission.icon,
  );
  const reward = Number(mission.reward) || 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      className="bg-card border border-border rounded-2xl p-5 shadow-md hover:shadow-lg transition-all"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-transparent flex items-center justify-center">
          {iconUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={iconUrl}
              alt={mission.label}
              className="w-10 h-10 object-cover rounded-lg"
            />
          ) : Icon ? (
            <Icon size="md" className="text-white" />
          ) : (
            <Medal size="md" className="text-white" />
          )}
        </div>

        <div className="flex-1">
          <div className="flex justify-between mb-2">
            <p className="font-bold text-foreground">{mission.label}</p>
            <span className="text-sm font-semibold text-accent">
              {mission.current}/{mission.target}
            </span>
          </div>

          <p className="text-xs text-muted-foreground mb-2">
            Reward: {reward.toLocaleString()}
          </p>

          <div className="h-2.5 bg-muted rounded-full overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full bg-accent rounded-full shadow-sm"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
