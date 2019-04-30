import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CmsBannerComponent } from '@spartacus/core';
import { CmsComponentData } from 'projects/storefrontlib/src/cms-structure';

@Component({
  selector: 'cx-banner',
  templateUrl: './banner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerComponent {
  constructor(public component: CmsComponentData<CmsBannerComponent>) {}
}
