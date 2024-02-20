/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { QuoteFacade } from '@spartacus/quote/root';
import { QuoteService } from './quote.service';

export const facadeProviders: Provider[] = [
  QuoteService,
  {
    provide: QuoteFacade,
    useExisting: QuoteService,
  },
];
