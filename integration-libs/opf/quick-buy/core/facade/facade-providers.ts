/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import {
  OpfQuickBuyFacade,
  OpfQuickBuySingleProductCartOptionsFacade,
} from '@spartacus/opf/quick-buy/root';
import { OpfQuickBuyDefaultSingleProductService } from './opf-quick-buy-default-single-product.service';
import { OpfQuickBuyService } from './opf-quick-buy.service';

export const facadeProviders: Provider[] = [
  OpfQuickBuyService,
  {
    provide: OpfQuickBuyFacade,
    useExisting: OpfQuickBuyService,
  },
  OpfQuickBuyDefaultSingleProductService,
  {
    provide: OpfQuickBuySingleProductCartOptionsFacade,
    useExisting: OpfQuickBuyDefaultSingleProductService,
  },
];
