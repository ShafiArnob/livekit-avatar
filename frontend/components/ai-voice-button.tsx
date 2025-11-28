"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { MessageCircle } from "lucide-react";
import LiveKitWidget from "./ai_avatar/LiveKitWidget";
const AIVoiceButton = () => {
  const [showSupport, setShowSupport] = useState(false);
  return (
    <div>
      {/* Floating AI Concierge Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          // variant=""
          size="lg"
          className="rounded-full shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105 flex items-center gap-2 px-6 py-3"
          onClick={() => setShowSupport(true)}
        >
          <MessageCircle className="h-5 w-5" />
          <span className="font-medium">Talk to AI Concierge</span>
        </Button>
      </div>
      {/* LiveKit Widget */}
      {showSupport && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-6 pointer-events-none">
          <div className="pointer-events-auto">
            <LiveKitWidget setShowSupport={setShowSupport} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AIVoiceButton;
