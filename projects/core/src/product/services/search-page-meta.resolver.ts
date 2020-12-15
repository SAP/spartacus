import { Injectable, Optional } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { PageRobotsMeta } from '../../cms/model/page.model';
import { ContentPageMetaResolver } from '../../cms/page/content-page-meta.resolver';
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
  implements PageMetaResolver, PageTitleResolver, PageRobotsResolver {
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

  /**
   * @deprecated since 3.1 we'll use the contentPageResolver going forward
   */
  constructor(
    routingService: RoutingService,
    productSearchService: ProductSearchService,
    translation: TranslationService
  );
  constructor(
    routingService: RoutingService,
    productSearchService: ProductSearchService,
    translation: TranslationService,
    contentPageResolver?: ContentPageMetaResolver
  );
  constructor(
    protected routingService: RoutingService,
    protected productSearchService: ProductSearchService,
    protected translation: TranslationService,
    @Optional() protected contentPageResolver?: ContentPageMetaResolver
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

  /**
   * Resolves the robot information for the Search Page.
   *
   * This is added in 3.1 and will be ignored if the `ContentPageResolver` is not
   * available.
   */
  resolveRobots(): Observable<PageRobotsMeta[]> {
    return this.contentPageResolver?.resolveRobots();
  }
}
