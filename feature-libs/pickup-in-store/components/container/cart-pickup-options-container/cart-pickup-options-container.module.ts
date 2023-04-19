/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { OutletPosition, provideOutlet } from '@spartacus/storefront';
import { PickupOptionsModule } from '../../presentational/index';

import { CartPickupOptionsContainerComponent } from './cart-pickup-options-container.component';

@NgModule({
  imports: [CommonModule, PickupOptionsModule],
  exports: [CartPickupOptionsContainerComponent],
  declarations: [CartPickupOptionsContainerComponent],
  providers: [
    provideOutlet({
      id: CartOutlets.ITEM_DELIVERY_DETAILS,
      position: OutletPosition.REPLACE,
      component: CartPickupOptionsContainerComponent,
    }),
  ],
})
export class CartPickupOptionsContainerModule {}
