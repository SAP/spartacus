import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { BannerComponent } from './banner.component';

@Component({
  selector: 'cx-responsive-banner',
  templateUrl: './responsive-banner.component.html',
  styleUrls: ['./responsive-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResponsiveBannerComponent extends BannerComponent {
  getClass(): string {
    return 'responsive-banner ' + this.service.getComponentUID();
  }

  getImageUrl(): Observable<string> {
    return this.service.getResponsiveImageUrl();
  }

  getResponsiveSrcSet(): Observable<string> {
    return this.service.getResponsiveSrcSet();
  }
}
