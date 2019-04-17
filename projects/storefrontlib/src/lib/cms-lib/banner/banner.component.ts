import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BannerComponentService } from './banner.component.service';

@Component({
  selector: 'cx-banner',
  templateUrl: './banner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerComponent {
  constructor(public service: BannerComponentService) {}
}
