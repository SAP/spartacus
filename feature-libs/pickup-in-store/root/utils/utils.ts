/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Cart } from '@spartacus/cart/base/root';
import { CartWithIdAndUserId } from './type-utils';

export const getProperty = (
  o: Record<string, any> | undefined | null,
  property: string
): any | null => {
  if (!o) {
    return null;
  }
  if (o.hasOwnProperty(property)) {
    return o[property];
  }
  return null;
};

/** Custom type guard to ensure we have a cart with the required ids for pickup in store */
export function cartWithIdAndUserId(
  cart: Cart | undefined
): cart is CartWithIdAndUserId {
  return (
    !!cart &&
    cart.guid !== undefined &&
    cart.user !== undefined &&
    cart.user.uid !== undefined &&
    cart.code !== undefined
  );
}
