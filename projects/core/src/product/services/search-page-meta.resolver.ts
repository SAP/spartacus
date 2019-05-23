import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { RoutingService } from '../../routing/facade/routing.service';
import { ProductSearchService } from '../facade/product-search.service';
import { PageMetaResolver } from '../../cms/page/page-meta.resolver';
import { PageMeta } from '../../cms/model/page.model';
import { PageType } from '../../model/cms.model';
import { TranslationService } from '../../i18n';

@Injectable({
  providedIn: 'root',
})
export class SearchPageMetaResolver extends PageMetaResolver
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
    > = this.productSearchService.getSearchResults().pipe(
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
      switchMap(([total, query]: [number, string]) =>
        this.resolveTitle(total, query)
      ),
      map(title => ({ title }))
    );
  }

  resolveTitle(total: number, query: string): Observable<string> {
    return this.translation.translate('pageMetaResolver.search.title', {
      count: total,
      query: query,
    });
  }
}
