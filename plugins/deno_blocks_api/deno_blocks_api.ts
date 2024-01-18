import type { Plugin } from "$fresh/server.ts";
import { getSessionId } from "deno_kv_oauth/mod.ts";
import { createProject } from "#/lib/subhosting_api/mod.ts";
import { denoBlocksKv } from "#/lib/resources/deno_blocks_kv.ts";

const DEPLOY_ORG_ID = Deno.env.get("DEPLOY_ORG_ID")!;
const DEPLOY_ACCESS_TOKEN = Deno.env.get("DEPLOY_ACCESS_TOKEN")!;

export interface DenoBlocksAPIPluginOptions {
  basePath?: string;
}

/**
 * Requires kv-oauth plugin to be loaded before this plugin.
 */
export function denoBlocksAPIPlugin(
  options: DenoBlocksAPIPluginOptions = {},
): Plugin {
  const { basePath = "/api" } = options;
  return {
    name: "deno-blocks-api",
    routes: [
      {
        path: `${basePath}/projects`,
        async handler(request) {
          if (request.method === "POST") {
            const sessionID = await getSessionId(request);
            if (!sessionID) {
              return new Response("Unauthorized", { status: 401 });
            }

            // Create a new project for the user.
            const userID = await denoBlocksKv.getUserIDBySessionID({
              sessionID,
            });
            if (!userID) {
              return new Response("Unauthorized", { status: 401 });
            }

            const project = await createProject({
              organizationID: DEPLOY_ORG_ID,
              accessToken: DEPLOY_ACCESS_TOKEN,
            });
            await denoBlocksKv.addProject({ userID, project });
            return Response.json(project);
          }

          if (request.method === "GET") {
            const sessionID = await getSessionId(request);
            if (!sessionID) {
              return new Response("Unauthorized", { status: 401 });
            }

            // List project from Kv that are owned by the user.
            const userID = await denoBlocksKv.getUserIDBySessionID({
              sessionID,
            });
            if (!userID) {
              return new Response("Unauthorized", { status: 401 });
            }

            const projects = await denoBlocksKv.getProjectsByUserID({
              id: userID,
            });
            if (!projects) {
              return new Response("Unauthorized", { status: 401 });
            }

            return Response.json(projects);
          }

          return new Response("Not implemented", { status: 501 });
        },
      },
    ],
  };
}
