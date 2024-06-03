/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Compute wishlist cart name for customer.
 */
export function getWishlistName(customerId: string): string {
  return `wishlist${customerId}`;
}
