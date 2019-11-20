import { Injectable } from '@angular/core';
import { BaseSiteService, LanguageService } from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
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
    protected languageService: LanguageService
  ) {}

  loadProductsForStrategy(
    strategyId: string,
    numberToDisplay?: number
  ): Observable<MerchandisingProducts> {
    return combineLatest([
      this.baseSiteService.getActive(),
      this.languageService.getActive(),
    ]).pipe(
      map(([site, language]: [string, string]) => {
        const strategyRequest: StrategyRequest = {
          site,
          language,
          pageSize: numberToDisplay,
        };
        return strategyRequest;
      }),
      switchMap(context =>
        this.strategyConnector.loadProductsForStrategy(strategyId, context)
      )
    );
  }
}
