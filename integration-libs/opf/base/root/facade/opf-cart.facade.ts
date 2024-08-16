/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { DeliveryMode } from '@spartacus/cart/base/root';
import { Address, facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OPF_BASE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: OpfCartFacade,
      feature: OPF_BASE_FEATURE,
      methods: [
        'generateOtpKey',
        'createCartDeliveryAddress',
        'setCartBillingAddress',
        'setCartDeliveryAddress',
        'createCartDeliveryAddress',
        'deleteCartDeliveryAddress',
        'getPossibleCartDeliveryModeOptions',
        'getCartDeliveryMode',
        'setCartDeliveryMode',
        'deleteCartDeliveryMode',
      ],
    }),
})
export abstract class OpfCartFacade {
  /**
   * Abstract method used to generate OTP for specified cart id.
   *
   * @param {string} userId
   * @param {string} cartId
   *
   */
  abstract generateOtpKey(
    userId: string,
    cartId: string
  ): Observable<string | undefined | any>;

  /**
   * Abstract method used to set the billing address to the specific cart id.
   *
   * @param {string} userId
   * @param {string} cartId
   * @param {Address} billingAddress
   *
   */
  abstract setCartBillingAddress(
    userId: string,
    cartId: string,
    billingAddress: Address
  ): Observable<Address>;

  /**
   * Abstract method used to assign the delivery address id to the specific cart id.
   *
   * @param {string} userId
   * @param {string} cartId
   * @param {string} addressId
   *
   */
  abstract setCartDeliveryAddress(
    userId: string,
    cartId: string,
    addressId: string
  ): Observable<Address>;

  /**
   * Abstract method used to create the delivery address for the specific cart id.
   *
   * @param {string} userId
   * @param {string} cartId
   * @param {Address} deliveryAddress
   *
   */
  abstract createCartDeliveryAddress(
    userId: string,
    cartId: string,
    deliveryAddress: Address
  ): Observable<Address>;

  /**
   * Abstract method used to delete the delivery address from the specific cart id.
   *
   * @param {string} userId
   * @param {string} cartId
   *
   */
  abstract deleteCartDeliveryAddress(
    userId: string,
    cartId: string
  ): Observable<Address>;

  /**
   * Abstract method used to retrieve delivery modes defined for the current base store and the cart delivery address.
   *
   * @param {string} userId
   * @param {string} cartId
   *
   */
  abstract getPossibleCartDeliveryModeOptions(
    userId: string,
    cartId: string
  ): Observable<DeliveryMode[] | undefined>;

  /**
   * Abstract method used to retrieve information about the delivery mode selected for the cart.
   *
   * @param {string} userId
   * @param {string} cartId
   *
   */
  abstract getCartDeliveryMode(
    userId: string,
    cartId: string
  ): Observable<DeliveryMode | undefined>;

  /**
   * Abstract method used to update the delivery mode details for the cart based on the specified delivery mode identifier.
   *
   * @param {string} userId
   * @param {string} cartId
   * @param {string} deliveryModeId
   *
   */
  abstract setCartDeliveryMode(
    userId: string,
    cartId: string,
    deliveryModeId: string
  ): Observable<DeliveryMode>;

  /**
   * Abstract method used to delete the delivery mode from the cart.
   *
   * @param {string} userId
   * @param {string} cartId
   *
   */
  abstract deleteCartDeliveryMode(
    userId: string,
    cartId: string
  ): Observable<DeliveryMode>;
}
