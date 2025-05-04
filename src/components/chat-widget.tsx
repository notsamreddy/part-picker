"use client";

import React, { useState } from "react";
import { X, Mic, PhoneOff, Phone } from "lucide-react";

export function ChatWidget() {
  const [open, setOpen] = useState(false);

  if (!open) {
    // Minimized state: just a circle with a phone icon
    return (
      <button
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl bg-[color:var(--primary)] text-[color:var(--primary-foreground)] flex items-center justify-center transition hover:bg-[color:var(--primary)]/80"
        style={{ fontFamily: "var(--font-sans)" }}
        onClick={() => setOpen(true)}
        aria-label="Open chat"
      >
        <Phone size={32} />
      </button>
    );
  }

  // Expanded state: full chat widget
  return (
    <div
      className="fixed bottom-6 right-6 z-50 w-80 max-w-full rounded-2xl shadow-2xl border border-[color:var(--border)] bg-[color:var(--sidebar)] text-[color:var(--sidebar-foreground)] flex flex-col"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[color:var(--sidebar-border)] bg-[color:var(--sidebar-primary)] rounded-t-2xl">
        <div className="w-8 h-8 rounded-full bg-[color:var(--primary)] flex items-center justify-center">
          {/* Placeholder for logo */}
          <span className="text-white font-bold text-lg">✓</span>
        </div>
        <span className="font-medium flex-1 text-[color:var(--sidebar-primary-foreground)]">
          Customer Service Agent
        </span>
        <button
          className="text-[color:var(--sidebar-primary-foreground)] hover:text-[color:var(--accent)]"
          onClick={() => setOpen(false)}
          aria-label="Close chat"
        >
          <X size={20} />
        </button>
      </div>
      {/* Main */}
      <div className="flex-1 flex flex-col items-center justify-center py-10 bg-[color:var(--sidebar)]">
        <div className="relative flex flex-col items-center">
          <div className="w-24 h-24 rounded-full border-2 border-[color:var(--primary)] flex items-center justify-center">
            {/* Audio visualization placeholder */}
            <svg width="40" height="40" viewBox="0 0 40 40">
              <recthO height="10" rx="1.5" fill="var(--primary)" />
              <rect
                x="16"
                y="15"
                width="3"
                height="15"
                rx="1.5"
                fill="var(--primary)"
              />
              <rect
                x="22"
                y="10"
                width="3"
                height="20"
                rx="1.5"
                fill="var(--primary)"
              />
              <rect
                x="28"
                y="18"
                width="3"
                height="12"
                rx="1.5"
                fill="var(--primary)"
              />
            </svg>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="flex items-center justify-center gap-6 py-4 bg-[color:var(--sidebar)] rounded-b-2xl">
        <button className="w-12 h-12 rounded-full flex items-center justify-center bg-[color:var(--primary)] text-[color:var(--primary-foreground)] hover:bg-[color:var(--primary)]/80 transition">
          <Mic size={24} />
        </button>
        <button className="w-12 h-12 rounded-full flex items-center justify-center bg-red-600 text-white hover:bg-red-700 transition">
          <PhoneOff size={24} />
        </button>
      </div>
    </div>
  );
}
