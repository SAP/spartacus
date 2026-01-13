/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  CmsBreadcrumbsComponent,
  PageMetaService,
  TranslationService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { PageTitleComponent } from '../page-header/page-title.component';

@Component({
  selector: 'cx-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class BreadcrumbComponent extends PageTitleComponent implements OnInit {
  crumbs$: Observable<any[]>;

  protected router = inject(Router);

  ariaLive$: Observable<boolean> = this.router.events.pipe(
    filter((e) => e instanceof NavigationEnd),
    map(() => {
      return document.activeElement !== document.body;
    })
  );

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
