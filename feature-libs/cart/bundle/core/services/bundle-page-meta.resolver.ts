/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  BreadcrumbMeta,
  PageBreadcrumbResolver,
  PageMetaResolver,
  PageTitleResolver,
  PageType,
  ProductSearchService,
  TranslationService
} from '@spartacus/core';
import {
  combineLatest,
  filter,
  map,
  Observable,
  of,
  switchMap
} from 'rxjs';
import { CartBundleService } from './cart-bundle.service';

@Injectable({
  providedIn: 'root',
})
export class BundlePageMetaResolver
  extends PageMetaResolver
  implements PageTitleResolver, PageBreadcrumbResolver
{
  constructor(
    protected cartBundleService: CartBundleService,
    protected translation: TranslationService,
    protected productSearchService: ProductSearchService
  ) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
    this.pageTemplate = 'SearchResultsListPageTemplate';
  }

  protected total$: Observable<number | undefined> = this.productSearchService
    .getResults()
    .pipe(
      filter((data) => !!data?.pagination),
      map((results) => results.pagination?.totalResults)
    );

  //TODO: Get Bundle Component Name
  protected componet$: Observable<string> = of('Current Bundle');

  resolveTitle(): Observable<string> {
    const sources = [this.total$, this.componet$];
    return combineLatest(sources).pipe(
      switchMap(([count, componentName]) =>
        this.translation.translate('pageMetaResolver.search.title', {
          count,
          query: componentName || 'Current Bundle'
        })
      )
    );
  }

  resolveBreadcrumbs(): Observable<BreadcrumbMeta[]> {
    return combineLatest([
      this.translation.translate('saveForLaterItems.cartTitle'),
      this.translation.translate('common.home'),
    ]).pipe(
      map(([cartLabel, homeLabel]) => {
        const breadcrumbs = [];
        breadcrumbs.push({ label: homeLabel, link: '/' });
        breadcrumbs.push({ label: cartLabel, link: '/cart' });
        return breadcrumbs;
      })
    );
  }
}
