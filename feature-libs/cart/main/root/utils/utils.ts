import { ErrorModel } from '@spartacus/core';

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
