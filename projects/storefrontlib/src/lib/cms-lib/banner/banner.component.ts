import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CmsBannerComponent } from '@spartacus/core';
import { Observable } from 'rxjs';
import { BannerComponentService } from './banner.component.service';

@Component({
  selector: 'cx-banner',
  templateUrl: './banner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerComponent {
  data$: Observable<CmsBannerComponent> = this.service.component.data$;
  constructor(protected service: BannerComponentService) {}
}
