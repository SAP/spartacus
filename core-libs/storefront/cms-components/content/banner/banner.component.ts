/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import {
  CmsBannerComponent,
  CmsService,
  Image,
  ImageGroup,
  PageType,
  SemanticPathService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { GenericLinkComponent } from '../../../shared/components/generic-link/generic-link.component';
import { MediaComponent } from '../../../shared/components/media/media.component';
import { LcpContextDirective } from '../../../shared/lcp-context/lcp-context.directive';

@Component({
  selector: 'cx-banner',
  templateUrl: './banner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LcpContextDirective,
    NgIf,
    GenericLinkComponent,
    MediaComponent,
    AsyncPipe,
  ],
})
export class BannerComponent {
  @HostBinding('class') styleClasses: string | undefined;

  data$: Observable<CmsBannerComponent> = this.component.data$.pipe(
    tap((data) => {
      this.styleClasses = data.styleClasses;
    })
  );

  routerLink$: Observable<string | any[] | undefined> =
    this.component.data$.pipe(
      switchMap((data) => this.resolveRouterLink(data))
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

  protected resolveRouterLink(
    data: CmsBannerComponent
  ): Observable<string | any[] | undefined> {
    if (data.urlLink) {
      return of(data.urlLink);
    } else if (data.contentPage) {
      return this.cmsService
        .getPage({
          id: data.contentPage,
          type: PageType.CONTENT_PAGE,
        })
        .pipe(
          take(1),
          map((page) => page?.label ?? undefined)
        );
    } else if (data.product) {
      return of(
        this.urlService.transform({
          cxRoute: 'product',
          params: { code: data.product },
        })
      );
    } else if (data.category) {
      return of(
        this.urlService.transform({
          cxRoute: 'category',
          params: { code: data.category },
        })
      );
    }
    return of(undefined);
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
    return 'url' in img
      ? (img.altText as string | undefined)
      : Object.values(img)[0]?.altText;
  }

  getLinkAriaLabel(data: CmsBannerComponent): string | undefined {
    const imgAltText = this.getImageAltText(data);

    return data.headline ?? imgAltText;
  }
}
