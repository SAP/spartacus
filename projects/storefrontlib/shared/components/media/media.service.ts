/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Config, FeatureConfigService, Image } from '@spartacus/core';
import { MediaConfig } from './media.config';
import {
  ImageLoadingStrategy,
  Media,
  MediaContainer,
  MediaFormatSize,
  PictureHTMLElementSource,
} from './media.model';

/**
 * Service which generates media URLs. It leverage the MediaContainer and MediaFormats so
 * that URLs and sizes are generated for the same media. This helps to improve performance
 * across difference devices and layouts.
 *
 * Media formats are optional, but highly recommended. The format will help the browser to
 * identify the right media for the right experience.
 *
 * The MediaService will generate absolute URLs in case relative URLs are provided for the Media.
 * The baseUrl is read from the `occConfig.backend.media.baseUrl` or
 * `occConfig.backend.occ.baseUrl`.
 */
@Injectable({
  providedIn: 'root',
})
export class MediaService {
  /**
   * The media formats sorted by size. The media format representing the smallest
   * size is sorted on top.
   */
  private _sortedFormats: { code: string; size: MediaFormatSize }[];
  private _sortedPictureFormats: { code: string; mediaQuery: string }[];
  private _reversedFormats: { code: string; size: MediaFormatSize }[];

  private readonly featureConfigService = inject(FeatureConfigService);

  constructor(protected config: Config) {}

  getMediaBasedOnHTMLElementType(
    elementType: 'img' | 'picture',
    mediaContainer?: MediaContainer | Image,
    format?: string,
    alt?: string,
    role?: string
  ): Media | undefined {
    const shouldGetMediaForPictureElement =
      this.featureConfigService.isEnabled(
        'useExtendedMediaComponentConfiguration'
      ) && elementType !== 'img';

    return shouldGetMediaForPictureElement
      ? this.getMediaForPictureElement(mediaContainer, format, alt, role)
      : this.getMedia(mediaContainer, format, alt, role);
  }

  /**
   * Returns a `Media` object with the main media (`src`) and various media (`src`)
   * for specific formats.
   *
   * This method is used for creating `Media` object that is used in `img` HTML element
   */
  getMedia(
    mediaContainer?: MediaContainer | Image,
    format?: string,
    alt?: string,
    role?: string
  ): Media | undefined {
    if (!mediaContainer) {
      return;
    }

    const commonMediaProperties = this.getCommonMediaObject(
      mediaContainer,
      format,
      alt,
      role
    );

    return {
      ...commonMediaProperties,
      srcset: this.resolveSrcSet(mediaContainer, format),
    };
  }

  /**
   * Returns a `Media` object with the main media (`src`) and various sources
   * for specific formats for HTML `<picture>` element.
   */
  getMediaForPictureElement(
    mediaContainer?: MediaContainer | Image,
    format?: string,
    alt?: string,
    role?: string
  ): Media | undefined {
    if (!mediaContainer) {
      return;
    }

    const commonMediaProperties = this.getCommonMediaObject(
      mediaContainer,
      format,
      alt,
      role
    );

    return {
      ...commonMediaProperties,
      sources: this.resolveSources(mediaContainer, format),
    };
  }

  /**
   * Generates attributes common for `<img>` ang `<picture>`.
   */
  protected getCommonMediaObject(
    mediaContainer: MediaContainer | Image,
    format?: string,
    alt?: string,
    role?: string
  ): Media {
    const mainMedia: Image = mediaContainer.url
      ? mediaContainer
      : this.resolveMedia(mediaContainer as MediaContainer, format);

    return {
      src: this.resolveAbsoluteUrl(mainMedia?.url ?? ''),
      alt: alt ?? mainMedia?.altText,
      role: role ?? mainMedia?.role,
      ...this.getWidthAndHeight(mediaContainer, format),
    };
  }

