/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, switchMap, take } from 'rxjs';
import { CdsEndpointsService } from '../../../services/cds-endpoints.service';
import { MerchandisingStrategyAdapter } from '../../connectors/strategy/merchandising-strategy.adapter';
import { StrategyProducts } from '../../model/strategy-products.model';
import { StrategyRequest } from './../../../cds-models/cds-strategy-request.model';
import { BaseSiteService } from '@spartacus/core';

const STRATEGY_PRODUCTS_ENDPOINT_KEY = 'strategyProducts';

@Injectable()
export class CdsMerchandisingStrategyAdapter
  implements MerchandisingStrategyAdapter
{
  private cdsEndpointsService = inject(CdsEndpointsService);
  private baseSiteService = inject(BaseSiteService);
  protected http = inject(HttpClient);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  loadProductsForStrategy(
    strategyId: string,
    strategyRequest: StrategyRequest = {}
  ): Observable<StrategyProducts> {
    let headers: HttpHeaders = new HttpHeaders();
    if (strategyRequest.headers && strategyRequest.headers.consentReference) {
      headers = headers.set(
        'consent-reference',
        strategyRequest.headers.consentReference
      );
    }
    return this.baseSiteService.getActive().pipe(
      take(1),
      switchMap((baseSite) =>
        this.http.get(
          this.cdsEndpointsService.getUrl(
            STRATEGY_PRODUCTS_ENDPOINT_KEY,
            {
              baseSite,
              strategyId,
            },
            strategyRequest.queryParams
          ),
          { headers }
        )
      )
    );
  }
}
