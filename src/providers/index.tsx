import { Toaster } from "@/components/ui/sonner";
import { ConvexClientProvider } from "./convex-client-provider";
import { Provider as JotaiProvider } from "jotai";
import { LiveKitProvider } from "./livekit-provider";
import { CloudProvider } from "./cloud-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CloudProvider>
      <ConvexClientProvider>
        <JotaiProvider>
          <Toaster richColors />
          <LiveKitProvider>{children}</LiveKitProvider>
        </JotaiProvider>
      </ConvexClientProvider>
    </CloudProvider>
  );
}
