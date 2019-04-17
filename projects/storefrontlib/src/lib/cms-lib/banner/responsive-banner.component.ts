import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BannerComponent } from './banner.component';

@Component({
  selector: 'cx-responsive-banner',
  templateUrl: './responsive-banner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResponsiveBannerComponent extends BannerComponent {
  getClass(): string {
    const RESPONSIVE_BANNER_CLASS = 'responsive-banner';
    return `${RESPONSIVE_BANNER_CLASS} ${this.service.getComponentUID()}`;
  }
}
