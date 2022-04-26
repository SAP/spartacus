import { Injectable } from '@angular/core';
import { Config, Image } from '@spartacus/core';
import { MediaConfig } from './media.config';
import {
  ImageLoadingStrategy,
  Media,
  MediaContainer,
  MediaFormatSize,
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
  private _reversedFormats: { code: string; size: MediaFormatSize }[];

  constructor(protected config: Config) {}

  /**
   * Returns a `Media` object with the main media (`src`) and various media (`src`)
   * for specific formats.
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

    const mainMedia: Image = mediaContainer.url
      ? mediaContainer
      : this.resolveMedia(mediaContainer as MediaContainer, format);

    return {
      src: this.resolveAbsoluteUrl(mainMedia?.url),
      alt: alt ?? mainMedia?.altText,
      role: role ?? mainMedia?.role,
      srcset: this.resolveSrcSet(mediaContainer, format),
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
    if (!this._sortedFormats && this.config?.mediaFormats) {
      this._sortedFormats = Object.keys(this.config.mediaFormats)
        .map((key) => ({
          code: key,
          size: this.config.mediaFormats[key],
        }))
        .sort((a, b) => (a.size.width > b.size.width ? 1 : -1));
    }
    return this._sortedFormats ?? [];
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
  protected resolveBestFormat(media: MediaContainer | Image): string {
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

    // Only create srcset images that are smaller than the given `maxFormat` (if any)
    let formats = this.sortedFormats;
    const max: number = formats.findIndex((f) => f.code === maxFormat);
    if (max > -1) {
      formats = formats.slice(0, max + 1);
    }

    const srcset = formats.reduce((set, format) => {
      if (!!media[format.code]) {
        if (set) {
          set += ', ';
        }
        set += `${this.resolveAbsoluteUrl(media[format.code].url)} ${
          format.size.width
        }w`;
      }
      return set;
    }, '');

    return srcset === '' ? undefined : srcset;
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
