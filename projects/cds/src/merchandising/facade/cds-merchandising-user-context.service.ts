import { Injectable } from '@angular/core';
import {
  ConverterService,
  ProductSearchService,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import {
  MERCHANDISING_FACET_NORMALIZER,
  MERCHANDISING_FACET_TO_QUERYPARAM_NORMALIZER,
} from '../connectors/strategy/converters';
import { MerchandisingUserContext } from '../model/merchandising-user-context.model';

function isSameUserContext(
  previousUserContext: MerchandisingUserContext,
  currentUserContext: MerchandisingUserContext
): boolean {
  console.log(
    'Previous - ',
    previousUserContext,
    ' - Current - ',
    currentUserContext
  );
  return (
    previousUserContext.categoryCode === currentUserContext.categoryCode &&
    previousUserContext.productCode === currentUserContext.productCode
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
        const routerData: MerchandisingUserContext = {
          ...userContext,
          facets,
        };
        console.log('calculated router data - ', routerData);
        return routerData;
      })
    );
  }

  private getNavigationContext(): Observable<MerchandisingUserContext> {
    return this.routingService.getRouterState().pipe(
      tap(routerState => console.log('RouterState - ', routerState)),
      map((routerState: RouterState) => {
        const productCode = routerState.state.params['productCode'];
        const categoryCode = routerState.state.params['categoryCode'];

        const routerData: MerchandisingUserContext = {
          productCode,
          categoryCode,
        };
        return routerData;
      }),
      distinctUntilChanged(isSameUserContext),
      tap(result => console.log('result from getNavigationContext', result))
    );
  }
  private getFacets(): Observable<string> {
    return this.productSearchService.getResults().pipe(
      map(searchPageResults => searchPageResults.breadcrumbs),
      this.converterService.pipeable(MERCHANDISING_FACET_NORMALIZER),
      this.converterService.pipeable(
        MERCHANDISING_FACET_TO_QUERYPARAM_NORMALIZER
      ),
      tap(result => console.log('result from getFacets - ', result)),
      distinctUntilChanged(),
      tap(result =>
        console.log('getFacets - after distinctUntilChanged - ', result)
      )
    );
  }
}
