import { Injectable } from '@angular/core';
import {
  BaseSiteService,
  LanguageService,
  RoutingService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { map, switchMap } from 'rxjs/operators';
import { StrategyRequest } from './../../cds-models/cds-strategy-request.model';
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
    private routingService: RoutingService
  ) {}

  loadProductsForStrategy(
    strategyId: string,
    numberToDisplay?: number
  ): Observable<MerchandisingProducts> {
    return combineLatest([
      this.baseSiteService.getActive(),
      this.languageService.getActive(),
      this.routingService
        .getRouterState()
        .pipe(switchMap(state => of(state.state.params['productCode']))),
    ]).pipe(
      map(([site, language, productId]: [string, string, string]) => {
        const strategyRequest: StrategyRequest = {
          site,
          language,
          pageSize: numberToDisplay,
          productId,
        };
        return strategyRequest;
      }),
      switchMap(context =>
        this.strategyConnector.loadProductsForStrategy(strategyId, context)
      )
    );
  }
}
