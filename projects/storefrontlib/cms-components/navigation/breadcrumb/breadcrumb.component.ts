/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AsyncPipe,
  isPlatformBrowser,
  NgFor,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import {
  CmsBreadcrumbsComponent,
  PageMetaService,
  TranslatePipe,
  TranslationService,
} from '@spartacus/core';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { PageTitleComponent } from '../page-header/page-title.component';

@Component({
  selector: 'cx-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgFor, RouterLink, AsyncPipe, TranslatePipe],
})
export class BreadcrumbComponent extends PageTitleComponent implements OnInit {
  crumbs$: Observable<any[]>;
  private platformId = inject(PLATFORM_ID);

  protected router = inject(Router);

  // Skip router event subscription during SSR - aria-live is browser-specific
  ariaLive$: Observable<boolean> = isPlatformBrowser(this.platformId)
    ? this.router.events.pipe(
        filter((e) => e instanceof NavigationEnd),
        map(() => {
          return document.activeElement !== document.body;
        })
      )
    : of(false);

  constructor(
    public component: CmsComponentData<CmsBreadcrumbsComponent>,
    protected pageMetaService: PageMetaService,
    private translation: TranslationService
  ) {
    super(component, pageMetaService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.setCrumbs();
  }

  private setCrumbs(): void {
    this.crumbs$ = combineLatest([
      this.pageMetaService.getMeta(),
      this.translation.translate('common.home'),
    ]).pipe(
      map(([meta, textHome]) =>
        meta?.breadcrumbs ? meta.breadcrumbs : [{ label: textHome, link: '/' }]
      )
    );
  }
}
