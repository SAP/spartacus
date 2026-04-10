/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@spartacus/opf/base/root';
import '@spartacus/opf/payment/root';

import { OpfGiftCardSummary, OpfGiftCards } from './opf-gift-card.model';

declare module '@spartacus/cart/base/root' {
  interface Cart {
    opfGiftCards?: OpfGiftCards[];
    opfGiftCardSummary?: OpfGiftCardSummary;
    availableOperations?: CartAvailableOperation[];
  }
}
declare module '@spartacus/order/root' {
  interface Order {
    opfGiftCardSummary?: OpfGiftCardSummary;
  }
}

export interface CartAvailableOperation {
  key: string;
  value: {
    available?: boolean;
    name?: string;
  };
}
