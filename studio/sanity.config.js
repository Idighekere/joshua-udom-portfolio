import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "default",
  title: "Joshua Udom Portfolio",
  basePath: "/studio",

  projectId: "rklan5yk",
  dataset: "production",
  apiVersion: "2024-01-01",

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
