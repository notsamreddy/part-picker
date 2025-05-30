import { Hono } from "hono";
import { handle } from "hono/vercel";

import token from "./token";

const app = new Hono().basePath("/api");

const routes = app.route("/token", token);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
