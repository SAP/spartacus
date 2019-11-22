import { Injectable } from '@angular/core';
import {
  ConverterService,
  ProductSearchService,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { Observable, zip } from 'rxjs';
import { filter, map } from 'rxjs/operators';
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
    return zip(this.routingService.getRouterState(), this.getFacets()).pipe(
      map(([routerState, facets]: [RouterState, string]) => {
        console.log('In the map method - ', routerState, facets);
        const productCode = routerState.state.params['productCode'];
        const categoryCode = routerState.state.params['categoryCode'];

        const routerData: MerchandisingUserContext = {
          productCode,
          categoryCode,
          facets,
        };
        return routerData;
      })
    );
  }

  private getFacets(): Observable<string> {
    return this.productSearchService.getResults().pipe(
      map(searchPageResults => searchPageResults.breadcrumbs),
      filter(Boolean),
      this.converterService.pipeable(MERCHANDISING_FACET_NORMALIZER),
      this.converterService.pipeable(
        MERCHANDISING_FACET_TO_QUERYPARAM_NORMALIZER
      )
    );
  }
}
