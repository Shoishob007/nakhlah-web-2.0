"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Share2, MessageCircle, Mail, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ShareProfileDrawer({ open, onClose }) {
  const [copied, setCopied] = useState(false);

  const shareOptions = [
    { icon: MessageCircle, label: "WhatsApp", color: "bg-green-500", action: () => {} },
    { icon: Mail, label: "Email", color: "bg-blue-500", action: () => {} },
    { icon: Share2, label: "Twitter", color: "bg-sky-500", action: () => {} },
    { icon: Share2, label: "Facebook", color: "bg-blue-600", action: () => {} },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://app.com/profile/andrew.ainsley");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Mobile: Bottom drawer, Desktop: Right sidebar */}
          <motion.div
            initial={{ 
              y: "100%",
              x: "0%" 
            }}
            animate={{ 
              y: 0,
              x: 0 
            }}
            exit={{ 
              y: "100%",
              x: "0%" 
            }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 lg:left-auto lg:right-0 lg:top-0 lg:bottom-0 
                      lg:translate-x-full
                      bg-card rounded-t-3xl lg:rounded-t-none lg:rounded-l-3xl 
                      shadow-2xl z-50 max-h-[85vh] lg:max-h-none lg:h-screen
                      lg:w-[400px] overflow-hidden"
          >
            {/* Mobile Handle */}
            <div className="lg:hidden flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-muted rounded-full" />
            </div>

            <div className="p-6 pb-8 lg:p-8 lg:pb-10 lg:h-full lg:overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 lg:mb-8">
                <h2 className="text-2xl font-bold text-foreground">Share Profile</h2>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Share Options */}
              <div className="mb-6 lg:mb-8">
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 lg:mb-4">Share via</h3>
                <div className="grid grid-cols-4 lg:grid-cols-2 gap-4 lg:gap-6">
                  {shareOptions.map((option, index) => {
                    const IconComponent = option.icon;
                    return (
                      <button
                        key={index}
                        onClick={option.action}
                        className="flex flex-col items-center gap-2 group"
                      >
                        <div className={`w-14 h-14 lg:w-16 lg:h-16 rounded-2xl ${option.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <IconComponent className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                        </div>
                        <span className="text-xs lg:text-sm font-medium">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Copy Link */}
              <div className="space-y-3 lg:space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground">Profile Link</h3>
                <div className="flex flex-col lg:flex-row gap-2 lg:gap-3">
                  <div className="flex-1 px-4 py-3 bg-muted/30 rounded-xl border border-border text-sm text-muted-foreground truncate">
                    https://app.com/profile/andrew.ainsley
                  </div>
                  <Button
                    onClick={handleCopyLink}
                    className={`px-4 lg:px-6 whitespace-nowrap ${
                      copied
                        ? "bg-palm-green hover:bg-palm-green/90"
                        : "bg-gradient-accent hover:bg-gradient-accent/90"
                    } text-white transition-all`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}