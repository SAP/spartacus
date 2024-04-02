/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import { SavedCartService } from './saved-cart.service';

export const facadeProviders: Provider[] = [
  SavedCartService,
  {
    provide: SavedCartFacade,
    useExisting: SavedCartService,
  },
];
