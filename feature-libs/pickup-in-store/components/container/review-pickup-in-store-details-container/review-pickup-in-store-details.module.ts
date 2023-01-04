/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { StoreModule } from '../../presentational/store';
import { PickupInStoreDetailsReviewComponent } from './review-pickup-in-store-details.component';
import { CheckoutPickUpInStoreDetailsModule } from '../checkout-pickup-in-store-details/checkout-pickup-in-store-details.module';
@NgModule({
  exports: [PickupInStoreDetailsReviewComponent],
  declarations: [PickupInStoreDetailsReviewComponent],
  imports: [
    StoreModule,
    CommonModule,
    I18nModule,
    IconModule,
    ConfigModule.withConfig({
      cmsComponents: {
        PickupInStoreDetailsReviewComponent: {
          component: PickupInStoreDetailsReviewComponent,
        },
      },
    } as CmsConfig),
    CheckoutPickUpInStoreDetailsModule,
  ],
})
export class PickupInStoreDetailsReviewModule {}
