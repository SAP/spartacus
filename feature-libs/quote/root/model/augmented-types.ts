/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@spartacus/storefront';
import { QuoteComment } from './quote.model';

declare module '@spartacus/cart/base/root' {
  interface OrderEntry {
    comments?: QuoteComment[];
  }
}

declare module '@spartacus/storefront' {
  const enum LAUNCH_CALLER {
    QUOTE_ACTION_CONFIRMATION = 'QUOTE_ACTION_CONFIRMATION',
  }
}
