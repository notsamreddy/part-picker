import { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";

type ChatMessageInput = {
  placeholder: string;
  accentColor: string;
  height: number;
  onSend?: (message: string) => void;
};

export const ChatMessageInput = ({
  placeholder,
  accentColor,
  height,
  onSend,
}: ChatMessageInput) => {
  const [message, setMessage] = useState("");
  const [_isTyping, setIsTyping] = useState(false);
  const [_inputHasFocus, setInputHasFocus] = useState(false);

  const handleSend = useCallback(() => {
    if (!onSend) {
      return;
    }
    if (message === "") {
      return;
    }

    onSend(message);
    setMessage("");
  }, [onSend, message]);

  useEffect(() => {
    setIsTyping(true);
    const timeout = setTimeout(() => {
      setIsTyping(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [message]);

  return (
    <div
      className="flex flex-col gap-2 border-t border-t-gray-800"
      style={{ height: height }}
    >
      <div className="flex flex-row pt-3 gap-2 items-center relative">
        <Input
          placeholder={placeholder}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onFocus={() => {
            setInputHasFocus(true);
          }}
          onBlur={() => {
            setInputHasFocus(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />
        <Button
          variant="ghost"
          size="icon"
          disabled={message.length === 0 || !onSend}
          onClick={handleSend}
          className={`text-${accentColor}-500 hover:bg-${accentColor}-950 opacity-${
            message.length > 0 ? 100 : 25
          }`}
        >
          <SendIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
