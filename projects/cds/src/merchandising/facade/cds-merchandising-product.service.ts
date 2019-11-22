import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MerchandisingProducts } from '../model/merchandising-products.model';
import { MerchandisingUserContext } from '../model/merchandising-user-context.model';
import { StrategyRequest } from './../../cds-models/cds-strategy-request.model';
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
  ): Observable<MerchandisingProducts> {
    return combineLatest([
      this.merchandisingSiteContextService.getSiteContext(),
      this.merchandisingUserContextService.getUserContext(),
    ]).pipe(
      map(
        ([siteContext, userContext]: [
          MerchandisingSiteContext,
          MerchandisingUserContext
        ]) => {
          const strategyRequest: StrategyRequest = {
            site: siteContext.site,
            language: siteContext.language,
            pageSize: numberToDisplay,
            productId: userContext.productCode,
            category: userContext.categoryCode,
            facets: userContext.facets,
          };
          return strategyRequest;
        }
      ),
      switchMap(context => {
        return this.strategyConnector.loadProductsForStrategy(
          strategyId,
          context
        );
      })
    );
  }
}
