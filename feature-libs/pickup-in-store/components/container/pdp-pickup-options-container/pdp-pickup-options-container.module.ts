/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { OutletPosition, provideOutlet } from '@spartacus/storefront';
import { PickupOptionsModule } from '../../presentational/index';

import { PdpPickupOptionsContainerComponent } from './pdp-pickup-options-container.component';

@NgModule({
  imports: [CommonModule, PickupOptionsModule],
  exports: [PdpPickupOptionsContainerComponent],
  declarations: [PdpPickupOptionsContainerComponent],
  providers: [
    provideOutlet({
      id: CartOutlets.ADD_TO_CART_PICKUP_OPTION,
      position: OutletPosition.REPLACE,
      component: PdpPickupOptionsContainerComponent,
    }),
  ],
})
export class PdpPickupOptionsContainerModule {}
