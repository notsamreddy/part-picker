"use client";

import { useCloud } from "@/features/agent/cloud/useCloud";
import React, { createContext, useState } from "react";
import { useCallback } from "react";
import { useConfig } from "./useConfig";
import { toast } from "sonner";
import { client } from "@/lib/hono";

export type ConnectionMode = "cloud" | "manual" | "env";

type TokenGeneratorData = {
  shouldConnect: boolean;
  wsUrl: string;
  token: string;
  mode: ConnectionMode;
  disconnect: () => Promise<void>;
  connect: (mode: ConnectionMode) => Promise<void>;
};

const ConnectionContext = createContext<TokenGeneratorData | undefined>(
  undefined
);

export const ConnectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { generateToken, wsUrl: cloudWSUrl } = useCloud();
  const { config } = useConfig();
  const [connectionDetails, setConnectionDetails] = useState<{
    wsUrl: string;
    token: string;
    mode: ConnectionMode;
    shouldConnect: boolean;
  }>({ wsUrl: "", token: "", shouldConnect: false, mode: "manual" });

  const connect = useCallback(
    async (mode: ConnectionMode) => {
      let token = "";
      let url = "";
      if (mode === "cloud") {
        try {
          token = await generateToken();
        } catch (error) {
          toast.error(
            "Failed to generate token, you may need to increase your role in this LiveKit Cloud project."
          );
        }
        url = cloudWSUrl;
      } else if (mode === "env") {
        if (!process.env.NEXT_PUBLIC_LIVEKIT_URL) {
          throw new Error("NEXT_PUBLIC_LIVEKIT_URL is not set");
        }
        url = process.env.NEXT_PUBLIC_LIVEKIT_URL;
        try {
          const response = await client.api.token.$get({
            query: {
              roomName: config.settings.room_name || undefined,
              participantName: config.settings.participant_name || undefined,
            },
          });

          if (!response.ok) {
            const errorData = (await response.json()) as { error: string };
            throw new Error(errorData.error || "Failed to generate token");
          }

          const data = await response.json();
          if (!data.accessToken) {
            throw new Error("Invalid token response");
          }
          token = data.accessToken;
        } catch (error) {
          toast.error(
            error instanceof Error ? error.message : "Failed to generate token"
          );
          throw error;
        }
      } else {
        token = config.settings.token;
        url = config.settings.ws_url;
      }
      setConnectionDetails({ wsUrl: url, token, shouldConnect: true, mode });
    },
    [
      cloudWSUrl,
      config.settings.token,
      config.settings.ws_url,
      config.settings.room_name,
      config.settings.participant_name,
      generateToken,
    ]
  );

  const disconnect = useCallback(async () => {
    setConnectionDetails((prev) => ({ ...prev, shouldConnect: false }));
  }, []);

  return (
    <ConnectionContext.Provider
      value={{
        wsUrl: connectionDetails.wsUrl,
        token: connectionDetails.token,
        shouldConnect: connectionDetails.shouldConnect,
        mode: connectionDetails.mode,
        connect,
        disconnect,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnection = () => {
  const context = React.useContext(ConnectionContext);
  if (context === undefined) {
    throw new Error("useConnection must be used within a ConnectionProvider");
  }
  return context;
};
