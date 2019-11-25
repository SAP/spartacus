import { Injectable } from '@angular/core';
import {
  ConverterService,
  ProductSearchPage,
  ProductSearchService,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import {
  MERCHANDISING_FACET_NORMALIZER,
  MERCHANDISING_FACET_TO_QUERYPARAM_NORMALIZER,
} from '../connectors/strategy/converters';
import { MerchandisingUserContext } from '../model/merchandising-user-context.model';

@Injectable({
  providedIn: 'root',
})
export class CdsMerchandisingUserContextService {
  constructor(
    private routingService: RoutingService,
    private productSearchService: ProductSearchService,
    private converterService: ConverterService
  ) {}

  getUserContext(): Observable<MerchandisingUserContext> {
    return combineLatest([
      this.getProductNavigationContext(),
      this.getCategoryNavigationContext(),
      this.getFacets(),
    ]).pipe(
      map(([productId, category, facets]: [string, string, string]) => {
        const userContextData: MerchandisingUserContext = {
          category,
          productId,
          facets,
        };
        return userContextData;
      })
    );
  }

  private getProductNavigationContext(): Observable<String> {
    return this.routingService.getRouterState().pipe(
      map(
        (routerState: RouterState) => routerState.state.params['productCode']
      ),
      distinctUntilChanged()
    );
  }

  private getCategoryNavigationContext(): Observable<String> {
    return this.routingService.getRouterState().pipe(
      map(
        (routerState: RouterState) => routerState.state.params['categoryCode']
      ),
      distinctUntilChanged()
    );
  }

  private getFacets(): Observable<string> {
    return this.productSearchService.getResults().pipe(
      map(
        (searchPageResults: ProductSearchPage) => searchPageResults.breadcrumbs
      ),
      this.converterService.pipeable(MERCHANDISING_FACET_NORMALIZER),
      this.converterService.pipeable(
        MERCHANDISING_FACET_TO_QUERYPARAM_NORMALIZER
      ),
      distinctUntilChanged()
    );
  }
}
