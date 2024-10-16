/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  CmsConfig,
  ConfigModule,
  FeaturesConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import {
  CardModule,
  HierarchyModule,
  IconModule,
  MediaModule,
  OutletModule,
} from '@spartacus/storefront';
import { StoreModule } from '../../presentational';
import { PickUpItemsDetailsComponent } from './pickup-items-details.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    RouterModule,
    UrlModule,
    IconModule,
    StoreModule,
    CardModule,
    MediaModule,
    OutletModule,
    FeaturesConfigModule,
    HierarchyModule,
    ConfigModule.withConfig({
      cmsComponents: {
        OrderConfirmationPickUpComponent: {
          component: PickUpItemsDetailsComponent,
          data: {
            showEdit: false,
            context: 'order',
          },
        },
        CheckoutReviewPickup: {
          component: PickUpItemsDetailsComponent,
          data: {
            showEdit: true,
            context: 'review',
          },
        },
        PickupInStoreDeliveryModeComponent: {
          component: PickUpItemsDetailsComponent,
          data: {
            showEdit: false,
            context: 'deliveryMode',
          },
        },
      },
    } as CmsConfig),
  ],
  declarations: [PickUpItemsDetailsComponent],
  exports: [PickUpItemsDetailsComponent],
})
export class PickUpItemsDetailsModule {}
