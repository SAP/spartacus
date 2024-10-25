/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  inject,
  Input,
  OnChanges,
  Output,
  Renderer2,
  TrackByFunction,
} from '@angular/core';
import { Config, Image, ImageGroup, WindowRef } from '@spartacus/core';
import { ImageLoadingStrategy, Media, MediaContainer } from './media.model';
import { MediaService } from './media.service';
import { USE_LEGACY_MEDIA_COMPONENT } from './media.token';

/**
 * The HTML element rendered in the template can be either `<img>` or `<picture>`,
 * depending on the input value of `elementType`, which defaults to `'img'`.
 *
 * In the case of a `<picture>` element, each `<source>` element will contain `srcset` attribute with exactly one URL.
 *
 * If you need multiple URLs per `<source>` (e.g. for different pixel densities),
 * split it into multiple media queries (e.g. with `min-device-pixel-ratio`). See the following example:
 *
 * Instead of:
 *
 * ```html
 * <source media="(min-width: 960px)" srcset="image-1400.jpg 1x, image-2800.jpg 2x">
 * ```
 *
 * Use additional formats and additional media queries, such as:
 *
 * ```html
 * <source media="(min-width: 960px) and (-webkit-min-device-pixel-ratio: 2)" srcset="image-2800.jpg">
 * <source media="(min-width: 960px)" srcset="image-1400.jpg">
 * ```
 */
