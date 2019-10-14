import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { PageMetaResolver } from '../../cms';
import { PageMeta, USE_SEPARATE_RESOLVERS } from '../../cms/model/page.model';
import { TranslationService } from '../../i18n/translation.service';
import { PageType } from '../../model/cms.model';
import { RoutingService } from '../../routing/facade/routing.service';
import { ProductSearchService } from '../facade/product-search.service';

@Injectable({
  providedIn: 'root',
})
export class SearchPageMetaResolver extends PageMetaResolver
  implements PageMetaResolver {
  total$: Observable<number> = this.productSearchService.getResults().pipe(
    filter(data => !!(data && data.pagination)),
    map(results => results.pagination.totalResults)
  );

  query$: Observable<string> = this.routingService
    .getRouterState()
    .pipe(map(state => state.state.params['query']));

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
   * The resolve method is no longer preferred and will be removed with release 2.0.
   * The caller `PageMetaService` service is improved to expect all individual resolvers
   * instead, so that the code is easier extensible.
   *
   * @param skip indicates that this method is not used. While this flag is used by the
   * calling `PageMetaService`, it is not ysed by custom subclasses when they call their `super`.
   *
   * @deprecated since version 1.3
   */
  resolve(skip?: boolean): Observable<PageMeta> | any {
    if (skip) {
      return USE_SEPARATE_RESOLVERS;
    }
    return this.resolveTitle();
  }

  /**
   * @deprecated since version 1.3
   * The arguments will get removed with 2.0. They've already made optional in 1.3.
   */
  resolveTitle(
    total?: number,
    query?: string
  ): Observable<{ title: string } | any> {
    if (total && query) {
      return this.translation
        .translate('pageMetaResolver.search.title', {
          count: total,
          query: query,
        })
        .pipe(map(title => title));
    } else {
      return combineLatest([this.total$, this.query$]).pipe(
        switchMap(([t, q]: [number, string]) =>
          this.translation.translate('pageMetaResolver.search.title', {
            count: t,
            query: q,
          })
        ),
        map(title => ({ title }))
      );
    }
  }
}
