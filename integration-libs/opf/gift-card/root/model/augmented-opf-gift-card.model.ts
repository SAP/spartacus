/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@spartacus/opf/base/root';
import '@spartacus/opf/payment/root';

import { GiftCard, GiftCardSummary } from './opf-gift-card.model';

declare module '@spartacus/cart/base/root' {
  interface Cart {
    sapGiftCards?: GiftCard[];
    sapGiftCardSummary?: GiftCardSummary;
    _availableOperations?: {
      [operationId: string]: {
        available?: boolean;
        name?: string;
      };
    };
  }
}
// yet to be decided where to add gift card summary
declare module '@spartacus/order/root' {
  interface Order {
    sapGiftCardSummary?: GiftCardSummary;
  }
}

declare module '@spartacus/core' {
  interface PaymentDetails {
    sapGiftCardSummary?: GiftCardSummary;
  }
}
