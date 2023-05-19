/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Order } from '@spartacus/order/root';
import { Observable } from 'rxjs';
import { OpfOrderAdapter } from './opf-order.adapter';

@Injectable()
export class OpfOrderConnector {
  constructor(protected adapter: OpfOrderAdapter) {}

  public placeOpfOrder(
    userId: string,
    cartId: string,
    termsChecked: boolean
  ): Observable<Order> {
    return this.adapter.placeOpfOrder(userId, cartId, termsChecked);
  }
}
