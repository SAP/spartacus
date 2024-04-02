/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Order } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { OrderAdapter } from './order.adapter';

@Injectable()
export class OrderConnector {
  constructor(protected adapter: OrderAdapter) {}

  public placeOrder(
    userId: string,
    cartId: string,
    termsChecked: boolean
  ): Observable<Order> {
    return this.adapter.placeOrder(userId, cartId, termsChecked);
  }
}
