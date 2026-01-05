/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { LAUNCH_CALLER } from '@spartacus/storefront';

declare module '@spartacus/storefront' {
  enum LAUNCH_CALLER {
    CUSTOMER_TICKETING_REOPEN = 'CUSTOMER_TICKETING_REOPEN',
    CUSTOMER_TICKETING_CLOSE = 'CUSTOMER_TICKETING_CLOSE',
    CUSTOMER_TICKETING_CREATE = 'CUSTOMER_TICKETING_CREATE',
  }
}

(LAUNCH_CALLER as any)['CUSTOMER_TICKETING_REOPEN'] =
  'CUSTOMER_TICKETING_REOPEN';
(LAUNCH_CALLER as any)['CUSTOMER_TICKETING_CLOSE'] = 'CUSTOMER_TICKETING_CLOSE';
(LAUNCH_CALLER as any)['CUSTOMER_TICKETING_CREATE'] =
  'CUSTOMER_TICKETING_CREATE';
