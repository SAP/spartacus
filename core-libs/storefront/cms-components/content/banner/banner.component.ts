/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
} from '@angular/core';
import {
  CmsBannerComponent,
  CmsService,
  FeatureToggles,
  Image,
  ImageGroup,
  PageType,
  SemanticPathService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
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
  routerLink: string | any[] | undefined;

  @HostBinding('class') styleClasses: string | undefined;

  private featureToggles = inject(FeatureToggles);
  protected el = inject(ElementRef);

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

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.featureToggles.a11yOrgAdminTileArrowKeyNavigation) {
      return;
    }
    if (
      event.key !== 'ArrowRight' &&
      event.key !== 'ArrowLeft' &&
      event.key !== 'ArrowDown' &&
      event.key !== 'ArrowUp'
    ) {
      return;
    }
    this.navigateSiblings(event);
  }

  protected navigateSiblings(event: KeyboardEvent): void {
    const parent = this.el.nativeElement.parentElement;
    if (!parent) {
      return;
    }
    const siblings: HTMLElement[] = Array.from(
      parent.querySelectorAll('cx-banner')
    );
    const currentIndex = siblings.indexOf(this.el.nativeElement);
    if (currentIndex === -1) {
      return;
    }
    const isForward = event.key === 'ArrowRight' || event.key === 'ArrowDown';
    const nextIndex = isForward ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex < 0 || nextIndex >= siblings.length) {
      return;
    }
    event.preventDefault();
    const focusTarget = siblings[nextIndex].querySelector<HTMLElement>(
      'a, button, [tabindex]'
    );
    focusTarget?.focus();
  }

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
