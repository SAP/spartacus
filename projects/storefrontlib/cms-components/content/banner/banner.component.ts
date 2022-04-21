import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import {
  CmsBannerComponent,
  CmsService,
  PageType,
  SemanticPathService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';

@Component({
  selector: 'cx-banner',
  templateUrl: './banner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerComponent {
  @HostBinding('class') styleClasses?: string;

  routerLink: string | any[] | undefined;

  data$: Observable<CmsBannerComponent> = this.component.data$.pipe(
    tap((data) => {
      this.setRouterLink(data);
      this.styleClasses = data.styleClasses;
    })
  );

  constructor(
    protected component: CmsComponentData<CmsBannerComponent>,
    protected urlService: SemanticPathService,
    protected cmsService: CmsService
  ) {}

  /**
   * Returns `_blank` to force opening the link in a new window whenever the
   * `data.external` flag is set to true.
   */
  getTarget(data: CmsBannerComponent): string | null {
    return data.external === 'true' || data.external === true ? '_blank' : null;
  }

  protected setRouterLink(data: CmsBannerComponent): void {
    if (data.urlLink) {
      this.routerLink = data.urlLink;
    } else if (data.contentPage) {
      this.cmsService
        .getPage({
          id: data.contentPage,
          type: PageType.CONTENT_PAGE,
        })
        .pipe(take(1))
        .subscribe((page) => {
          this.routerLink = page.label;
        });
    } else if (data.product) {
      this.routerLink = this.urlService.transform({
        cxRoute: 'product',
        params: { code: data.product },
      });
    } else if (data.category) {
      this.routerLink = this.urlService.transform({
        cxRoute: 'category',
        params: { code: data.category },
      });
    }
  }
}
