/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import { PickUpItemsDetailsModule } from '../../presentational';
import { CheckoutPickUpInStoreDetailsComponent } from './checkout-pickup-in-store-details.component';
@NgModule({
  imports: [
    CommonModule,
    PickUpItemsDetailsModule,
    ConfigModule.withConfig({
      cmsComponents: {
        CheckoutPickupInStoreDetails: {
          component: CheckoutPickUpInStoreDetailsComponent,
        },
      },
    } as CmsConfig),
  ],
  exports: [CheckoutPickUpInStoreDetailsComponent],
  declarations: [CheckoutPickUpInStoreDetailsComponent],
})
export class CheckoutPickUpInStoreDetailsModule {}
