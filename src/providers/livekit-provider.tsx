"use client";

import {
  LiveKitRoom,
  RoomAudioRenderer,
  StartAudio,
} from "@livekit/components-react";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useCallback, useMemo, useEffect } from "react";
import { toast } from "sonner";

import { ConfigProvider, useConfig } from "@/features/agent/hooks/useConfig";
import {
  ConnectionMode,
  ConnectionProvider,
  useConnection,
} from "@/features/agent/hooks/useConnection";

const themeColors = [
  "cyan",
  "green",
  "amber",
  "purple",
  "violet",
  "rose",
  "pink",
  "teal",
];

const inter = Inter({ subsets: ["latin"] });

interface LiveKitProviderProps {
  children: React.ReactNode;
}

export function LiveKitProvider({ children }: LiveKitProviderProps) {
  return (
    <ConfigProvider>
      <ConnectionProvider>
        <LiveKitProviderInner>{children}</LiveKitProviderInner>
      </ConnectionProvider>
    </ConfigProvider>
  );
}

function LiveKitProviderInner({ children }: LiveKitProviderProps) {
  const { shouldConnect, wsUrl, token, mode, connect, disconnect } =
    useConnection();

  const { config } = useConfig();

  // Automatically connect when the component mounts
  useEffect(() => {
    const initializeConnection = async () => {
      try {
        const connectionMode = process.env.NEXT_PUBLIC_LIVEKIT_URL
          ? "env"
          : mode;
        await connect(connectionMode);
      } catch (error) {
        console.error("Failed to connect to LiveKit room:", error);
        toast.error("Failed to connect to LiveKit room");
      }
    };

    if (!shouldConnect) {
      initializeConnection();
    }
  }, [connect, mode, shouldConnect]);

  const showPG = useMemo(() => {
    if (process.env.NEXT_PUBLIC_LIVEKIT_URL) {
      return true;
    }
    if (wsUrl) {
      return true;
    }
    return false;
  }, [wsUrl]);

  return (
    <>
      <Head>
        <title>{config.title}</title>
        <meta name="description" content={config.description} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta
          property="og:image"
          content="https://livekit.io/images/og/agents-playground.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {showPG && wsUrl && token ? (
          <LiveKitRoom
            className="flex flex-col h-full w-full"
            serverUrl={wsUrl}
            token={token}
            connect={shouldConnect}
            onError={(e) => {
              toast.error(e.message);
              console.error(e);
            }}
          >
            {children}
            <RoomAudioRenderer />
            <StartAudio label="Click to enable audio playback" />
          </LiveKitRoom>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Connecting to LiveKit room...</p>
          </div>
        )}
      </main>
    </>
  );
}
