export abstract class MediaConfig {
  mediaFormats?: {
    /**
     * Represents the media format code, that is the key to distinguish different
     * media in a container.
     */
    [format: string]: MediaFormatSize;
  };
}

export interface MediaFormatSize {
  /**
   * Specifies the width for a given media format. The media format width is used
   * to align the width of the media with the available size in the layout, so that
   * different media's can be used in a responsive layout.
   */
  width?: number;
}
