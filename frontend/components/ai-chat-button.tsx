"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { AIChatModal } from "./ai-chat-modal";

export function AIChatButton() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bg-green-600 bottom-6 right-6 rounded-full w-14 h-14 p-0 shadow-lg hover:shadow-xl hover:bg-green-700 transition-shadow z-40"
          size="icon"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      <AIChatModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
