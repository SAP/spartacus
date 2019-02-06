import { Component, ChangeDetectionStrategy } from '@angular/core';

import { BannerComponentService } from './banner.component.service';

@Component({
  selector: 'cx-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerComponent {
  constructor(public service: BannerComponentService) {}
}
