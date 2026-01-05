/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuoteComment } from './quote.model';
import { LAUNCH_CALLER } from '@spartacus/storefront';

declare module '@spartacus/cart/base/root' {
  interface OrderEntry {
    comments?: QuoteComment[];
  }
}

declare module '@spartacus/storefront' {
  enum LAUNCH_CALLER {
    QUOTE_ACTION_CONFIRMATION = 'QUOTE_ACTION_CONFIRMATION',
  }
}

(LAUNCH_CALLER as any)['QUOTE_ACTION_CONFIRMATION'] =
  'QUOTE_ACTION_CONFIRMATION';
