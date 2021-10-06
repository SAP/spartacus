import { Image } from '@spartacus/core';

export interface Media {
  /**
   * Identify the “default” image URL which is used in case the srcset is not specified.
   * Browsers without srcset support will also fallback to this URl.
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

  /**
   * Describes the role of an element in programs that can make use of it, such as screen
   * readers or magnifiers
   */
  role?: string;
}

/**
 * Contains multiple media for different formats
 */
export interface MediaContainer {
  [format: string]: Image;
}

/**
 * Specifies media size information that can be used to generate information for the
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

/**
 * Indicates how the browser should load the image.
 *
 * While this might not add too much value in some scenarios, as we have other
 * optimizations to defer loading of larger pieces of the DOM, there might be
 * components who haven't implemented other lazy loading techniques. Moreover,
 * a server sides rendered page that lands directly in the browser could benefit
 * enormously from the lazy loading of images.
 */
export enum ImageLoadingStrategy {
  /**
   * Loads the image immediately, regardless of whether or not the image
   * is currently within the visible viewport (this is the default value).
   */
  EAGER = 'eager',
  /**
   * Defers loading the image until it reaches a calculated distance from the viewport,
   * as defined by the browser. The intent is to avoid the network and storage bandwidth
   * needed to handle the image until it's reasonably certain that it will be needed.
   * This generally improves the performance of the content in most typical use cases.
   */
  LAZY = 'lazy',
}
