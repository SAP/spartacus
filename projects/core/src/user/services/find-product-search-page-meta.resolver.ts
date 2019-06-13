import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { PageMetaResolver } from '../../cms';
import { PageMeta, Page } from '../../cms/model/page.model';
import { TranslationService } from '../../i18n/translation.service';
import { PageType } from '../../model/cms.model';
import { RoutingService } from '../../routing';
import { ProductSearchService } from '../../product/facade/product-search.service';

@Injectable({
  providedIn: 'root',
})
export class FindProductSearchPageMetaResolver extends PageMetaResolver
  implements PageMetaResolver {
  constructor(
    protected routingService: RoutingService,
    protected productSearchService: ProductSearchService,
    protected translation: TranslationService
  ) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
    this.pageTemplate = 'SearchResultsListPageTemplate';
  }

  resolve(): Observable<PageMeta> {
    const total$: Observable<
      number
    > = this.productSearchService.getResults().pipe(
      filter(data => !!(data && data.pagination)),
      map(results => results.pagination.totalResults)
    );

    const query$: Observable<
      string
    > = this.routingService.getRouterState().pipe(
      map(state => state.state.params['query']),
      filter(Boolean)
    );

    return combineLatest([total$, query$]).pipe(
      switchMap(
        ([total, query]: [number, string]) =>
        [
          this.resolveTitle(total, query),
          this.resolveBreadcrumbs(total, query)
        ]

      ),
      map([title, breadcrumbs] => ({ title, breadcrumbs }))
    );

    // return of([this.resolveTitle(total, query),
    //   this.resolveBreadcrumbs(total, query)])
    // return combineLatest([total$, query$]).pipe(
    //   switchMap(([total, query]: [number, string]) => {
    //     this.resolveTitle(total, query);
    //     this.resolveBreadcrumbs(total, query);
    //   }),
    //   map(title, breadcrumbs => ({ title, breadcrumbs }))
    // );
  }

  resolveBreadcrumbs(_total: number, _query: string): Observable<any[]> {
    const breadcrumbs = [];
    breadcrumbs.push({ label: 'Home', link: '/' });

    return of(breadcrumbs);
  }

  resolveTitle(total: number, query: string): Observable<string> {
    if (!query.match(':relevance:category:1')) {
      return this.translation.translate('pageMetaResolver.search.title', {
        count: total,
        query: query,
      });
    } else {
      return this.translation.translate(
        'pageMetaResolver.search.findProductTitle',
        {
          count: total,
        }
      );
    }
  }

  getScore(page: Page): number {
    let score = 0;

    if (this.pageType) {
      score += page.type === this.pageType ? 1 : -1;
    }
    if (this.pageTemplate) {
      score += page.template === this.pageTemplate ? 1 : -1;
    }

    const query$: Observable<
      string
    > = this.routingService.getRouterState().pipe(
      map(state => state.state.params['query']),
      filter(Boolean)
    );

    let couponQuery;
    query$.subscribe(
      query => (couponQuery = query.match(':relevance:category:1'))
    );

    if (couponQuery) {
      score = score + 1;
    }

    return score;
  }
}
