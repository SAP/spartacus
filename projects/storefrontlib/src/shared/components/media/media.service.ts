import { Injectable } from '@angular/core';
import { Image, OccConfig } from '@spartacus/core';
import { MediaConfig } from './media.config';
import { Media, MediaContainer, MediaFormatSize } from './media.model';

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
  protected sortedFormats: { code: string; size: MediaFormatSize }[];
  protected reversedFormats: { code: string; size: MediaFormatSize }[];

  constructor(
    protected occConfig: OccConfig,
    protected mediaConfig: MediaConfig
  ) {
    this.sortFormats();
  }

  /**
   * Returns a `Media` object with the main media (`src`) and various media (`src`)
   * for specific formats.
   */
  getMedia(
    mediaContainer: MediaContainer | Image,
    format?: string,
    alt?: string
  ): Media {
    if (!mediaContainer) {
      return;
    }

    const mainMedia: Image = mediaContainer.url
      ? mediaContainer
      : this.resolveMedia(mediaContainer as MediaContainer, format);

    return {
      src: this.resolveAbsoluteUrl(mainMedia?.url),
      alt: alt || mainMedia?.altText,
      srcset: this.resolveSrcSet(mediaContainer),
    };
  }

  /**
   * Creates the media formats to provide fast access to the media formats in a
   * logical order. The map contains the format key and the format size information.
   */
  protected sortFormats(): void {
    this.sortedFormats = Object.keys(this.mediaConfig.mediaFormats)
      .map((key) => ({
        code: key,
        size: this.mediaConfig.mediaFormats[key],
      }))
      .sort((a, b) => (a.size.width > b.size.width ? 1 : -1));

    this.reversedFormats = [].concat(this.sortedFormats).reverse();
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
   * Returns a set of media for the available media formats. Additionally, the congiured media
   * format width is added to the srcset, so that browsers can select the appropriate media.
   */
  protected resolveSrcSet(media: MediaContainer | Image): string {
    if (!media) {
      return undefined;
    }

    const srcset = this.sortedFormats.reduce((set, format) => {
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
   */
  protected resolveAbsoluteUrl(url: string): string {
    if (!url) {
      return null;
    }
    return url.startsWith('http') ? url : this.getBaseUrl() + url;
  }

  /**
   * The base URL is either driven by a specific `backend.media.baseUrl`, or by the
   * `backend.occ.baseUrl`.
   *
   * The `backend.media.baseUrl` can be used to load media from a different location.
   *
   * In Commerce Cloud, a differnt location could mean a different "aspect".
   */
  protected getBaseUrl(): string {
    return (
      this.occConfig.backend.media.baseUrl ||
      this.occConfig.backend.occ.baseUrl ||
      ''
    );
  }
}
