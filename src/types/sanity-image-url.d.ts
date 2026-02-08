declare module '@sanity/image-url/lib/types/types' {
  /**
   * Minimal Sanity image source shape used by image builders.
   * Adjust fields as needed for your project.
   */
  export type SanityImageSource = {
    _type?: 'image' | string;
    asset?: { _ref?: string; _id?: string } | string;
    [key: string]: unknown;
  };
}
