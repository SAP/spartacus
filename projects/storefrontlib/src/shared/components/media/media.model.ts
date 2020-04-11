import { Image } from '@spartacus/core';

export interface Media {
  /**
   * Identify the “default” image URL which is used in case the srcset is not specificied.
   * Browsers withotu srcset support will also fallback to this URl.
   */
  src: string;

  /**
   * The srcset attribute holds a list of image file URLs, along with size descriptions.
   */
  srcset?: string;

  /**
   * Provides alternative information for a media if a user cannot view the visual. It is
   * also used by web crawlers and screen readers.
   */
  alt?: string;
}

/**
 * Contains multiple media for different formats
 */
export interface MediaContainer {
  [format: string]: Image;
}
