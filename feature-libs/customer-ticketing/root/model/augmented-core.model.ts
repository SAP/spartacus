/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@spartacus/storefront';

declare module '@spartacus/storefront' {
  const enum LAUNCH_CALLER {
    CUSTOMER_TICKETING_REOPEN = 'CUSTOMER_TICKETING_REOPEN',
    CUSTOMER_TICKETING_CLOSE = 'CUSTOMER_TICKETING_CLOSE',
    CUSTOMER_TICKETING_CREATE = 'CUSTOMER_TICKETING_CREATE',
  }
}
