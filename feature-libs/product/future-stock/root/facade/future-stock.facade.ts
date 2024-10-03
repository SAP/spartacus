/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { PRODUCT_FUTURE_STOCK_CORE_FEATURE } from '../feature-name';

export function futureStockFacadeFactory() {
  return facadeFactory({
    facade: FutureStockFacade,
    feature: PRODUCT_FUTURE_STOCK_CORE_FEATURE,
    methods: ['getFutureStock'],
  });
}

@Injectable({
  providedIn: 'root',
  useFactory: futureStockFacadeFactory,
})
export abstract class FutureStockFacade {
  /**
   * Get future stock
   */
  abstract getFutureStock(): Observable<any>;
}
