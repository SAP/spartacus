/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { OutletPosition, provideOutlet } from '@spartacus/storefront';
import { PickupInfoModule } from '../../presentational/index';

import { PickupInfoContainerComponent } from './pickup-info-container.component';

@NgModule({
  imports: [CommonModule, PickupInfoModule],
  exports: [PickupInfoContainerComponent],
  declarations: [PickupInfoContainerComponent],
  providers: [
    provideOutlet({
      id: CartOutlets.PICKUP_INFO,
      position: OutletPosition.REPLACE,
      component: PickupInfoContainerComponent,
    }),
  ],
})
export class PickupInfoContainerModule {}
