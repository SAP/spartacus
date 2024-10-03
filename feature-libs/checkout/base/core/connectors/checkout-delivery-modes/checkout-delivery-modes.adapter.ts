/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DeliveryMode } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';

export abstract class CheckoutDeliveryModesAdapter {
  /**
   * Abstract method used to set delivery mode on cart
   *
   * @param userId
   * @param cartId
   * @param deliveryModeId
   */
  abstract setMode(
    userId: string,
    cartId: string,
    deliveryModeId: string
  ): Observable<unknown>;

  /**
   * Abstract method used to get supported delivery modes for cart
   *
   * @param userId
   * @param cartId
   */
  abstract getSupportedModes(
    userId: string,
    cartId: string
  ): Observable<DeliveryMode[]>;

  /**
   * Abstract method used to clear checkout delivery mode
   *
   * @param userId
   * @param cartId
   */
  abstract clearCheckoutDeliveryMode(
    userId: string,
    cartId: string
  ): Observable<unknown>;
}
