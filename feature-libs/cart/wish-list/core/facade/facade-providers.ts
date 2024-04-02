/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { WishListFacade } from '@spartacus/cart/wish-list/root';
import { WishListService } from './wish-list.service';

export const facadeProviders: Provider[] = [
  WishListService,
  {
    provide: WishListFacade,
    useExisting: WishListService,
  },
];
