/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Cart } from '@spartacus/cart/base/root';
import {
  EMAIL_PATTERN,
  ErrorModel,
  OCC_USER_ID_ANONYMOUS,
} from '@spartacus/core';

/**
 * Extract cart identifier for current user. Anonymous calls use `guid` and for logged users `code` is used.
 */
export function getCartIdByUserId(cart?: Cart, userId?: string): string {
  if (userId === OCC_USER_ID_ANONYMOUS) {
    return cart?.guid ?? '';
  }
  return cart?.code ?? '';
}

/**
 * Check if cart is selective (save for later) based on id.
 */
export function isSelectiveCart(cartId = ''): boolean {
  return cartId.startsWith('selectivecart');
}

/**
 * Check if the returned error is of type notFound.
 *
 * We additionally check if the cart is not a selective cart.
 * For selective cart this error can happen only when extension is disabled.
 * It should never happen, because in that case, selective cart should also be disabled in our configuration.
 * However if that happens we want to handle these errors silently.
 */
export function isCartNotFoundError(error: ErrorModel): boolean {
  return (
    error.reason === 'notFound' &&
    error.subjectType === 'cart' &&
    !isSelectiveCart(error.subject)
  );
}

export function voucherExceededError(error: ErrorModel): boolean {
  return error.message === 'coupon.already.redeemed';
}

export function voucherInvalidError(error: ErrorModel): boolean {
  return error.message === 'coupon.invalid.code.provided';
}

export function isVoucherError(error: ErrorModel): boolean {
  return error.type === 'VoucherOperationError';
}

export function isCartError(error: ErrorModel): boolean {
  return (
    error.type === 'CartError' ||
    error.type === 'CartAddressError' ||
    error.type === 'CartEntryError' ||
    error.type === 'CartEntryGroupError'
  );
}

/**
 * What is a temporary cart?
 * - frontend only cart entity!
 * - can be identified in store by `temp-` prefix with some unique id (multiple carts can be created at the same time eg. active cart, wishlist)
 *
 * Why we need temporary carts?
 * - to have information about cart creation process (meta flags: loading, error - for showing loader, error message)
 * - to know if there is currently a cart creation process in progress (eg. so, we don't create more than one active cart at the same time)
 * - cart identifiers are created in the backend, so those are only known after cart is created
 *
 * Temporary cart life cycle
 * - create cart method invoked
 * - new `temp-${uuid}` cart is created with `loading=true` state
 * - backend returns created cart
 * - normal cart entity is saved under correct id (eg. for logged user under cart `code` key)
 * - temporary cart value is set to backend response (anyone observing this cart can read code/guid from it and switch selector to normal cart)
 * - in next tick temporary cart is removed
 */
export function isTempCartId(cartId: string): boolean {
  return cartId.startsWith('temp-');
}

/**
 * Indicates if given cart is empty.
 * Returns true is cart is undefined, null or is an empty object.
 */
export function isEmpty(cart?: Cart): boolean {
  return !cart || (typeof cart === 'object' && Object.keys(cart).length === 0);
}

/**
 * Indicates if given string is matching email pattern
 */
export function isEmail(str?: string): boolean {
  if (str) {
    return str.match(EMAIL_PATTERN) ? true : false;
  }
  return false;
}

/**
 * Indicates if a given user is logged in on account different than preceding user account
 */
export function isJustLoggedIn(
  userId: string,
  previousUserId: string
): boolean {
  return (
    userId !== OCC_USER_ID_ANONYMOUS && // not logged out
    previousUserId !== userId // *just* logged in / switched to ASM emulation
  );
}
