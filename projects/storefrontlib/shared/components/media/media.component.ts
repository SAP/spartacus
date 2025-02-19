/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  inject,
  Input,
  OnChanges,
  Output,
  TrackByFunction,
} from '@angular/core';
import { Config, Image, ImageGroup } from '@spartacus/core';
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
  standalone: false,
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
