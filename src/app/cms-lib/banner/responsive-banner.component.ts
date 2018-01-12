import { Component, ElementRef, ViewChild } from '@angular/core';
import { BannerComponent } from './banner.component';

@Component({
  selector: 'y-responsive-banner',
  templateUrl: './responsive-banner.component.html'
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

  getImageUrl(): string {
    return this.hasImage() ? this.getImage().url : '';
  }

  private getImage(): any {
    return this.component.media['desktop'];
  }

  getResponsiveSrcset(): string {
    let srcset = '';
    for (const format of this.formats) {
      srcset += this.getImageSrcSet(format.code, format.width + 'w');
    }
    return srcset;
  }

  private getImageSrcSet(format: string, width: string): string {
    let src = '';
    const image = this.component.media[format];
    if (image) {
      src += this.getBaseUrl() + image.url + ' ' + width + ', ';
    }
    return src;
  }
}
