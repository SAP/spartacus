import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { PageRobotsMeta } from '../../cms/model/page.model';
import { BasePageMetaResolver } from '../../cms/page/base-page-meta.resolver';
import { PageMetaResolver } from '../../cms/page/page-meta.resolver';
import {
  PageRobotsResolver,
  PageTitleResolver,
} from '../../cms/page/page.resolvers';
import { TranslationService } from '../../i18n/translation.service';
import { PageType } from '../../model/cms.model';
import { RoutingService } from '../../routing/facade/routing.service';
import { ProductSearchService } from '../facade/product-search.service';

/**
 * Resolves the page data for the Search Result Page based on the
 * `PageType.CATEGORY_PAGE` and the `SearchResultsListPageTemplate` template.
 *
 * Only the page title is resolved in the standard implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class SearchPageMetaResolver
  extends PageMetaResolver
  implements PageMetaResolver, PageTitleResolver, PageRobotsResolver
{
  protected total$: Observable<number | undefined> = this.productSearchService
    .getResults()
    .pipe(
      filter((data) => !!data?.pagination),
      map((results) => results.pagination?.totalResults)
    );

  protected query$: Observable<string> = this.routingService
    .getRouterState()
    .pipe(map((state) => state.state.params['query']));

  constructor(
    protected routingService: RoutingService,
    protected productSearchService: ProductSearchService,
    protected translation: TranslationService,
    protected basePageMetaResolver: BasePageMetaResolver
  ) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
    this.pageTemplate = 'SearchResultsListPageTemplate';
  }

  resolveTitle(): Observable<string> {
    const sources = [this.total$, this.query$];
    return combineLatest(sources).pipe(
      switchMap(([count, query]) =>
        this.translation
          .translate('pageMetaResolver.search.default_title')
          .pipe(
            mergeMap((defaultQuery) =>
              this.translation.translate('pageMetaResolver.search.title', {
                count,
                query: query || defaultQuery,
              })
            )
          )
      )
    );
  }

  resolveRobots(): Observable<PageRobotsMeta[]> {
    return this.basePageMetaResolver.resolveRobots();
  }

  /**
   * Resolves the canonical page for the search page.
   *
   * The default options will be used to resolve the url, which means that
   * the all query parameters are removed and https and www are added explicitly.
   */
  resolveCanonicalUrl(): Observable<string> {
    return this.basePageMetaResolver.resolveCanonicalUrl();
  }
}
