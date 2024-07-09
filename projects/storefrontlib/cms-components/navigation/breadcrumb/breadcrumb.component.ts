/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  CmsBreadcrumbsComponent,
  FeatureConfigService,
  PageMetaService,
  TranslationService,
  useFeatureStyles,
} from '@spartacus/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { PageTitleComponent } from '../page-header/page-title.component';

@Component({
  selector: 'cx-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent
  extends PageTitleComponent
  implements OnInit, OnDestroy
{
  crumbs$: Observable<any[]>;
  protected subscription = new Subscription();

  private router = inject(Router);
  private featureConfigService = inject(FeatureConfigService);

  ariaLiveEnabled = true;

  constructor(
    public component: CmsComponentData<CmsBreadcrumbsComponent>,
    protected pageMetaService: PageMetaService,
    private translation: TranslationService
  ) {
    super(component, pageMetaService);
    useFeatureStyles('a11yTruncatedTextForResponsiveView');
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.setCrumbs();
    if (this.featureConfigService.isEnabled('a11yRepeatedPageTitleFix')) {
      this.subscription.add(
        this.router.events
          .pipe(filter((e) => e instanceof NavigationEnd))
          .subscribe(() => {
            if (document.activeElement === document.body) {
              this.ariaLiveEnabled = false;
              return;
            }
            this.ariaLiveEnabled = true;
          })
      );
    }
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
