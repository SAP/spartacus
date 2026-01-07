/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { LAUNCH_CALLER } from '@spartacus/storefront';

declare module '@spartacus/storefront' {
  enum LAUNCH_CALLER {
    ORDER_DOCUMENT_FLOW = 'ORDER_DOCUMENT_FLOW',
  }
}

(LAUNCH_CALLER as any)['ORDER_DOCUMENT_FLOW'] = 'ORDER_DOCUMENT_FLOW';
