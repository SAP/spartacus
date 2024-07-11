/**
 * Represents a rendering entry in the rendering cache.
 */
export interface RenderingEntry {
  html?: any;
  err?: any;
  time?: number;
  rendering?: boolean;
}
