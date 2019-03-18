import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  CmsBannerComponent,
  CmsBannerComponentMedia,
  CmsConfig,
  CmsResponsiveBannerComponentMedia
} from '@spartacus/core';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { ResponsiveBannerFormat } from './responsive-banner-format.model';

@Injectable()
export class BannerComponentService {
  constructor(
    public component: CmsComponentData<CmsBannerComponent>,
    protected config: CmsConfig
  ) {}

  private convertToAbsoluteUrl = map(url => this.getBaseUrl() + url);

  // TODO: move to a more generic location
  // TODO: Make configurable
  private formats: ResponsiveBannerFormat[] = [
    { code: 'mobile', width: 200 },
    { code: 'tablet', width: 500 },
    { code: 'desktop', width: 800 },
    { code: 'widescreen', width: 1200 }
  ];

  static hasMedia(data): boolean {
    return !!data.media;
  }

  static hasHeadline(data): boolean {
    return !!data.headline;
  }

  static hasContent(data): boolean {
    return !!data.content;
  }

  getComponentData(): Observable<CmsBannerComponent> {
    return this.component.data$;
  }

  hasImage(): Observable<boolean> {
    return this.getComponentData().pipe(map(BannerComponentService.hasMedia));
  }

  hasHeadline(): Observable<boolean> {
    return this.getComponentData().pipe(
      map(BannerComponentService.hasHeadline)
    );
  }

  hasContent(): Observable<boolean> {
    return this.getComponentData().pipe(map(BannerComponentService.hasContent));
  }

  getImageUrl(): Observable<string> {
    return this.getComponentData().pipe(
      map(data =>
        BannerComponentService.hasMedia(data)
          ? (<CmsBannerComponentMedia>data.media).url
          : ''
      )
    );
  }

  getResponsiveImageUrl(): Observable<string> {
    return this.getComponentData().pipe(
      map(data =>
        BannerComponentService.hasMedia(data)
          ? (<CmsResponsiveBannerComponentMedia>data.media).desktop.url
          : ''
      )
    );
  }

  getTarget(): Observable<string> {
    return this.getComponentData().pipe(
      map(data => {
        return !data.external || data.external === 'false' ? '_self' : '_blank';
      })
    );
  }

  getAltText(): Observable<string> {
    return this.getComponentData().pipe(
      map(data =>
        BannerComponentService.hasMedia(data)
          ? (<CmsBannerComponentMedia>data.media).altText
          : ''
      )
    );
  }

  getHeadline(): Observable<string> {
    return this.getComponentData().pipe(
      map(data =>
        BannerComponentService.hasHeadline(data) ? data.headline : ''
      )
    );
  }

  getContent(): Observable<string> {
    return this.getComponentData().pipe(
      map(data => (BannerComponentService.hasContent(data) ? data.content : ''))
    );
  }

  getBaseUrl(): string {
    return this.config.server.baseUrl || '';
  }

  getImageAbsoluteUrl(): Observable<string> {
    return this.getImageUrl().pipe(this.convertToAbsoluteUrl);
  }

  getResponsiveImageAbsoluteUrl(): Observable<string> {
    return this.getResponsiveImageUrl().pipe(this.convertToAbsoluteUrl);
  }

  getResponsiveSrcSet(): Observable<string> {
    return this.getComponentData().pipe(
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
