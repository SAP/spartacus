import { Injectable, Optional } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { debounceTime, map, mergeMap } from 'rxjs/operators';
import { MerchandisingUserContext } from '../model/merchandising-user-context.model';
import { StrategyProducts } from '../model/strategy-products.model';
import { MerchandisingStrategyConnector } from './../connectors/strategy/merchandising-strategy.connector';
import { MerchandisingSiteContext } from './../model/merchandising-site-context.model';
import { CdsMerchandisingSiteContextService } from './cds-merchandising-site-context.service';
import { CdsMerchandisingUserContextService } from './cds-merchandising-user-context.service';
import { CdsMerchandisingSearchContextService } from './cds-merchandising-search-context.service';

@Injectable({
  providedIn: 'root',
})
export class CdsMerchandisingProductService {
  constructor(
    strategyConnector: MerchandisingStrategyConnector,
    merchandisingUserContextService: CdsMerchandisingUserContextService,
    merchandisingSiteContextService: CdsMerchandisingSiteContextService,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    merchandisingSearchContextService?: CdsMerchandisingSearchContextService
  );

  /**
   * @deprecated since 4.3.4
   */
  constructor(
    strategyConnector: MerchandisingStrategyConnector,
    merchandisingUserContextService: CdsMerchandisingUserContextService,
    merchandisingSiteContextService: CdsMerchandisingSiteContextService
  );

  constructor(
    protected strategyConnector: MerchandisingStrategyConnector,
    protected merchandisingUserContextService: CdsMerchandisingUserContextService,
    protected merchandisingSiteContextService: CdsMerchandisingSiteContextService,
    @Optional()
    protected merchandisingSearchContextService?: CdsMerchandisingSearchContextService
  ) {}

  loadProductsForStrategy(
    strategyId: string,
    numberToDisplay?: number
  ): Observable<StrategyProducts> {
    return combineLatest([
      this.merchandisingSiteContextService.getSiteContext(),
      this.merchandisingUserContextService.getUserContext(),
      this.merchandisingSearchContextService
        ? this.merchandisingSearchContextService.getSearchPhrase()
        : of(undefined),
    ]).pipe(
      debounceTime(0),
      map(
        ([siteContext, userContext, searchPhrase]: [
          MerchandisingSiteContext,
          MerchandisingUserContext,
          string | undefined
        ]) => {
          return {
            queryParams: {
              ...siteContext,
              products: userContext.products,
              facets: userContext.facets,
              category: userContext.category,
              pageSize: numberToDisplay,
              searchPhrase: searchPhrase,
            },
            headers: {
              consentReference: userContext.consentReference,
            },
          };
        }
      ),
      mergeMap((context) =>
        this.strategyConnector.loadProductsForStrategy(strategyId, context)
      )
    );
  }
}
