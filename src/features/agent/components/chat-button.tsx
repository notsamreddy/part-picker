"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import { ChatPanel } from "./chat-panel";
import { useOpenChatPanel } from "@/features/agent/store/use-open-chat-panel";

interface ChatButtonProps {
  onClick?: () => void;
}

export function ChatButton({ onClick }: ChatButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useOpenChatPanel();

  const handleButtonClick = () => {
    setOpen(!open);
    if (onClick) onClick();
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          onClick={handleButtonClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label="Open chat"
        >
          <MessageCircle
            className={`h-6 w-6 transition-opacity duration-300 ${
              isHovered || open ? "opacity-0" : "opacity-100"
            }`}
          />
          <X
            className={`h-6 w-6 absolute transition-opacity duration-300 ${
              isHovered || open ? "opacity-100" : "opacity-0"
            }`}
          />
          <span className="sr-only">Chat with us</span>
        </Button>
      </div>

      <ChatPanel isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
