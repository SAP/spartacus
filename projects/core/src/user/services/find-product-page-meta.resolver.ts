import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import {
  PageMetaResolver,
  PageTitleResolver,
  PageBreadcrumbResolver,
} from '../../cms';
import { PageMeta, Page } from '../../cms/model/page.model';
import { TranslationService } from '../../i18n/translation.service';
import { PageType } from '../../model/cms.model';
import { RoutingService } from '../../routing';
import { ProductSearchService } from '../../product/facade/product-search.service';

@Injectable({
  providedIn: 'root',
})
export class FindProductPageMetaResolver extends PageMetaResolver
  implements PageTitleResolver, PageBreadcrumbResolver {

    total$: Observable<number> = this.productSearchService.getResults().pipe(
      filter(data => !!(data && data.pagination)),
      map(results => results.pagination.totalResults)
    );
  constructor(
    protected routingService: RoutingService,
    protected productSearchService: ProductSearchService,
    protected translation: TranslationService
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
    return this.productSearchService.getResults().pipe(
      filter(data => !!(data && data.pagination)),
      map(results => results.pagination.totalResults),
      switchMap((_total: number) =>
        combineLatest([
          this.resolveTitle(),
          this.resolveBreadcrumbs(),
        ])
      ),
      map(([title, breadcrumbs]) => ({
        title,
        breadcrumbs,
      }))
    );
  }

  resolveBreadcrumbs(): Observable<any[]> {
    const breadcrumbs = [];
    breadcrumbs.push({ label: 'Home', link: '/' });
    breadcrumbs.push({ label: 'My Coupons', link: '/my-account/coupons' });
    return of(breadcrumbs);
  }


  resolveTitle(): Observable<string> {
    return this.total$.pipe(
      switchMap(total => this.translation.translate('pageMetaResolver.search.findProductTitle',{
        count:total,
      }))
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
        map(state => state.state.params['query']),
        filter(Boolean)
      )
      .subscribe((query: string) => {
        if (query) {
          score += query.match(':relevance:category:1') ? 1 : -1;
        }
      })
      .unsubscribe();
    return score;
  }
}
