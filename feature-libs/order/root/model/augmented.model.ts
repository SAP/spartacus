/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@spartacus/storefront';

declare module '@spartacus/storefront' {
  const enum LAUNCH_CALLER {
    CONSIGNMENT_TRACKING = 'CONSIGNMENT_TRACKING',
    REORDER = 'REORDER',
    DOWNLOAD_ORDER_INVOICES = 'DOWNLOAD_ORDER_INVOICES',
  }
}
