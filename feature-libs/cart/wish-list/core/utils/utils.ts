/**
 * Compute wishlist cart name for customer.
 */
export function getWishlistName(customerId: string): string {
  return `wishlist${customerId}`;
}
