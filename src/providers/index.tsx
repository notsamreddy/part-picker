import { Toaster } from "@/components/ui/sonner";
import { ConvexClientProvider } from "./convex-client-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConvexClientProvider>
      <Toaster richColors />
      {children}
    </ConvexClientProvider>
  );
}
