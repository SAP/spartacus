import { Injectable } from '@angular/core';
import { OccConfig } from '@spartacus/core';
import { BreakpointService } from '../../../layout/breakpoint/breakpoint.service';
import { BREAKPOINT } from '../../../layout/config/layout-config';
import { Media, MediaFormats } from './media.model';

/** the default format is used for browsers that do not support   */
const DEFAULT_MEDIA_FORMAT = 'tablet';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  constructor(
    protected config: OccConfig,
    protected breakpointService: BreakpointService
  ) {}

  private get mediaFormats(): MediaFormats[] {
    return [
      {
        code: 'mobile',
        threshold: this.breakpointService.getSize(BREAKPOINT.xs),
      },
      {
        code: 'tablet',
        threshold: this.breakpointService.getSize(BREAKPOINT.sm),
      },
      {
        code: 'desktop',
        threshold: this.breakpointService.getSize(BREAKPOINT.md),
      },
      {
        code: 'widescreen',
        threshold: this.breakpointService.getSize(BREAKPOINT.lg),
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
    } else if (media && media[this.getHighestAvailableFormat(media)]) {
      return this.getImageUrl(media[this.getHighestAvailableFormat(media)].url);
    } else {
      return null;
    }
  }

  /**
   * returns highest resolution format name from media formats
   */
  private getHighestAvailableFormat(media): string {
    if (media) {
      let mediaFormat: MediaFormats;

      this.mediaFormats.forEach(format => {
        if (
          !mediaFormat ||
          (mediaFormat.threshold < format.threshold && media[format.code])
        ) {
          mediaFormat = format;
        }
      });

      return mediaFormat.code;
    }

    return null;
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

  private getImageUrl(url: string): string {
    if (!url) {
      return null;
    }
    return url.startsWith('http') ? url : this.getBaseUrl() + url;
  }

  private getBaseUrl(): string {
    return (
      this.config.backend.media.baseUrl || this.config.backend.occ.baseUrl || ''
    );
  }
}
