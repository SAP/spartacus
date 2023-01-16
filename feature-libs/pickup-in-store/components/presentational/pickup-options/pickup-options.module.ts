/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CartOutlets } from '@spartacus/cart/base/root';
import { I18nModule } from '@spartacus/core';
import { OutletPosition, provideOutlet } from '@spartacus/storefront';
import { PickupOptionsComponent } from './pickup-options.component';

@NgModule({
  imports: [CommonModule, I18nModule, ReactiveFormsModule],
  declarations: [PickupOptionsComponent],
  exports: [PickupOptionsComponent],
  providers: [
    provideOutlet({
      id: CartOutlets.ADD_TO_CART_CONTAINER,
      position: OutletPosition.REPLACE,
      component: PickupOptionsComponent,
    }),
    provideOutlet({
      id: CartOutlets.ITEM_DELIVERY_DETAILS,
      position: OutletPosition.REPLACE,
      component: PickupOptionsComponent,
    }),
  ],
})
export class PickupOptionsModule {}
