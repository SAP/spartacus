/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import {
  CmsBannerComponent,
  CmsService,
  Image,
  ImageGroup,
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
  routerLink: string | any[] | undefined;

  @HostBinding('class') styleClasses: string | undefined;

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
          this.routerLink = page?.label;
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

  spike_isLCP(data: CmsBannerComponent): boolean {
    const text = data.name ?? '';
    const spike_LCP_HOMEPAGE_component_names = [
      'Electronics Homepage Splash Banner Component',
      // 'Site Logo Component',
      // 'Electronics Homepage Discount Banner Component',
      // 'Electronics Homepage Light Family Banner Component',
      // 'Electronics Homepage Light Family Text Banner Component',
    ]; // SPIKE HARDCODED VALUES
    const isLCP = spike_LCP_HOMEPAGE_component_names.some((name) =>
      text.includes(name)
    );
    console.log('<cx-banner> SPIKE NEW: isLCP', isLCP, text); // SPIKE NEW
    return isLCP;
  }

  getImage(data: CmsBannerComponent): Image | ImageGroup | undefined {
    if (data.media) {
      if ('url' in data.media) {
        return data.media as Image;
      } else {
        return data.media as ImageGroup;
      }
    }
  }

  getImageAltText(data: CmsBannerComponent): string | undefined {
    const img = this.getImage(data);
    if (!img) {
      return;
    }

    // assuming all media formats share the same alt text
    return 'url' in img ? img.altText : Object.values(img)[0]?.altText;
  }

  getLinkAriaLabel(data: CmsBannerComponent): string | undefined {
    const imgAltText = this.getImageAltText(data);

    return data.headline ?? imgAltText;
  }
}
