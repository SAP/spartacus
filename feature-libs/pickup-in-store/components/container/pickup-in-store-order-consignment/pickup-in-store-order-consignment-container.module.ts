/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { OrderOutlets } from '@spartacus/order/root';
import { OutletPosition, provideOutlet } from '@spartacus/storefront';
import { PickupInStoreOrderConsignmentContainerComponent } from './pickup-in-store-order-consignment-container.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  exports: [PickupInStoreOrderConsignmentContainerComponent],
  declarations: [PickupInStoreOrderConsignmentContainerComponent],
  providers: [
    provideOutlet({
      id: OrderOutlets.ORDER_CONSIGNMENT,
      position: OutletPosition.AFTER,
      component: PickupInStoreOrderConsignmentContainerComponent,
    }),
  ],
})
export class OrderConsignmentContainerModule {}
