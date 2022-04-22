import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../auth/user-auth/facade/auth.service';
import { BreadcrumbMeta, Page } from '../../cms/model/page.model';
import {
  PageBreadcrumbResolver,
  PageMetaResolver,
  PageTitleResolver,
} from '../../cms/page';
import { TranslationService } from '../../i18n/translation.service';
import { PageType } from '../../model/cms.model';
import { ProductSearchService } from '../../product/facade/product-search.service';
import { SemanticPathService } from '../../routing/configurable-routes/url-translation/semantic-path.service';

/**
 * Resolves page meta data for the search result page, in case it's used
 * to query coupons. This is done by adding a `couponcode` query parameter
 * to the search page route.
 *
 * The page resolves an alternative page title and breadcrumb.
 */
@Injectable({
  providedIn: 'root',
})
export class CouponSearchPageResolver
  extends PageMetaResolver
  implements PageTitleResolver, PageBreadcrumbResolver
{
  protected total$: Observable<number> = this.productSearchService
    .getResults()
    .pipe(
      filter((data) => !!data?.pagination),
      map((results) => results.pagination.totalResults)
    );

  constructor(
    protected productSearchService: ProductSearchService,
    protected translation: TranslationService,
    protected authService: AuthService,
    protected route: ActivatedRoute,
    protected semanticPathService: SemanticPathService
  ) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
    this.pageTemplate = 'SearchResultsListPageTemplate';
  }

  resolveBreadcrumbs(): Observable<BreadcrumbMeta[]> {
    return combineLatest([
      this.translation.translate('common.home'),
      this.translation.translate('myCoupons.myCoupons'),
      this.authService.isUserLoggedIn(),
    ]).pipe(
      map(([homeLabel, couponLabel, isLoggedIn]: [string, string, boolean]) => {
        const breadcrumbs = [];
        breadcrumbs.push({ label: homeLabel, link: '/' });
        if (isLoggedIn) {
          breadcrumbs.push({
            label: couponLabel,
            link: this.semanticPathService.transform({
              cxRoute: 'coupons',
            }),
          });
        }
        return breadcrumbs;
      })
    );
  }

  resolveTitle(): Observable<string> {
    return this.total$.pipe(
      switchMap((total: number) =>
        this.translation.translate('pageMetaResolver.search.findProductTitle', {
          count: total,
          coupon: this.couponCode,
        })
      )
    );
  }

  getScore(page: Page): number {
    return super.getScore(page) + (this.couponCode ? 1 : -1);
  }

  protected get couponCode(): string {
    return this.route.snapshot?.queryParams?.couponcode;
  }
}
