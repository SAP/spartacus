import { Injectable } from '@angular/core';
import { OccConfig } from '@spartacus/core';
import { BREAKPOINT, LayoutConfig } from '../../../layout/index';
import { missingProductImgSrc } from '../../../lib/ui/images/missingProduct';
import { Media, MediaFormats } from './media.model';

/** the default format is used for browsers that do not support   */
const DEFAULT_MEDIA_FORMAT = 'tablet';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  constructor(
    protected config: OccConfig,
    protected layoutConfig: LayoutConfig
  ) {}

  private mediaFormats: MediaFormats[] = [
    { code: 'mobile', threshold: this.layoutConfig.breakpoints[BREAKPOINT.xs] },
    { code: 'tablet', threshold: this.layoutConfig.breakpoints[BREAKPOINT.sm] },
    {
      code: 'desktop',
      threshold: this.layoutConfig.breakpoints[BREAKPOINT.md],
    },
    {
      code: 'widescreen',
      threshold: this.layoutConfig.breakpoints[BREAKPOINT.lg],
    },
  ];

  getImage(media, format?: string, alt?: string): Media {
    return {
      src: this.getMainImage(media, format),
      srcset: this.getSrcSet(media),
      alt: alt || this.getAlt(media, format),
    };
  }

  getMissingImage(alt?: string): Media {
    return {
      src: this.getMissingImageSrc(),
      alt: alt || undefined,
    };
  }

  private getMissingImageSrc() {
    return missingProductImgSrc;
  }

  private getMainImage(media, format?: string): string {
    if (!media) {
      return this.getMissingImageSrc();
    } else if (media[format || DEFAULT_MEDIA_FORMAT]) {
      return this.getImageUrl(media[format || DEFAULT_MEDIA_FORMAT].url);
    } else if (media.url) {
      return this.getImageUrl(media.url);
    } else {
      return this.getMissingImageSrc();
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
