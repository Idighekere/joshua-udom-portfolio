import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import OptimizedAssetSource from "./components/OptimizedAssetSource";

const optimizedImageSource = {
  name: "optimized-image-upload",
  title: "Optimized upload",
  component: OptimizedAssetSource,
};

const optimizedFileSource = {
  name: "optimized-file-upload",
  title: "Optimized upload",
  component: OptimizedAssetSource,
};

export default defineConfig({
  name: "default",
  title: "Joshua Udom Portfolio",
  basePath: "/studio",

  projectId: "rklan5yk",
  dataset: "production",
  apiVersion: "2024-01-01",

  plugins: [structureTool(), visionTool()],

  formBuilder: {
    image: { assetSources: [optimizedImageSource] },
    file: { assetSources: [optimizedFileSource] },
  },

  schema: {
    types: schemaTypes,
  },
});
