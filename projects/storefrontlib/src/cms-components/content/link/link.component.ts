import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { CmsLinkComponent } from '@spartacus/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';

@Component({
  selector: 'cx-link',
  templateUrl: './link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent {
  @HostBinding('class') styleClasses: string;

  data$: Observable<CmsLinkComponent> = this.component.data$.pipe(
    tap((data) => (this.styleClasses = data?.styleClasses))
  );

  constructor(protected component: CmsComponentData<CmsLinkComponent>) {}

  /**
   * Returns `_blank` to force opening the link in a new window whenever the
   * `data.target` flag is set to `true`.
   */
  getTarget(data: CmsLinkComponent): string | null {
    return data.target === 'true' || data.target === true ? '_blank' : null;
  }
}
