/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { QuoteFacade } from 'feature-libs/quote/root/public_api';
import { QuoteService } from './quote.service';

export const facadeProviders: Provider[] = [
  QuoteService,
  {
    provide: QuoteFacade,
    useExisting: QuoteService,
  },
];
