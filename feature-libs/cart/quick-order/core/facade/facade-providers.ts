/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { QuickOrderFacade } from '@commerce-storefront-toolset/cart/quick-order/root';
import { QuickOrderService } from '../services/quick-order.service';

export const facadeProviders: Provider[] = [
  QuickOrderService,
  {
    provide: QuickOrderFacade,
    useExisting: QuickOrderService,
  },
];
