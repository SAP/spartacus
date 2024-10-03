/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FutureStockFacade } from '@spartacus/product/future-stock/root';
import {
  OCC_USER_ID_ANONYMOUS,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { FutureStockConnector } from '../connectors';
import { ProductFutureStock } from '../model';

@Injectable()
export class FutureStockService implements FutureStockFacade {
  protected readonly PRODUCT_KEY = 'productCode';

  protected futureStockState$: Observable<ProductFutureStock | undefined> =
    this.routingService.getRouterState().pipe(
      withLatestFrom(this.userIdService.takeUserId()),
      switchMap(([{ state }, userId]) => {
        if (userId !== OCC_USER_ID_ANONYMOUS) {
          return this.futureStockConnector.getFutureStock(
            userId,
            state.params[this.PRODUCT_KEY]
          );
        }
        return of(undefined);
      })
    );
  /**
   * Get future stock
   */
  getFutureStock(): Observable<ProductFutureStock | undefined> {
    return this.futureStockState$;
  }

  constructor(
    protected userIdService: UserIdService,
    protected futureStockConnector: FutureStockConnector,
    protected routingService: RoutingService
  ) {}
}
