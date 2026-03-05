import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";
import type { SanityImage } from "@/types";

const builder = client ? imageUrlBuilder(client) : null;

export function urlFor(source: SanityImage) {
  if (!builder) {
    throw new Error("Sanity client is not configured");
  }
  return builder.image(source);
}
