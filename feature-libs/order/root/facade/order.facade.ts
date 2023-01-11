/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ORDER_CORE_FEATURE } from '../feature-name';
import { Order } from '../model/order.model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: OrderFacade,
      feature: ORDER_CORE_FEATURE,
      methods: [
        'getOrderDetails',
        'clearPlacedOrder',
        'setPlacedOrder',
        'placeOrder',
      ],
    }),
})
export abstract class OrderFacade {
  /**
   * Returns the current order
   */
  abstract getOrderDetails(): Observable<Order | undefined>;
  /**
   * Clears the current order
   */
  abstract clearPlacedOrder(): void;
  /**
   * Sets the provided order as current
   */
  abstract setPlacedOrder(order: Order): void;
  /**
   * Places an order
   */
  abstract placeOrder(termsChecked: boolean): Observable<Order>;
}
