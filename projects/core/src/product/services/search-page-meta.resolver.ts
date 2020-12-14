import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { PageMetaResolver } from '../../cms';
import { TranslationService } from '../../i18n/translation.service';
import { PageType } from '../../model/cms.model';
import { RoutingService } from '../../routing/facade/routing.service';
import { ProductSearchService } from '../facade/product-search.service';

/**
 * Resolves the page data for the Search Result Page based on the
 * `PageType.CATEGORY_PAGE` and the `SearchResultsListPageTemplate` template.
 *
 * Only the page title is resolved in the standard implemenation.
 */
@Injectable({
  providedIn: 'root',
})
export class SearchPageMetaResolver
  extends PageMetaResolver
  implements PageMetaResolver {
  protected total$: Observable<
    number
  > = this.productSearchService.getResults().pipe(
    filter((data) => !!data?.pagination),
    map((results) => results.pagination.totalResults)
  );

  protected query$: Observable<
    string
  > = this.routingService
    .getRouterState()
    .pipe(map((state) => state.state.params['query']));

  constructor(
    protected routingService: RoutingService,
    protected productSearchService: ProductSearchService,
    protected translation: TranslationService
  ) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
    this.pageTemplate = 'SearchResultsListPageTemplate';
  }

  resolveTitle(): Observable<string> {
    const sources = [this.total$, this.query$];
    return combineLatest(sources).pipe(
      switchMap(([t, q]: [number, string]) =>
        this.translation.translate('pageMetaResolver.search.title', {
          count: t,
          query: q,
        })
      )
    );
  }
}
