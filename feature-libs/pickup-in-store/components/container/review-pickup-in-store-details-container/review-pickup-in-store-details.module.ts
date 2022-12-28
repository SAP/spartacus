/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { StoreModule } from '../../presentational/store';
import { PickupInStoreDetailsReviewComponent } from './review-pickup-in-store-details.component';
@NgModule({
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
  ],
  exports: [PickupInStoreDetailsReviewComponent],
  declarations: [PickupInStoreDetailsReviewComponent],
})
export class PickupInStoreDetailsReviewModule {}
