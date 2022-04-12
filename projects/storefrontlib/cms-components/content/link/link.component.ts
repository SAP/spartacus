import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { CmsLinkComponent, CmsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';

@Component({
  selector: 'cx-link',
  templateUrl: './link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent {
  @HostBinding('class') styleClasses?: string;

  routerLink?: string | any[];

  data$: Observable<CmsLinkComponent> = this.component.data$.pipe(
    tap((data) => {
      this.setRouterLink(data);
      this.styleClasses = data?.styleClasses;
    })
  );

  constructor(
    protected component: CmsComponentData<CmsLinkComponent>,
    protected cmsService: CmsService
  ) {}

  /**
   * Returns `_blank` to force opening the link in a new window whenever the
   * `data.target` flag is set to `true`.
   */
  getTarget(data: CmsLinkComponent): string | null {
    return data.target === 'true' || data.target === true ? '_blank' : null;
  }

  /**
   * Set routerlink used by generic link if url from CMS data is undefined
   * @param linkData CMSLinkComponent data
   */
  setRouterLink(linkData: CmsLinkComponent): void {
    this.cmsService
      .getRouterLink(linkData)
      .pipe(take(1))
      .subscribe((link) => (this.routerLink = link));
  }
}
