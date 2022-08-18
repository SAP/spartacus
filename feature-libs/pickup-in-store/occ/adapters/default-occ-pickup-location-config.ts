/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';

/**
 * The endpoints to call from the OCC adapter for pickup locations.
 */
export const defaultOccPickupLocationConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        storeDetails: 'stores/${storeName}',
        patchDeliveryOption:
          'users/${userId}/carts/${cartId}/entries/${entryNumber}',
      },
    },
  },
};
