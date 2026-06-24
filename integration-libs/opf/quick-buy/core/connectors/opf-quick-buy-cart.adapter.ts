/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DeliveryMode } from '@spartacus/cart/base/root';
import { Address } from '@spartacus/core';
import { Observable } from 'rxjs';

export abstract class OpfQuickBuyCartAdapter {
  abstract createDeliveryAddress(
    userId: string,
    cartId: string,
    address: Address
  ): Observable<Address>;

  abstract setBillingAddress(
    userId: string,
    cartId: string,
    address: Address
  ): Observable<unknown>;

  abstract getSupportedDeliveryModes(
    userId: string,
    cartId: string
  ): Observable<DeliveryMode[]>;

  abstract setDeliveryMode(
    userId: string,
    cartId: string,
    deliveryModeId: string
  ): Observable<unknown>;
}
