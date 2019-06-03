import { Injectable } from '@angular/core';
import { OccConfig } from '@spartacus/core';
import { BREAKPOINT, LayoutConfig } from '../../../layout/config/layout-config';
import { Media, MediaFormats } from './media.model';

/** the default format is used for browsers that do not support   */
const DEFAULT_MEDIA_FORMAT = 'tablet';

const DEFAULT_BREAKPOINTS = {
  [BREAKPOINT.xs]: 576,
  [BREAKPOINT.sm]: 768,
  [BREAKPOINT.md]: 992,
  [BREAKPOINT.lg]: 1200,
};

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  constructor(
    protected config: OccConfig,
    protected layoutConfig: LayoutConfig
  ) {}

  private get mediaFormats(): MediaFormats[] {
    const breakpoints = this.layoutConfig.breakpoints
      ? this.layoutConfig.breakpoints
      : DEFAULT_BREAKPOINTS;
    return [
      {
        code: 'mobile',
        threshold: breakpoints[BREAKPOINT.xs],
      },
      {
        code: 'tablet',
        threshold: breakpoints[BREAKPOINT.sm],
      },
      {
        code: 'desktop',
        threshold: breakpoints[BREAKPOINT.md],
      },
      {
        code: 'widescreen',
        threshold: breakpoints[BREAKPOINT.lg],
      },
    ];
  }

  getMedia(container, format?: string, alt?: string): Media {
    return {
      src: this.getMainImage(container, format),
      srcset: this.getSrcSet(container),
      alt: alt || this.getAlt(container, format),
    };
  }

  private getMainImage(media, format?: string): string {
    if (media && media[format || DEFAULT_MEDIA_FORMAT]) {
      return this.getImageUrl(media[format || DEFAULT_MEDIA_FORMAT].url);
    } else if (media && media.url) {
      return this.getImageUrl(media.url);
    } else {
      return null;
    }
  }

  private getAlt(media, format?: string): string {
    if (!media) {
      return undefined;
    } else if (media[format || DEFAULT_MEDIA_FORMAT]) {
      return media[format || DEFAULT_MEDIA_FORMAT].altText;
    } else if (media.altText) {
      return media.altText;
    }
  }

  /**
   * builds a set of images aligned with the breakpoints
   */
  private getSrcSet(media): string {
    if (!media) {
      return undefined;
    }
    const srcset = this.mediaFormats.reduce((set, format) => {
      if (!!media[format.code]) {
        if (set) {
          set += ', ';
        }
        set += `${this.getImageUrl(media[format.code].url)} ${
          format.threshold
        }w`;
      }
      return set;
    }, '');

    return srcset === '' ? undefined : srcset;
  }

  private getImageUrl = (url: string) => {
    return url.startsWith('http') ? url : this.getBaseUrl() + url;
  };

  private getBaseUrl(): string {
    return (
      this.config.backend.media.baseUrl || this.config.backend.occ.baseUrl || ''
    );
  }
}
