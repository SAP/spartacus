/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { DeliveryMode } from '@spartacus/cart/base/root';
import { Address } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OpfCartAdapter } from './opf-cart.adapter';

@Injectable()
export class OpfCartConnector {
  constructor(protected adapter: OpfCartAdapter) {}

  public generateOtpKey(
    userId: string,
    cartId: string
  ): Observable<string | undefined> {
    return this.adapter.generateOtpKey(userId, cartId);
  }

  public setCartBillingAddress(
    userId: string,
    cartId: string,
    billingAddress: Address
  ): Observable<Address> {
    return this.adapter.setCartBillingAddress(userId, cartId, billingAddress);
  }

  public setCartDeliveryAddress(
    userId: string,
    cartId: string,
    addressId: string
  ): Observable<Address> {
    return this.adapter.setCartDeliveryAddress(userId, cartId, addressId);
  }

  public createCartDeliveryAddress(
    userId: string,
    cartId: string,
    deliveryAddress: Address
  ): Observable<Address> {
    return this.adapter.createCartDeliveryAddress(
      userId,
      cartId,
      deliveryAddress
    );
  }

  public deleteCartDeliveryAddress(
    userId: string,
    cartId: string
  ): Observable<Address> {
    return this.adapter.deleteCartDeliveryAddress(userId, cartId);
  }

  public getPossibleCartDeliveryModeOptions(
    userId: string,
    cartId: string
  ): Observable<DeliveryMode[] | undefined> {
    return this.adapter.getPossibleCartDeliveryModeOptions(userId, cartId);
  }

  public getCartDeliveryMode(
    userId: string,
    cartId: string
  ): Observable<DeliveryMode | undefined> {
    return this.adapter.getCartDeliveryMode(userId, cartId);
  }

  public setCartDeliveryMode(
    userId: string,
    cartId: string,
    deliveryModeId: string
  ): Observable<DeliveryMode> {
    return this.adapter.setCartDeliveryMode(userId, cartId, deliveryModeId);
  }

  public deleteCartDeliveryMode(
    userId: string,
    cartId: string
  ): Observable<DeliveryMode> {
    return this.adapter.deleteCartDeliveryMode(userId, cartId);
  }
}
