import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../auth/facade/auth.service';
import { BreadcrumbMeta, Page } from '../../cms/model/page.model';
import {
  PageBreadcrumbResolver,
  PageMetaResolver,
  PageTitleResolver,
} from '../../cms/page';
import { TranslationService } from '../../i18n/translation.service';
import { PageType } from '../../model/cms.model';
import { ProductSearchService } from '../../product/facade/product-search.service';
import { RoutingService } from '../../routing/facade/routing.service';

@Injectable({
  providedIn: 'root',
})
// TODO: refactor this name, as it's not product related. The getScore method
// indicates it is related to coupons.
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

  resolveBreadcrumbs(): Observable<BreadcrumbMeta[]> {
    // TODO: refactor code below, we should observe the home breadcrumb from
    // the translations and combine this with a stream for the logged in user.
    // Given that the myaccount is only available to logged in uses, we should
    // savely load the coupon breadcrumb without checking if the user is logged
    // in.
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
    let score = super.getScore(page);

    // TODO: refactor the code below, as it will likely miss out on
    // the async loaded data while the resolver is scored.
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
