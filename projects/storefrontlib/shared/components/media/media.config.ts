/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import {
  ImageLoadingStrategy,
  MediaFormatSize,
  PictureElementQueries,
} from './media.model';

/**
 * Provides configuration specific to Media, such as images. This is used to optimize
 * rendering of the media, SEO and performance.
 */
@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class MediaConfig {
  /**
   * Media _format_ configuration holds the size of the media's assigned to
   * a format.
   */
  mediaFormats?: {
    /**
     * Represents the media format code, that is the key to distinguish different
     * media in a container.
     */
    [format: string]: MediaFormatSize;
  };

  /**
   * Picture element configuration holds the media queries assigned to
   * a format.
   * The order of formats matters.
   * <source> elements in <picture> will be sorted based on this order.
   * This is necessary because the browser evaluates each
   * <source> element in order and uses the first one that matches.
   */
  pictureElementFormats?: {
    [format: string]: PictureElementQueries;
  };

  /**
   * Used to specify the order of formats.
   * <source> elements in <picture> will be sorted based on this order.
   * This is necessary because the browser evaluates each
   * <source> element in order and uses the first one that matches.
   *
   * @example
   * ['mobile', 'tablet', 'desktop']
   */
  pictureFormatsOrder?: string[];

  /**
   * A map that associates the keys of `PictureElementQueries` with their corresponding CSS media query features.
   *
   * @type {Record<keyof PictureElementQueries, string>}
   *
   * The `queryMap` is used to translate the query properties provided in a `PictureElementQueries` object
   * to their respective CSS media query feature names. This map includes the following mappings:
   *
   * @example
   * - `minWidth` -> `min-width`
   * - `maxWidth` -> `max-width`
   * - `minHeight` -> `min-height`
   * - `maxHeight` -> `max-height`
   * - `minDevicePixelRatio` -> `min-device-pixel-ratio`
   * - `maxDevicePixelRatio` -> `max-device-pixel-ratio`
   * - `orientation` -> `orientation`
   * - `minAspectRatio` -> `min-aspect-ratio`
   * - `maxAspectRatio` -> `max-aspect-ratio`
   */
  mediaQueryMap?: Record<keyof PictureElementQueries, string>;

  /**
   * Specify when need to use <picture> element
   * over the <img> element
   */
  usePictureElement?: boolean;

  /**
   * Indicates how the browser should load the image. There's only one
   * global strategy for all media cross media in Spartacus.
   *
   * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img for more
   * information.
   *
   * If the `lazy` strategy is in place, the `loading="lazy"` attribute is added to the
   * img element.
   */
  imageLoadingStrategy?: ImageLoadingStrategy;

  /**
   * @deprecated
   * As of v7.0, Spartacus started using the <picture> element by default when a srcset is available.
   *
   * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture for more
   * information.
   *
   * If this breaks your project, you may set this option to true and use the legacy component instead.
   */
  useLegacyMediaComponent?: boolean;
}

declare module '@spartacus/core' {
  interface Config extends MediaConfig {}
}
