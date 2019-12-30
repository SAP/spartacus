import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { debounceTime, map, mergeMap, startWith } from 'rxjs/operators';
import { MerchandisingUserContext } from '../model/merchandising-user-context.model';
import { StrategyProducts } from '../model/strategy-products.model';
import { MerchandisingStrategyConnector } from './../connectors/strategy/merchandising-strategy.connector';
import { MerchandisingSiteContext } from './../model/merchandising-site-context.model';
import { CdsMerchandisingSiteContextService } from './cds-merchandising-site-context.service';
import { CdsMerchandisingUserContextService } from './cds-merchandising-user-context.service';

@Injectable({
  providedIn: 'root',
})
export class CdsMerchandisingProductService {
  constructor(
    protected strategyConnector: MerchandisingStrategyConnector,
    protected merchandisingUserContextService: CdsMerchandisingUserContextService,
    protected merchandisingSiteContextService: CdsMerchandisingSiteContextService
  ) {}

  loadProductsForStrategy(
    strategyId: string,
    numberToDisplay?: number
  ): Observable<StrategyProducts> {
    return combineLatest([
      this.merchandisingSiteContextService.getSiteContext(),
      this.merchandisingUserContextService.getUserContext().pipe(startWith({})),
    ]).pipe(
      debounceTime(0),
      map(
        ([siteContext, userContext]: [
          MerchandisingSiteContext,
          MerchandisingUserContext
        ]) => {
          return {
            ...siteContext,
            ...userContext,
            pageSize: numberToDisplay,
          };
        }
      ),
      mergeMap(context =>
        this.strategyConnector.loadProductsForStrategy(strategyId, context)
      )
    );
  }
}
