/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { IconConfig, IconResourceType } from '@spartacus/storefront';

export const opfGiftCardIconConfig: IconConfig = {
  icon: {
    symbols: {
      GIFT_CARD: 'gift-card-icon',
    },
    resources: [
      {
        type: IconResourceType.SVG,
        url: 'assets/icons/opf-gift-card.svg',
        types: ['GIFT_CARD'],
      },
    ],
  },
};
