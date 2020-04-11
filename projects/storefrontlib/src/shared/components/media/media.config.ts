/**
 * Provides configuration specific to Media, such as images. This is used to optimize
 * rendering of the media, SEO and performance.
 */
export abstract class MediaConfig {
  mediaFormats?: {
    /**
     * Represents the media format code, that is the key to distinguish different
     * media in a container.
     */
    [format: string]: MediaFormatSize;
  };
}

/**
 * Specificies media size information that can be used to generate information for the
 * browser to resolve the right media for the right layout or device.
 */
export interface MediaFormatSize {
  /**
   * Specifies the width for a given media format. The media format width is used
   * to align the width of the media with the available size in the layout, so that
   * different media's can be used in a responsive layout.
   */
  width?: number;
}
