import { Injectable } from '@angular/core';
import { Observable, of, combineLatest } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import {
  PageMetaResolver,
  PageTitleResolver,
  PageBreadcrumbResolver,
} from '../../cms/page';
import { PageMeta, Page } from '../../cms/model/page.model';
import { TranslationService } from '../../i18n/translation.service';
import { PageType } from '../../model/cms.model';
import { RoutingService } from '../../routing/facade/routing.service';
import { ProductSearchService } from '../../product/facade/product-search.service';
import { AuthService } from '../../auth/facade/auth.service';

@Injectable({
  providedIn: 'root',
})
export class FindProductPageMetaResolver extends PageMetaResolver
  implements PageTitleResolver, PageBreadcrumbResolver {
  totalAndCode$: Observable<[number, any]> = combineLatest([
    this.productSearchService.getResults().pipe(
      filter(data => !!(data && data.pagination)),
      map(results => results.pagination.totalResults)
    ),
    this.routingService.getRouterState().pipe(
      map(state => state.state.queryParams['couponcode']),
      filter(Boolean)
    ),
  ]);

  constructor(
    protected routingService: RoutingService,
    protected productSearchService: ProductSearchService,
    protected translation: TranslationService,
    protected authService: AuthService
  ) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
    this.pageTemplate = 'SearchResultsListPageTemplate';
  }

  /**
   * @deprecated since version 1.3
   *
   * The resolve method is no longer preferred and will be removed with release 2.0.
   * The caller `PageMetaService` service is improved to expect all individual resolvers
   * instead, so that the code is easier extensible.
   */
  resolve(): Observable<PageMeta> {
    return combineLatest([this.resolveTitle(), this.resolveBreadcrumbs()]).pipe(
      map(([title, breadcrumbs]: [string, any[]]) => ({
        title,
        breadcrumbs,
      }))
    );
  }

  resolveBreadcrumbs(): Observable<any[]> {
    const breadcrumbs = [{ label: 'Home', link: '/' }];
    this.authService.isUserLoggedIn().subscribe(login => {
      if (login)
        breadcrumbs.push({ label: 'My Coupons', link: '/my-account/coupons' });
    });

    return of(breadcrumbs);
  }

  resolveTitle(): Observable<string> {
    return this.totalAndCode$.pipe(
      switchMap(([total, code]: [number, string]) =>
        this.translation.translate('pageMetaResolver.search.findProductTitle', {
          count: total,
          coupon: code,
        })
      )
    );
  }

  getScore(page: Page): number {
    let score = 0;
    if (this.pageType) {
      score += page.type === this.pageType ? 1 : -1;
    }
    if (this.pageTemplate) {
      score += page.template === this.pageTemplate ? 1 : -1;
    }
    this.routingService
      .getRouterState()
      .pipe(
        map(state => {
          return state.state.queryParams;
        }),
        filter(Boolean)
      )
      .subscribe((queryParams: any) => {
        if (queryParams) {
          score += queryParams['couponcode'] ? 1 : -1;
        }
      })
      .unsubscribe();
    return score;
  }
}
