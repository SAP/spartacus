/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';

export const defaultGiftCardOccEndpointsConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        applyGiftCard: 'users/${userId}/carts/${cartId}/giftCards',
        removeGiftCard:
          'users/${userId}/carts/${cartId}/giftCards/${giftCardId}',
      },
    },
  },
};
