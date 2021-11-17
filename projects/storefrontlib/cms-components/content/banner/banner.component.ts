import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { CmsBannerComponent } from '@spartacus/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';

@Component({
  selector: 'cx-banner',
  templateUrl: './banner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerComponent {
  @HostBinding('class') styleClasses: string;

  data$: Observable<CmsBannerComponent> = this.component.data$.pipe(
    tap((data) => (this.styleClasses = data.styleClasses))
  );

  constructor(protected component: CmsComponentData<CmsBannerComponent>) {}

  /**
   * Returns `_blank` to force opening the link in a new window whenever the
   * `data.external` flag is set to true.
   */
  getTarget(data: CmsBannerComponent): string | null {
    return data.external === 'true' || data.external === true ? '_blank' : null;
  }
}
