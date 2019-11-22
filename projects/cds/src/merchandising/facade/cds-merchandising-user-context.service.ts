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

function isSameUserContext(
  previous: MerchandisingUserContext,
  current: MerchandisingUserContext
): boolean {
  return (
    previous.category === current.category &&
    previous.productId === current.productId
  );
}

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
    return combineLatest([this.getNavigationContext(), this.getFacets()]).pipe(
      map(([userContext, facets]: [MerchandisingUserContext, string]) => {
        const userContextData: MerchandisingUserContext = {
          ...userContext,
          facets,
        };
        return userContextData;
      })
    );
  }

  private getNavigationContext(): Observable<MerchandisingUserContext> {
    return this.routingService.getRouterState().pipe(
      map((routerState: RouterState) => {
        const productCode = routerState.state.params['productCode'];
        const categoryCode = routerState.state.params['categoryCode'];

        const routerData: MerchandisingUserContext = {
          productId: productCode,
          category: categoryCode,
        };
        return routerData;
      }),
      distinctUntilChanged(isSameUserContext)
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