@Component({
  selector: 'cx-media',
  templateUrl: './media.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaComponent implements OnChanges {
  /**
   * The media container can hold multiple media items, so that
   * a specific media (by format) can be used or multiple media
   * can be provided in a `srcset` so the browser will figure out
   * the best media for the device.
   */
  @Input() container:
    | MediaContainer
    | Image
    | ImageGroup
    | ImageGroup[]
    | undefined;

  /**
   * if a media format is given, a media for the given format will be rendered
   */
  @Input() format: string;

  /**
   * A specific alt text for an image, which overrules the alt text
   * from the container data.
   */
  @Input() alt: string;

  /**
   * set role of the image if different than what is intended (eg, role="presentation")
   */
  @Input() role: string;

  /**
   * Set the loading strategy of the media. Defaults to global loading strategy.
   * Use 'lazy' or 'eager' strategies.
   */
  @Input() loading: ImageLoadingStrategy | null = this.loadingStrategy;

  get SPIKE_loading(): ImageLoadingStrategy | null {
    if (this.isLCP) {
      return ImageLoadingStrategy.EAGER;
    }
    return this.loading;
  }

  /**
   * Works only when `useExtendedMediaComponentConfiguration` toggle is true
   *
   * @default img
   */
  @Input() elementType: 'img' | 'picture' = 'img';

  /**
   * Specifies the `sizes` attribute for responsive images.
   *
   * The `sizes` attribute describes the layout width of the image for various viewport sizes.
   * It helps the browser determine which image to download from the `srcset` attribute.
   *
   * - The `sizes` attribute is defined using media queries.
   * - It allows specifying different sizes for various screen widths or other conditions (e.g., device orientation).
   * - The browser uses the value to pick the most appropriate image source from the `srcset`.
   *
   * This input is applicable only when the `elementType` input is set to `'img'`, as the `sizes` attribute
   * is currently added only to the `<img>` HTML element.
   *
   * Works only when the `useExtendedMediaComponentConfiguration` toggle is set to `true`.
   */
  @Input() sizesForImgElement: string;

  /**
   * Once the media is loaded, we emit an event.
   */
  @Output() loaded: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  /**
   * The media contains the info for the UI to create the image. This media
   * object might contain more info once other media types (i.e. video) is supported.
   */
  media: Media | undefined;

  @Input() isLCP = false;

  /**
   * The `cx-media` component has an `is-initialized` class as long as the
   * media is being initialized.
   */
  @HostBinding('class.is-initialized') isInitialized = false;

  /**
   * The `cx-media` component has a `is-loading` class as long as the
   * media is loaded. Wehn the media is loaded, the `is-initialized` class
   * is added.
   */
  @HostBinding('class.is-loading') isLoading = true;

  /**
   * When there's no media provided for the content, or in case an error
   * happened during loading, we add the `is-missing` class. Visual effects
   * can be controlled by CSS.
   */
  @HostBinding('class.is-missing') isMissing = false;

  protected trackByMedia: TrackByFunction<HTMLSourceElement> = (_, item) =>
    item.media;

  /**
   * @deprecated since 2211.31. It will be eventually removed in the future
   *
   * To use `img` HTML element instead of `picture`
   * use `useExtendedMediaComponentConfiguration` feature flag
   * and pass `[elementType]="'img'"` input to the component
   */
  protected isLegacy =
    inject(USE_LEGACY_MEDIA_COMPONENT, { optional: true }) ||
    (inject(Config) as any)['useLegacyMediaComponent'] ||
    false;

  protected renderer = inject(Renderer2);
  protected document = inject(DOCUMENT);
  protected windowRef = inject(WindowRef);
  protected config = inject(Config);
  constructor(protected mediaService: MediaService) {}

  ngOnChanges(): void {
    this.create();
  }

  /**
   * Creates the `Media` object
   */
  protected create(): void {
    this.media = this.mediaService.getMediaBasedOnHTMLElementType(
      this.elementType,
      this.container instanceof Array ? this.container[0] : this.container,
      this.format,
      this.alt,
      this.role
    );

    if (!this.media?.src) {
      this.handleMissing();
    }

    if (this.isLCP && !this.isLegacy) {
      this.createPreloadLinks();
    }
  }

  protected createPreloadLinks(): void {
    if (this.windowRef.isBrowser()) {
      return;
    }

    const sources = this.media?.sources;
    if (!sources || sources.length === 0) {
      return;
    }

    const config = this.config as Config;
    const formats = config?.media?.pictureElementFormats;
    const order = config?.media?.pictureFormatsOrder;

    if (!formats || !order) {
      return;
    }

    const renderer = this.renderer;
    const head = this.document.head;

    for (let i = 0; i < order.length; i++) {
      const formatName = order[i];
      const mediaQuery = formats[formatName]?.mediaQueries;
      const source = sources[i];

      if (!mediaQuery || !source) {
        continue;
      }

      let adjustedMediaQuery = mediaQuery;
      let minWidth: number | null = null;
      let maxWidth: number | null = null;

      const parts = mediaQuery.split(' and ').map((part) => part.trim());
      const otherConditions = [];

      parts.forEach((part) => {
        if (part.includes('max-width')) {
          maxWidth = parseInt(
            part.match(/max-width:\s*(\d+)px/)?.[1] ?? '',
            10
          );
        } else if (part.includes('min-width')) {
          minWidth = parseInt(
            part.match(/min-width:\s*(\d+)px/)?.[1] ?? '',
            10
          );
        } else {
          otherConditions.push(part);
        }
      });

      if (i > 0) {
        const previousFormatName = order[i - 1];
        const previousMediaQuery = formats[previousFormatName]?.mediaQueries;
        if (previousMediaQuery) {
          const previousParts = previousMediaQuery
            .split(' and ')
            .map((part) => part.trim());

          previousParts.forEach((part) => {
            if (part.includes('max-width')) {
              const previousMaxWidth = parseInt(
                part.match(/max-width:\s*(\d+)px/)?.[1] ?? '',
                10
              );
              minWidth = previousMaxWidth + 1;
            }
          });
        }
      }

      const mediaQueryParts: string[] = [];
      if (minWidth !== null) {
        mediaQueryParts.push(`(min-width: ${minWidth}px)`);
      }
      if (maxWidth !== null) {
        mediaQueryParts.push(`(max-width: ${maxWidth}px)`);
      }

      mediaQueryParts.push(...otherConditions);

      adjustedMediaQuery = mediaQueryParts.join(' and ');

      const preloadLink = renderer.createElement('link');
      renderer.setAttribute(preloadLink, 'rel', 'preload');
      renderer.setAttribute(preloadLink, 'as', 'image');
      renderer.setAttribute(preloadLink, 'href', source.srcset);
      renderer.setAttribute(preloadLink, 'media', adjustedMediaQuery);

      renderer.appendChild(head, preloadLink);
      console.log('SPIKE - preloadLink added', preloadLink);
    }
  }

  /**
   * This handler is called from the UI when the image is loaded.
   */
  loadHandler(): void {
    this.isLoading = false;
    this.isInitialized = true;
    this.isMissing = false;
    this.loaded.emit(true);
  }

  /**
   * Indicates whether the browser should lazy load the image.
   */
  get loadingStrategy(): ImageLoadingStrategy | null {
    return this.mediaService.loadingStrategy === ImageLoadingStrategy.LAZY
      ? ImageLoadingStrategy.LAZY
      : null;
  }

  /**
   * SPIKE
   * the src can look like this:
   * - https://<some IP>/medias/Elec-350x450-HomeSmallDiscount-EN-01-350W.jpg?context=bWFzdGVyfGltYWdlc3wxMzQ0MXxpbWFnZS9qcGVnfGFXMWhaMlZ6TDJobU1DOW9NMk12T0RjNU56UTBOalEzTVRjeE1DNXFjR2N8NWE2ZmFkZDFmOTNjNWE1YmI3MzdhZWQ0YTk0YjMyNzcyNjk0NTU1OGY4MWQzOTJiNzMxMGQ5NTVkNzYzMDkzOA
   *  - height 450
   *  - width 350
   * - https://domain.com/medias/Elec-200x150-HomeFamLight-EN-01-200W.jpg?context=bWFzdGVyfGltYWdlc3w5NzIwfGltYWdlL2pwZWd8YVcxaFoyVnpMMmd4WWk5b1pEUXZPRGM1TnpRME5EazJORE00TWk1cWNHY3wzZGZjMDk3MGNmMzA4YTg1YjlmOWFiZjRhOGM5YjliOGMzODEwMWY2YTg5Mjk1Y2UwYzQzZGZlODljY2JjNjE4
   *  - height 150
   *  - width 200
   * we want to get the height and width from the url
   *
   */
  SPIKE_extractDimensionsFromUrl(url: string): {
    width?: number;
    height?: number;
  } {
    // Define a regular expression pattern to match the desired format
    const pattern = /\/medias\/[^-]+-(\d+)x(\d+)-[^-]+/;

    // Execute the pattern on the URL
    const match = url.match(pattern);

    // Check if the pattern matched and extract the dimensions
    if (match) {
      const width = parseInt(match[1], 10);
      const height = parseInt(match[2], 10);
      return { width, height };
    } else {
      // Return null if the pattern does not match
      return {};
    }
  }

  /**
   * Whenever an error happens during load, we mark the component
   * with css classes to have a missing media.
   */
  errorHandler(): void {
    this.handleMissing();
  }

  protected handleMissing() {
    this.isLoading = false;
    this.isInitialized = true;
    this.isMissing = true;
    this.loaded.emit(false);
  }
}
