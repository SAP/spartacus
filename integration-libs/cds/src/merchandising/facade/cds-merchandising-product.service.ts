/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
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
    protected strategyConnector: MerchandisingStrategyConnector,
    protected merchandisingUserContextService: CdsMerchandisingUserContextService,
    protected merchandisingSiteContextService: CdsMerchandisingSiteContextService,
    protected merchandisingSearchContextService: CdsMerchandisingSearchContextService
  ) {}

  loadProductsForStrategy(
    strategyId: string,
    numberToDisplay?: number
  ): Observable<StrategyProducts> {
    return combineLatest([
      this.merchandisingSiteContextService.getSiteContext(),
      this.merchandisingUserContextService.getUserContext(),
      this.merchandisingSearchContextService.getSearchPhrase(),
    ]).pipe(
      debounceTime(0),
      map(
        ([siteContext, userContext, searchPhrase]: [
          MerchandisingSiteContext,
          MerchandisingUserContext,
          string
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
