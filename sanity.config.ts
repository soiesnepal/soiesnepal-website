import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

import { schemaTypes } from "./src/sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "bhcqd45q";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  apiVersion: "2024-11-13",
  title: "SOIES Nepal",
  plugins: [deskTool()],
  schema: {
    types: schemaTypes,
  },
});
