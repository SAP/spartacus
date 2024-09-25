/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { OpfQuickBuyFacade } from '@spartacus/opf/quick-buy/root';
import { OpfQuickBuyTransactionService } from '../services';
import { OpfQuickBuyService } from './opf-quick-buy.service';

export const facadeProviders: Provider[] = [
  OpfQuickBuyTransactionService,
  {
    provide: OpfQuickBuyFacade,
    useExisting: OpfQuickBuyService,
  },
];
