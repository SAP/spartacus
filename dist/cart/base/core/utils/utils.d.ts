import { Cart } from '@spartacus/cart/base/root';
import { ErrorModel } from '@spartacus/core';
/**
 * Extract cart identifier for current user. Anonymous calls use `guid` and for logged users `code` is used.
 */
export declare function getCartIdByUserId(cart?: Cart, userId?: string): string;
/**
 * Check if cart is selective (save for later) based on id.
 */
export declare function isSelectiveCart(cartId?: string): boolean;
/**
 * Check if the returned error is of type notFound.
 *
 * We additionally check if the cart is not a selective cart.
 * For selective cart this error can happen only when extension is disabled.
 * It should never happen, because in that case, selective cart should also be disabled in our configuration.
 * However if that happens we want to handle these errors silently.
 */
export declare function isCartNotFoundError(error: ErrorModel): boolean;
export declare function voucherExceededError(error: ErrorModel): boolean;
export declare function voucherInvalidError(error: ErrorModel): boolean;
export declare function isVoucherError(error: ErrorModel): boolean;
export declare function isCartError(error: ErrorModel): boolean;
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
export declare function isTempCartId(cartId: string): boolean;
/**
 * Indicates if given cart is empty.
 * Returns true is cart is undefined, null or is an empty object.
 */
export declare function isEmpty(cart?: Cart): boolean;
/**
 * Indicates if given string is matching email pattern
 */
export declare function isEmail(str?: string): boolean;
/**
 * Indicates if a given user is logged in on account different than preceding user account
 */
export declare function isJustLoggedIn(userId: string, previousUserId: string): boolean;
