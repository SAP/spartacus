/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { LAUNCH_CALLER } from '@spartacus/storefront';

declare module '@spartacus/storefront' {
  enum LAUNCH_CALLER {
    CLEAR_CART = 'CLEAR_CART',
    ADDED_TO_CART = 'ADDED_TO_CART',
  }
}
(LAUNCH_CALLER as any)['CLEAR_CART'] = 'CLEAR_CART';
(LAUNCH_CALLER as any)['ADDED_TO_CART'] = 'ADDED_TO_CART';
