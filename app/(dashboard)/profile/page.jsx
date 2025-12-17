"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProfilePage from "./ProfilePage";
import SettingsPage from "./SettingsPage";

export default function ProfileAndSettings() {
  const [activeView, setActiveView] = useState("profile");

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background overflow-x-hidden p-4">
      <AnimatePresence mode="wait">
        {activeView === "profile" ? (
          <motion.div 
            key="profile" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
          >
            <ProfilePage onNavigateSettings={() => setActiveView("settings")} />
          </motion.div>
        ) : (
          <motion.div 
            key="settings" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
          >
            <SettingsPage onBack={() => setActiveView("profile")} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}