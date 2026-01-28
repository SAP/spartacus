/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { LAUNCH_CALLER } from '@spartacus/storefront';

declare module '@spartacus/storefront' {
  enum LAUNCH_CALLER {
    CONSIGNMENT_TRACKING = 'CONSIGNMENT_TRACKING',
    REORDER = 'REORDER',
    DOWNLOAD_ORDER_INVOICES = 'DOWNLOAD_ORDER_INVOICES',
    ORDER_ATTACHMENTS = 'ORDER_ATTACHMENTS',
  }
}

(LAUNCH_CALLER as any)['CONSIGNMENT_TRACKING'] = 'CONSIGNMENT_TRACKING';
(LAUNCH_CALLER as any)['REORDER'] = 'REORDER';
(LAUNCH_CALLER as any)['DOWNLOAD_ORDER_INVOICES'] = 'DOWNLOAD_ORDER_INVOICES';
(LAUNCH_CALLER as any)['ORDER_ATTACHMENTS'] = 'ORDER_ATTACHMENTS';
