/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { LAUNCH_CALLER } from '@spartacus/storefront';

declare module '@spartacus/storefront' {
  enum LAUNCH_CALLER {
    IMPORT_TO_CART = 'IMPORT_TO_CART',
  }
}

(LAUNCH_CALLER as any)['IMPORT_TO_CART'] = 'IMPORT_TO_CART';
