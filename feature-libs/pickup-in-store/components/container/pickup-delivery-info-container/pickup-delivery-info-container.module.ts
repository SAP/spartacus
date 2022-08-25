/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { OutletPosition, provideOutlet } from '@spartacus/storefront';
import { CustomerDeliveryInfoModule, PickupDeliveryInfoModule } from '../../presentational/index';

import { PickupDeliveryInfoContainerComponent } from './pickup-delivery-info-container.component';

@NgModule({
  imports: [CommonModule, PickupDeliveryInfoModule, CustomerDeliveryInfoModule],
  exports: [PickupDeliveryInfoContainerComponent],
  declarations: [PickupDeliveryInfoContainerComponent],
  providers: [
    provideOutlet({
      id: CartOutlets.PICKUP_DELIVERY_INFO,
      position: OutletPosition.REPLACE,
      component: PickupDeliveryInfoContainerComponent,
    }),
  ],
})
export class PickupDeliveryInfoContainerModule {}
