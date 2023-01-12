/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { PickupInStoreActiveCartService } from './facade/pickup-in-store-active-cart.service';

/**
 * A module to override cart features for pickup in store.
 */
@NgModule({
  providers: [
    PickupInStoreActiveCartService,
    { provide: ActiveCartFacade, useExisting: PickupInStoreActiveCartService },
  ],
})
export class PickupInStoreCartModule {}
