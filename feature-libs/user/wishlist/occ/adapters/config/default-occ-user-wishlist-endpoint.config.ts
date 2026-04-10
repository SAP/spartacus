/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';

export const defaultOccUserWishlistConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        getUserWishlists: 'users/${userId}/wishlists',
        getWishlistEntries: 'users/${userId}/wishlists/${wishlistId}/entries',
        addWishlistEntry: 'users/${userId}/wishlists/${wishlistId}/entries',
        removeWishlistEntry:
          'users/${userId}/wishlists/${wishlistId}/entries/${entryId}',
      } as any,
    },
  },
};
