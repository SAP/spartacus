/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { DeliveryMode } from '@spartacus/cart/base/root';
import { Address } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OpfQuickBuyCartAdapter } from './opf-quick-buy-cart.adapter';

@Injectable()
export class OpfQuickBuyCartConnector {
  protected adapter = inject(OpfQuickBuyCartAdapter);

  createDeliveryAddress(
    userId: string,
    cartId: string,
    address: Address
  ): Observable<Address> {
    return this.adapter.createDeliveryAddress(userId, cartId, address);
  }

  setBillingAddress(
    userId: string,
    cartId: string,
    address: Address
  ): Observable<unknown> {
    return this.adapter.setBillingAddress(userId, cartId, address);
  }

  getSupportedDeliveryModes(
    userId: string,
    cartId: string
  ): Observable<DeliveryMode[]> {
    return this.adapter.getSupportedDeliveryModes(userId, cartId);
  }

  setDeliveryMode(
    userId: string,
    cartId: string,
    deliveryModeId: string
  ): Observable<unknown> {
    return this.adapter.setDeliveryMode(userId, cartId, deliveryModeId);
  }

  getSelectedDeliveryMode(
    userId: string,
    cartId: string
  ): Observable<DeliveryMode | undefined> {
    return this.adapter.getSelectedDeliveryMode(userId, cartId);
  }
}
