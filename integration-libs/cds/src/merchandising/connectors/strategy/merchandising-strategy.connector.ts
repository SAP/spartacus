/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { StrategyProducts } from '../../model/strategy-products.model';
import { StrategyRequest } from './../../../cds-models/cds-strategy-request.model';
import { MerchandisingStrategyAdapter } from './merchandising-strategy.adapter';

@Injectable({
  providedIn: 'root',
})
export class MerchandisingStrategyConnector {
  protected strategyAdapter = inject(MerchandisingStrategyAdapter);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  loadProductsForStrategy(
    strategyId: string,
    strategyRequest?: StrategyRequest
  ): Observable<StrategyProducts> {
    return this.strategyAdapter.loadProductsForStrategy(
      strategyId,
      strategyRequest
    );
  }
}
