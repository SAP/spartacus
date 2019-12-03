import { Injectable } from '@angular/core';
import {
  ConverterService,
  PageType,
  ProductSearchPage,
  ProductSearchService,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map, withLatestFrom } from 'rxjs/operators';
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

  private getProductNavigationContext(): Observable<string> {
    return this.routingService.getRouterState().pipe(
      map(
        (routerState: RouterState) => routerState.state.params['productCode']
      ),
      distinctUntilChanged()
    );
  }

  private getCategoryNavigationContext(): Observable<string> {
    return this.routingService.getRouterState().pipe(
      map(
        (routerState: RouterState) => routerState.state.params['categoryCode']
      ),
      distinctUntilChanged()
    );
  }

  private isFacetRoute(): Observable<boolean> {
    /**
 * TODO: remove me
 * `routingService.getPageContext()` can even be used instead of 
 * ```ts
 * this.routingService.getRouterState().pipe(
      map(
        (routerState: RouterState) => routerState.state.params['productCode']
      ),
      distinctUntilChanged()
    );
    ```
    and 
    ```ts
     this.routingService.getRouterState().pipe(
      map(
        (routerState: RouterState) => routerState.state.params['categoryCode']
      ),
      distinctUntilChanged()
    );
    ```

    In case of `CATEGORY_PAGE`, the `id` will contain the category ID, _EXCEPT_ in case of brands. So just check for that case.
    E.g. http://localhost:4200/electronics-spa/en/USD/Brands/all/c/brands

 */

    return this.routingService.getPageContext().pipe(
      map(context => {
        if (context.type === PageType.CONTENT_PAGE) {
          return 'search' === context.id;
        }
        return context.type === PageType.CATEGORY_PAGE;
      })
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
      distinctUntilChanged(),
      withLatestFrom(this.isFacetRoute()),
      map(([converted, isFacetPage]) => (isFacetPage ? converted : ''))
    );
  }
}
