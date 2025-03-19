/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { OpfQuickBuyFacade } from '@spartacus/opf/quick-buy/root';
import { OpfQuickBuyService } from './opf-quick-buy.service';

export const facadeProviders: Provider[] = [
  OpfQuickBuyService,
  {
    provide: OpfQuickBuyFacade,
    useExisting: OpfQuickBuyService,
  },
];
