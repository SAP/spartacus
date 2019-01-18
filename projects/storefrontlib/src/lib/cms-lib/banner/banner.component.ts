import { Component, ChangeDetectionStrategy } from '@angular/core';

import {
  CmsConfig,
  CmsBannerComponent,
  CmsBannerComponentMedia
} from '@spartacus/core';
import { CmsComponentData } from './../../cms/components/cms-component-data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerComponent {
  static hasMedia(data) {
    return !!data.media;
  }

  constructor(
    public component: CmsComponentData<CmsBannerComponent>,
    protected config: CmsConfig
  ) {}

  hasImage(): Observable<boolean> {
    return this.component.data$.pipe(map(BannerComponent.hasMedia));
  }

  getImageUrl(): Observable<string> {
    return this.component.data$.pipe(
      map(data =>
        BannerComponent.hasMedia(data)
          ? (<CmsBannerComponentMedia>data.media).url
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
        BannerComponent.hasMedia(data)
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
}
