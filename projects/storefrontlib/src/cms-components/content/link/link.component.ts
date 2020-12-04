import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CmsLinkComponent } from '@spartacus/core';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';

@Component({
  selector: 'cx-link',
  templateUrl: './link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent {
  constructor(public component: CmsComponentData<CmsLinkComponent>) {}

  /**
   * Returns `_blank` to force opening the link in a new window whenever the
   * `data.target` flag is set to rue.
   */
  getTarget(data: CmsLinkComponent): string | null {
    return data.target === 'true' || ((data.target as any) as Boolean) === true
      ? '_blank'
      : null;
  }
}
