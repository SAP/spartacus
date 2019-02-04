import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { BannerComponentService } from './banner.component.service';

@Component({
  selector: 'cx-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerComponent {
  static hasMedia(data): boolean {
    return !!data.media;
  }

  constructor(public service: BannerComponentService) {}

  hasImage(): Observable<boolean> {
    return this.service.hasImage();
  }

  getImageUrl(): Observable<string> {
    return this.service.getImageUrl();
  }

  getTarget(): Observable<string> {
    return this.service.getTarget();
  }

  getAltText(): Observable<string> {
    return this.service.getAltText();
  }

  getBaseUrl(): string {
    return this.service.getBaseUrl();
  }

  getImageAbsoluteUrl(): Observable<string> {
    return this.service.getImageAbsoluteUrl();
  }
}
