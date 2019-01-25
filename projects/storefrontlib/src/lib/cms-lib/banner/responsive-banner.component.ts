import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BannerComponent } from './banner.component';
import { CmsResponsiveBannerComponentMedia } from '@spartacus/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-responsive-banner',
  templateUrl: './responsive-banner.component.html',
  styleUrls: ['./responsive-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResponsiveBannerComponent extends BannerComponent {
  // TODO: move to a more generic location
  // TODO: Make configurable
  private formats = [
    { code: 'mobile', width: 200 },
    { code: 'tablet', width: 500 },
    { code: 'desktop', width: 800 },
    { code: 'widescreen', width: 1200 }
  ];

  getClass(): string {
    return 'responsive-banner ' + this.component.uid;
  }

  getImageUrl(): Observable<string> {
    return this.component.data$.pipe(
      map(data =>
        BannerComponent.hasMedia(data)
          ? (<CmsResponsiveBannerComponentMedia>data.media).desktop.url
          : ''
      )
    );
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
}
