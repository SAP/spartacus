/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  combineLatest,
  concat,
  defer,
  EMPTY,
  from,
  Observable,
} from 'rxjs';
import { debounceTime, map, mergeMap } from 'rxjs/operators';
import {
  MerchandisingUserContext,
  MerchandisingSiteContext,
  StrategyResponse,
  StrategyResponseV2,
  StrategyProducts,
} from '../model';
import { MerchandisingStrategyConnector } from '../connectors';
import { CdsMerchandisingSiteContextService } from './cds-merchandising-site-context.service';
import { CdsMerchandisingUserContextService } from './cds-merchandising-user-context.service';
import { StrategyRequest } from '../../cds-models';

@Injectable({
  providedIn: 'root',
})
export class CdsMerchandisingProductService {
  constructor(
    protected strategyConnector: MerchandisingStrategyConnector,
    protected merchandisingUserContextService: CdsMerchandisingUserContextService,
    protected merchandisingSiteContextService: CdsMerchandisingSiteContextService
  ) {}

  buildStrategyQuery(): Observable<StrategyRequest> {
    return combineLatest([
      this.merchandisingSiteContextService.getSiteContext(),
      this.merchandisingUserContextService.getUserContext(),
    ]).pipe(
      debounceTime(0),
      map(
        ([siteContext, userContext]: [
          MerchandisingSiteContext,
          MerchandisingUserContext
        ]) => {
          return {
            queryParams: {
              ...siteContext,

              products: userContext.products,
              category: userContext.category,
              facets: userContext.facets,
              searchPhrase: userContext.searchPhrase,
            },
            headers: {
              consentReference: userContext.consentReference,
            },
          };
        }
      )
    );
  }

  /**
   * Makes request to strategy service with given parameters
   * @param strategyId
   * @param request
   * @private
   */
  private makeStrategyRequest(
    strategyId: string,
    request: StrategyRequest
  ): Observable<StrategyProducts> {
    return this.strategyConnector.loadProductsForStrategy(strategyId, request);
  }

  /**
   * Makes requests to strategy service producing stream of strategyProducts until subscription does not complete.
   * @param strategyId
   * @param request
   * @private
   */
  private loadStrategyProducts(
    strategyId: string,
    request: StrategyRequest
  ): Observable<StrategyProducts> {
    return defer(() => this.makeStrategyRequest(strategyId, request)).pipe(
      mergeMap((response) => {
        const products$ = from(response.products);
        request.queryParams.pageNumber += 1;
        const next$ =
          //This is arbitrary limit on number of requests made to strategy service.
          request.queryParams.pageNumber > 3
            ? EMPTY
            : this.loadStrategyProducts(strategyId, request);
        return concat(products$, next$);
      })
    );
  }

  /**
   * Makes one or more request to strategy service.
   * Response contains metadata of first response and product stream from all requests.
   * Requests are made as long as products are consumed.
   * @param strategyId
   * @param request
   */
  loadProducts(
    strategyId: string,
    request: StrategyRequest
  ): Observable<StrategyResponseV2> {
    return this.makeStrategyRequest(strategyId, request).pipe(
      map((response) => {
        request.queryParams.pageNumber += 1;
        return {
          products: concat(
            from(response.products),
            this.loadStrategyProducts(strategyId, request)
          ),
          metadata: response.metadata,
        };
      })
    );
  }

  /**
   * Deprecated
   * @param strategyId
   * @param numberToDisplay
   * @deprecated will be removed when tests are updated
   */
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
          MerchandisingUserContext
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
