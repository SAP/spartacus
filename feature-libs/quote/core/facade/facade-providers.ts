/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { QuoteFacade } from '@spartacus/quote/root';
import { QuoteService } from './quote.service';
import { CartAssociatedQuotePurchaseOrderNumberService } from '../services/cart-associated-quote-po-number.service';
import { CartAssociatedQuotePurchaseOrderNumberFacade } from '@spartacus/cart/base/root';

export const facadeProviders: Provider[] = [
  QuoteService,
  {
    provide: QuoteFacade,
    useExisting: QuoteService,
  },
  CartAssociatedQuotePurchaseOrderNumberService,
  {
    provide: CartAssociatedQuotePurchaseOrderNumberFacade,
    useExisting: CartAssociatedQuotePurchaseOrderNumberService,
  },
];
