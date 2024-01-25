/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { OrderEntry } from '@spartacus/cart/base/root';
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
        'getPickupEntries',
        'getDeliveryEntries',
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
  /**
   * Return order's pickup entries
   */
  abstract getPickupEntries(): Observable<OrderEntry[]>;

  /**
   * Return order's delivery entries
   */
  abstract getDeliveryEntries(): Observable<OrderEntry[]>;
}
