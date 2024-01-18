// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $api_projects_project_id_ from "./routes/api/projects/[project_id].ts";
import * as $api_projects_project_id_deployments_deployment_id_logs from "./routes/api/projects/[project_id]/deployments/[deployment_id]/logs.ts";
import * as $api_projects_project_id_deployments_index from "./routes/api/projects/[project_id]/deployments/index.ts";
import * as $api_projects_project_id_index from "./routes/api/projects/[project_id]/index.ts";
import * as $api_projects_project_id_workspace from "./routes/api/projects/[project_id]/workspace.ts";
import * as $api_projects_index from "./routes/api/projects/index.ts";
import * as $github from "./routes/github.ts";
import * as $icon from "./routes/icon.tsx";
import * as $index from "./routes/index.tsx";
import * as $new from "./routes/new.ts";
import * as $projects_project_id_ from "./routes/projects/[project_id].tsx";
import * as $recent from "./routes/recent.ts";
import * as $deno_blocks_ide_island from "./islands/deno_blocks_ide_island.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/api/projects/[project_id].ts": $api_projects_project_id_,
    "./routes/api/projects/[project_id]/deployments/[deployment_id]/logs.ts":
      $api_projects_project_id_deployments_deployment_id_logs,
    "./routes/api/projects/[project_id]/deployments/index.ts":
      $api_projects_project_id_deployments_index,
    "./routes/api/projects/[project_id]/index.ts":
      $api_projects_project_id_index,
    "./routes/api/projects/[project_id]/workspace.ts":
      $api_projects_project_id_workspace,
    "./routes/api/projects/index.ts": $api_projects_index,
    "./routes/github.ts": $github,
    "./routes/icon.tsx": $icon,
    "./routes/index.tsx": $index,
    "./routes/new.ts": $new,
    "./routes/projects/[project_id].tsx": $projects_project_id_,
    "./routes/recent.ts": $recent,
  },
  islands: {
    "./islands/deno_blocks_ide_island.tsx": $deno_blocks_ide_island,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
