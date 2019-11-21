import { Injectable } from '@angular/core';
import {
  BaseSiteService,
  ConverterService,
  CurrencyService,
  LanguageService,
  ProductSearchService,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { combineLatest, Observable, pipe } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { shallowEqualObjects } from '../../utils/compare-equals-objects';
import { StrategyRequest } from './../../cds-models/cds-strategy-request.model';
import {
  MERCHANDISING_FACET_NORMALIZER,
  MERCHANDISING_FACET_TO_QUERYPARAM_NORMALIZER,
} from './../connectors/strategy/converters';
import { MerchandisingStrategyConnector } from './../connectors/strategy/merchandising-strategy.connector';
import { MerchandisingProducts } from './../model/merchandising.products.model';

@Injectable({
  providedIn: 'root',
})
export class CdsMerchandisingProductService {
  constructor(
    protected strategyConnector: MerchandisingStrategyConnector,
    protected baseSiteService: BaseSiteService,
    protected languageService: LanguageService,
    private routingService: RoutingService,
    protected currencyService: CurrencyService,
    private productSearchService: ProductSearchService,
    private converterService: ConverterService
  ) {}

  protected readonly RELEVANCE_CATEGORY = ':relevance:category:';
  protected readonly RELEVANCE_BRAND = ':relevance:brand:';
  protected defaultPageSize = 10;

  loadProductsForStrategy(
    strategyId: string,
    numberToDisplay?: number
  ): Observable<MerchandisingProducts> {
    return combineLatest([
      this.baseSiteService.getActive(),
      this.languageService.getActive(),
      this.routingService.getRouterState(),
      this.getFacets(),
    ]).pipe(
      map(
        ([site, language, routerState, facets]: [
          string,
          string,
          RouterState,
          string
        ]) => {
          const productId = routerState.state.params['productCode'];
          const category = routerState.state.params['categoryCode'];
          const strategyRequest: StrategyRequest = {
            site,
            language,
            pageSize: numberToDisplay,
            productId,
            category,
            facets,
          };
          return strategyRequest;
        }
      ),
      tap(request => console.log('the request we are using - ', request)),
      distinctUntilChanged(
        (current: StrategyRequest, previous: StrategyRequest) =>
          shallowEqualObjects(current, previous)
      ),
      switchMap(context => {
        console.log('attempting to load the products');
        return this.strategyConnector.loadProductsForStrategy(
          strategyId,
          context
        );
      })
    );
  }

  private getFacets(): Observable<string> {
    return this.productSearchService.getResults().pipe(
      tap(results => console.log('product search results - ', results)),
      map(searchPageResults => searchPageResults.breadcrumbs),
      filter(Boolean),
      pipe(this.converterService.pipeable(MERCHANDISING_FACET_NORMALIZER)),
      pipe(
        this.converterService.pipeable(
          MERCHANDISING_FACET_TO_QUERYPARAM_NORMALIZER
        )
      ),
      tap(calculatedFacets =>
        console.log('Calculated facets - ', calculatedFacets)
      )
    );
  }
}
