/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CartType } from '@spartacus/cart/base/root';
import { CartActions } from '../actions/index';

@Injectable()
export class MultiCartEffectsService {
  /**
   * Verifies if cart is the active cart or saved cart and returns the appropriate cart type
   * @param action
   * @returns cart type
   */
  getActiveCartTypeOnLoadSuccess(
    action: CartActions.LoadCartSuccess
  ): CartActions.SetCartTypeIndex | undefined {
    if (action?.payload?.extraData?.active) {
      // saved cart is not active cart
      if (action.payload?.cart.saveTime) {
        return new CartActions.SetCartTypeIndex({
          cartType: CartType.ACTIVE,
          cartId: '',
        });
      }
      return new CartActions.SetCartTypeIndex({
        cartType: CartType.ACTIVE,
        cartId: action.meta.entityId as string,
      });
    }
  }
}
