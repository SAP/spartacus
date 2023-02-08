/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import { PickUpItemsDetailsModule } from '../../presentational';
import { PickupInStoreDetailsReviewComponent } from './review-pickup-in-store-details.component';
@NgModule({
  exports: [PickupInStoreDetailsReviewComponent],
  declarations: [PickupInStoreDetailsReviewComponent],
  imports: [
    CommonModule,
    PickUpItemsDetailsModule,
    ConfigModule.withConfig({
      cmsComponents: {
        PickupInStoreReviewComponent: {
          component: PickupInStoreDetailsReviewComponent,
        },
      },
    } as CmsConfig),
  ],
})
export class PickupInStoreDetailsReviewModule {}
