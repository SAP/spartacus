import { Injectable } from '@angular/core';

import {
  CmsConfig,
  CmsBannerComponent,
  CmsBannerComponentMedia,
  CmsResponsiveBannerComponentMedia
} from '@spartacus/core';
import { CmsComponentData } from './../../cms/components/cms-component-data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BannerComponentService {
  constructor(
    public component: CmsComponentData<CmsBannerComponent>,
    protected config: CmsConfig
  ) {}

  // TODO: move to a more generic location
  // TODO: Make configurable
  private formats: any[] = [
    { code: 'mobile', width: 200 },
    { code: 'tablet', width: 500 },
    { code: 'desktop', width: 800 },
    { code: 'widescreen', width: 1200 }
  ];
  static hasMedia(data): boolean {
    return !!data.media;
  }

  hasImage(): Observable<boolean> {
    return this.component.data$.pipe(map(BannerComponentService.hasMedia));
  }

  getImageUrl(): Observable<string> {
    return this.component.data$.pipe(
      map(data =>
        BannerComponentService.hasMedia(data)
          ? (<CmsBannerComponentMedia>data.media).url
          : ''
      )
    );
  }

  getResponsiveImageUrl(): Observable<string> {
    return this.component.data$.pipe(
      map(data =>
        BannerComponentService.hasMedia(data)
          ? (<CmsResponsiveBannerComponentMedia>data.media).desktop.url
          : ''
      )
    );
  }

  getTarget(): Observable<string> {
    return this.component.data$.pipe(
      map(data => {
        return !data.external || data.external === 'false' ? '_self' : '_blank';
      })
    );
  }

  getAltText(): Observable<string> {
    return this.component.data$.pipe(
      map(data =>
        BannerComponentService.hasMedia(data)
          ? (<CmsBannerComponentMedia>data.media).altText
          : ''
      )
    );
  }

  getBaseUrl(): string {
    return this.config.server.baseUrl || '';
  }

  getImageAbsoluteUrl(): Observable<string> {
    return this.getImageUrl().pipe(map(url => this.getBaseUrl() + url));
  }

  getResponsiveSrcSet(): Observable<string> {
    return this.component.data$.pipe(
      map(data => {
        return this.formats.reduce((srcset, format) => {
          if (typeof data.media[format.code] !== 'undefined') {
            return (srcset += `${this.getBaseUrl()}${
              data.media[format.code].url
            } ${format.width}w, `);
          } else {
            return srcset;
          }
        }, '');
      })
    );
  }

  getComponentUID() {
    return this.component.uid;
  }
}
