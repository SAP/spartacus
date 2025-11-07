/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { debounceTime, map, mergeMap } from 'rxjs/operators';
import {
  MerchandisingUserContext,
  MerchandisingSiteContext,
  StrategyResponse,
} from '../model';
import { MerchandisingStrategyConnector } from '../connectors';
import { CdsMerchandisingSiteContextService } from './cds-merchandising-site-context.service';
import { CdsMerchandisingUserContextService } from './cds-merchandising-user-context.service';

@Injectable({
  providedIn: 'root',
})
export class CdsMerchandisingProductService {
  protected strategyConnector = inject(MerchandisingStrategyConnector);
  protected merchandisingUserContextService = inject(CdsMerchandisingUserContextService);
  protected merchandisingSiteContextService = inject(CdsMerchandisingSiteContextService);


  loadProductsForStrategy(
    strategyId: string,
    numberToDisplay?: number
  ): Observable<StrategyResponse> {
    return combineLatest([
      this.merchandisingSiteContextService.getSiteContext(),
      this.merchandisingUserContextService.getUserContext(),
    ]).pipe(
      debounceTime(0),
      map(
        ([siteContext, userContext]: [
          MerchandisingSiteContext,
          MerchandisingUserContext,
        ]) => {
          return {
            queryParams: {
              ...siteContext,

              products: userContext.products,
              category: userContext.category,
              facets: userContext.facets,
              searchPhrase: userContext.searchPhrase,

              pageSize: numberToDisplay,
            },
            headers: {
              consentReference: userContext.consentReference,
            },
          };
        }
      ),
      mergeMap((request) =>
        this.strategyConnector
          .loadProductsForStrategy(strategyId, request)
          .pipe(map((products) => ({ request, products })))
      )
    );
  }
}
