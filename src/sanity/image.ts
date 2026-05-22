import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET;

const builder =
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset })
    : null;

/** Returns a chainable Sanity image URL builder, or null when Sanity is unconfigured. */
export function urlForImage(source: SanityImageSource) {
  return builder ? builder.image(source) : null;
}

/** Parses intrinsic pixel dimensions from a Sanity image asset `_ref`. */
export function imageDimensions(ref?: string): { width: number; height: number } {
  const segment = ref?.split("-")[2];
  const [width, height] = (segment ?? "").split("x").map(Number);
  return {
    width: Number.isFinite(width) && width > 0 ? width : 1600,
    height: Number.isFinite(height) && height > 0 ? height : 900,
  };
}
