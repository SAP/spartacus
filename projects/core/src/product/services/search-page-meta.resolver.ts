import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { PageMetaResolver } from '../../cms';
import { PageMeta } from '../../cms/model/page.model';
import { TranslationService } from '../../i18n/translation.service';
import { PageType } from '../../model/cms.model';
import { RoutingService } from '../../routing/facade/routing.service';
import { ProductSearchService } from '../facade/product-search.service';

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
    > = this.productSearchService.getResults().pipe(
      filter(data => !!(data && data.pagination)),
      map(results => results.pagination.totalResults)
    );

    const query$: Observable<
      string
    > = this.routingService.getRouterState().pipe(
      map(state => state.state.params['query']),
      filter(q => !!q)
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