  /**
   * Returns width and height for Image.
   *
   * Width and height are not coming from CMS so it should be
   * manually added to the Container | Image object
   */
  protected getWidthAndHeight(
    mediaContainer: MediaContainer | Image,
    format?: string
  ) {
    const mainMedia: Image = mediaContainer.url
      ? mediaContainer
      : this.resolveMedia(mediaContainer as MediaContainer, format);

    return {
      width: mainMedia?.width,
      height: mainMedia?.height,
    };
  }

  /**
   * Reads the loading strategy from the `MediaConfig`.
   *
   * Defaults to `ImageLoadingStrategy.EAGER`.
   */
  get loadingStrategy(): ImageLoadingStrategy {
    return (
      (this.config as MediaConfig)?.imageLoadingStrategy ??
      ImageLoadingStrategy.EAGER
    );
  }

  /**
   * Creates the media formats in a logical sorted order. The map contains the
   * format key and the format size information. We do this only once for performance
   * benefits.
   */
  protected get sortedFormats(): { code: string; size: MediaFormatSize }[] {
    const mediaFormats = this.config?.mediaFormats;

    if (!this._sortedFormats && mediaFormats) {
      this._sortedFormats = Object.keys(mediaFormats)
        .map((key) => ({
          code: key,
          size: mediaFormats[key],
        }))
        .sort((a, b) =>
          a.size.width && b.size.width && a.size.width > b.size.width ? 1 : -1
        );
    }

    return this._sortedFormats ?? [];
  }

  /**
   * Creates the media formats in a logical sorted order. The map contains the
   * format key and the format media query information. We do this only once for performance
   * benefits.
   */
  protected get sortedPictureFormats(): {
    code: string;
    mediaQuery: string;
  }[] {
    const pictureElementMediaFormats =
      this.config?.media?.pictureElementFormats;
    const pictureFormatsOrder = this.config?.media?.pictureFormatsOrder;

    if (!pictureElementMediaFormats) {
      return [];
    }

    if (!this._sortedPictureFormats && pictureElementMediaFormats) {
      this._sortedPictureFormats = Object.keys(pictureElementMediaFormats).map(
        (key) => ({
          code: key,
          mediaQuery: pictureElementMediaFormats[key]?.mediaQueries || '',
        })
      );

      if (pictureFormatsOrder) {
        this._sortedPictureFormats.sort((a, b) => {
          const orderA = pictureFormatsOrder.indexOf(a.code);
          const orderB = pictureFormatsOrder.indexOf(b.code);

          return (
            (orderA !== -1 ? orderA : Infinity) -
            (orderB !== -1 ? orderB : Infinity)
          );
        });
      }
    }

    return this._sortedPictureFormats ?? [];
  }

  /**
   * Creates the media formats in a reversed sorted order.
   */
  protected get reversedFormats(): { code: string; size: MediaFormatSize }[] {
    if (!this._reversedFormats) {
      this._reversedFormats = this.sortedFormats.slice().reverse();
    }
    return this._reversedFormats;
  }

  /**
   * Resolves the right media for the given format. The fo
   */
  protected resolveMedia(media: MediaContainer, format?: string): Image {
    return media[this.resolveFormat(media, format)];
  }

  /**
   * Validates the format against the given mediaContainer. If there is no format available,
   * or if the mediaContainer doesn't contain a media for the given media, the most optimal
   * format is resolved. If even that is not possible, the first format is returned.
   */
  protected resolveFormat(
    mediaContainer: MediaContainer,
    format?: string
  ): string {
    if (format && mediaContainer[format]) {
      return format;
    }
    return (
      this.resolveBestFormat(mediaContainer) || Object.keys(mediaContainer)[0]
    );
  }

  /**
   * Returns the media format code with the best size.
   */
  protected resolveBestFormat(
    media: MediaContainer | Image
  ): string | undefined {
    return this.reversedFormats.find((format) =>
      media.hasOwnProperty(format.code)
    )?.code;
  }

