/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { WishListFacade } from '@spartacus/cart/wish-list/root';
import { WishListV2BridgeService } from './wish-list-v2-bridge.service';
import { WishListService } from './wish-list.service';

export const facadeProviders: Provider[] = [
  WishListService,
  WishListV2BridgeService,
  {
    provide: WishListFacade,
    useExisting: WishListV2BridgeService,
  },
];
