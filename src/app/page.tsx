"use client";
import { useState } from "react";
import { Toaster } from "sonner";
import { Header } from "@/components/header";
import { PartDetail } from "@/components/part-detail";
import { Content } from "@/components/content";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header
        onBack={() => setSelectedPartId(null)}
        showBack={!!selectedPartId}
      />
      <main className="flex-1 p-4 md:p-8">
        <div
          className={cn(
            "max-w-6xl mx-auto",
            "transition-all duration-300",
            selectedPartId ? "max-w-4xl" : "max-w-6xl"
          )}
        >
          {selectedPartId ? (
            <PartDetail partId={selectedPartId} />
          ) : (
            <Content onSelectPart={setSelectedPartId} />
          )}
        </div>
      </main>
      <Toaster />
    </div>
  );
}
