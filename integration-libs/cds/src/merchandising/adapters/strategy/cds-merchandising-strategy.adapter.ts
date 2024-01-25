/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CdsEndpointsService } from '../../../services/cds-endpoints.service';
import { MerchandisingStrategyAdapter } from '../../connectors/strategy/merchandising-strategy.adapter';
import { StrategyProducts } from '../../model/strategy-products.model';
import { StrategyRequest } from './../../../cds-models/cds-strategy-request.model';

const STRATEGY_PRODUCTS_ENDPOINT_KEY = 'strategyProducts';

@Injectable()
export class CdsMerchandisingStrategyAdapter
  implements MerchandisingStrategyAdapter
{
  constructor(
    private cdsEndpointsService: CdsEndpointsService,
    protected http: HttpClient
  ) {}

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
    return this.http.get(
      this.cdsEndpointsService.getUrl(
        STRATEGY_PRODUCTS_ENDPOINT_KEY,
        {
          strategyId,
        },
        strategyRequest.queryParams
      ),
      { headers }
    );
  }
}
