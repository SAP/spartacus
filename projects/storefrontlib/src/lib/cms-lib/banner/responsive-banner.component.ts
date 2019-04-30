import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BannerComponent } from './banner.component';

@Component({
  selector: 'cx-responsive-banner',
  templateUrl: './banner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResponsiveBannerComponent extends BannerComponent {}
