import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ProductListRouteParams } from './../model/merchandising-search.model';
import {
  ActivatedRouterStateSnapshot,
  RouterState,
  RoutingService,
} from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
/**
 * Provides information about search phrase.
 * The logic was inspired by ProductListComponentService,
 * see https://github.com/SAP/spartacus/blob/develop/projects/storefrontlib/cms-components/product/product-list/container/product-list-component.service.ts#L63
 */
export class CdsMerchandisingSearchContextService {
  protected readonly RELEVANCE_ALLCATEGORIES = ':relevance:allCategories:';

  constructor(protected routing: RoutingService) {}

  getSearchPhrase(): Observable<string> {
    return this.routing.getRouterState().pipe(
      distinctUntilChanged((x, y) => {
        // router emits new value also when the anticipated `nextState` changes
        // but we want to perform search only when current url changes
        return x.state.url === y.state.url;
      }),
      debounceTime(0),
      map((routerState) => (routerState as RouterState).state),
      map((state: ActivatedRouterStateSnapshot) => {
        return (
          state.queryParams.query || this.getQueryFromRouteParams(state.params)
        );
      })
    );
  }

  /**
   * Resolves the search query from the given `ProductListRouteParams`.
   */
  protected getQueryFromRouteParams({
    query,
    categoryCode,
    brandCode,
  }: ProductListRouteParams) {
    if (query) {
      return query;
    }
    if (categoryCode) {
      return this.RELEVANCE_ALLCATEGORIES + categoryCode;
    }

    if (brandCode) {
      return this.RELEVANCE_ALLCATEGORIES + brandCode;
    }
  }
}
