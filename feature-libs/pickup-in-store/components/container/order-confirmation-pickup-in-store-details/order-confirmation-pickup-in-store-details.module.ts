/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import { PickUpItemsDetailsModule } from '../../presentational';
import { OrderConfirmationPickupInStoreComponent } from './order-confirmation-pickup-in-store-details.component';
@NgModule({
  exports: [OrderConfirmationPickupInStoreComponent],
  declarations: [OrderConfirmationPickupInStoreComponent],
  imports: [
    CommonModule,
    PickUpItemsDetailsModule,
    ConfigModule.withConfig({
      cmsComponents: {
        OrderConfirmationPickupInStore: {
          component: OrderConfirmationPickupInStoreComponent,
        },
      },
    } as CmsConfig),
  ],
})
export class OrderConfirmationPickupInStoreModule {}
