/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CartConfig } from '@spartacus/cart/base/root';

export const defaultGiftCardCartConfig: CartConfig = {
  cart: {
    validation: {
      enabled: true,
    },
    selectiveCart: {
      enabled: false,
    },
    showRealTimeStockInPDP: {
      enabled: false,
    },
  },
};