  /**
   * Returns a set of media for the available media formats. Additionally, the configured media
   * format width is added to the srcset, so that browsers can select the appropriate media.
   *
   * The optional maxFormat indicates that only sources till a certain format should be added
   * to the srcset.
   */
  protected resolveSrcSet(
    media: MediaContainer | Image,
    maxFormat?: string
  ): string | undefined {
    if (!media) {
      return undefined;
    }

    const formats = this.getFormatsUpToMaxFormat(this.sortedFormats, maxFormat);

    const srcset = formats.reduce((set, format) => {
      const image = (media as MediaContainer)[format.code];
      if (!!image) {
        if (set) {
          set += ', ';
        }
        set += `${this.resolveAbsoluteUrl(image.url ?? '')} ${
          format.size.width
        }w`;
      }
      return set;
    }, '');

    return srcset === '' ? undefined : srcset;
  }

  /**
   * Resolves the sources for a picture element based on the provided media container and maximum format.
   *
   * This method generates an array of picture element attributes (`srcset` and `media`) by filtering
   * the sorted picture formats up to the specified maximum format. It then maps the corresponding
   * media sources from the provided media container.
   *
   * The method will return an array of picture element attributes suitable for use
   * in a `<picture>` element, or `undefined` if no media is provided.
   */
  protected resolveSources(
    media: MediaContainer | Image,
    maxFormat?: string
  ): PictureHTMLElementSource[] | undefined {
    if (!media) {
      return undefined;
    }

    const pictureFormats = this.getFormatsUpToMaxFormat(
      this.sortedPictureFormats,
      maxFormat
    );

    return pictureFormats.reduce<PictureHTMLElementSource[]>(
      (sources, format) => {
        const image = (media as MediaContainer)[format.code];

        if (image?.url) {
          sources.push({
            srcset: this.resolveAbsoluteUrl(image.url),
            media: format.mediaQuery,
            ...this.getWidthAndHeight(image, maxFormat),
          });
        }
        return sources;
      },
      []
    );
  }

  /**
   * Retrieves a list of formats up to and including the specified max format.
   *
   * @template T - A type that extends an object containing a `code` property of type `string`.
   * @param {T[]} formats - An array of format objects, each containing at least a `code` property.
   * @param {string} [maxFormat] - The maximum format code to include in the returned list.
   * @returns {T[]} An array of formats up to and including the specified max format. If `maxFormat` is not found, returns the entire list.
   *
   * This method filters the provided list of formats to include only those up to and including
   * the specified max format. If the `maxFormat` is not found, the entire list of formats is returned.
   */
  protected getFormatsUpToMaxFormat<T extends { code: string }>(
    formats: T[],
    maxFormat?: string
  ): T[] {
    let pictureFormats = formats;
    const maxIndex = pictureFormats.findIndex((f) => f.code === maxFormat);

    if (maxIndex > -1) {
      pictureFormats = pictureFormats.slice(0, maxIndex + 1);
    }

    return pictureFormats;
  }

  /**
   * Resolves the absolute URL for the given url. In most cases, this URL represents
   * the relative URL on the backend. In that case, we prefix the url with the baseUrl.
   *
   * When we have receive an absolute URL, we return the URL as-is. An absolute URL might also
   * start with double slash, which is used to resolve media cross from http and https.
   */
  protected resolveAbsoluteUrl(url: string): string {
    return !url || url.startsWith('http') || url.startsWith('//')
      ? url
      : this.getBaseUrl() + url;
  }

  /**
   * The base URL is either driven by a specific `backend.media.baseUrl`, or by the
   * `backend.occ.baseUrl`.
   *
   * The `backend.media.baseUrl` can be used to load media from a different location.
   *
   * In Commerce Cloud, a different location could mean a different "aspect".
   *
   * Defaults to empty string in case no config is provided.
   */
  protected getBaseUrl(): string {
    return (
      this.config.backend?.media?.baseUrl ??
      this.config.backend?.occ?.baseUrl ??
      ''
    );
  }
}
