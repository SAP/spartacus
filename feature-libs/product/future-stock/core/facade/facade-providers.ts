/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { FutureStockFacade } from '@spartacus/product/future-stock/root';
import { FutureStockService } from '../services/future-stock.service';

export const facadeProviders: Provider[] = [
  FutureStockService,
  {
    provide: FutureStockFacade,
    useExisting: FutureStockService,
  },
];
