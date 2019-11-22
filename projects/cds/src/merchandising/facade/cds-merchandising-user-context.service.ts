import { Injectable } from '@angular/core';
import {
  ConverterService,
  ProductSearchService,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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
    // return zip(this.routingService.getRouterState(), this.getFacets())
    return combineLatest([
      this.routingService
        .getRouterState()
        .pipe(
          tap(result => console.log('routingService.getRouterState()', result))
        ),
      this.getFacets().pipe(tap(result => console.log('getFacets()', result))),
    ]).pipe(
      map(([routerState, facets]: [RouterState, string]) => {
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
      tap(searchPageResults =>
        console.log('search page results - ', searchPageResults)
      ),
      map(searchPageResults => searchPageResults.breadcrumbs),
      //filter(Boolean),
      this.converterService.pipeable(MERCHANDISING_FACET_NORMALIZER),
      this.converterService.pipeable(
        MERCHANDISING_FACET_TO_QUERYPARAM_NORMALIZER
      )
    );
  }
}
