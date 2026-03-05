import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "@/sanity/env";

const isMissingConfig = !projectId || projectId === "your_project_id_here";

export const client = isMissingConfig
  ? null
  : createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    });
