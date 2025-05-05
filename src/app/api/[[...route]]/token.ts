import { generateRandomAlphanumeric } from "@/lib/utils";
import { AccessToken } from "livekit-server-sdk";
import type { AccessTokenOptions, VideoGrant } from "livekit-server-sdk";
import { TokenResult } from "@/features/agent/types";
import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const apiKey = process.env.LIVEKIT_API_KEY;
const apiSecret = process.env.LIVEKIT_API_SECRET;

const createToken = (userInfo: AccessTokenOptions, grant: VideoGrant) => {
  const at = new AccessToken(apiKey, apiSecret, userInfo);
  at.addGrant(grant);
  return at.toJwt();
};

const app = new Hono().get(
  "/",
  zValidator(
    "query",
    z.object({
      roomName: z.string().optional(),
      participantName: z.string().optional(),
    })
  ),
  async (ctx) => {
    try {
      if (!apiKey || !apiSecret) {
        return ctx.json(
          { error: "Environment variables aren't set up correctly" },
          500
        );
      }

      const { roomName: roomParam, participantName: identityParam } =
        ctx.req.valid("query");

      // Get room name from query params or generate random one
      const roomName =
        roomParam ||
        `room-${generateRandomAlphanumeric(4)}-${generateRandomAlphanumeric(
          4
        )}`;

      // Get participant name from query params or generate random one
      const identity =
        identityParam || `identity-${generateRandomAlphanumeric(4)}`;

      const grant: VideoGrant = {
        room: roomName,
        roomJoin: true,
        canPublish: true,
        canPublishData: true,
        canSubscribe: true,
      };

      const token = await createToken({ identity }, grant);
      const result: TokenResult = {
        identity,
        accessToken: token,
      };

      return ctx.json(result);
    } catch (e) {
      console.error("Token generation error:", e);
      return ctx.json({ error: (e as Error).message }, 500);
    }
  }
);

export default app;
