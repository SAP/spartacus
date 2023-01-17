/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import {
  CardModule,
  IconModule,
  MediaModule,
  OutletModule,
} from '@spartacus/storefront';
import { CartDeliveryPointsService } from '../../services/cart-delivery-points.service';
import { OrderDeliveryPointsService } from '../../services/order-delivery-points.service';
import { StoreModule } from '../store';
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
  ],
  declarations: [PickUpItemsDetailsComponent],
  exports: [PickUpItemsDetailsComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutPickupInStoreDetails: {
          component: PickUpItemsDetailsComponent,
          data: {
            showDeliveryOptions: true,
          },
        },
        OrderConfirmationPickupInStore: {
          component: PickUpItemsDetailsComponent,
          data: {
            showEdit: false,
          },
          providers: [
            {
              provide: CartDeliveryPointsService,
              useExisting: OrderDeliveryPointsService,
            },
          ],
        },
        PickupInStoreDetailsReviewComponent: {
          component: PickUpItemsDetailsComponent,
          data: {
            showEdit: true,
          },
        },
      },
    }),
  ],
})
export class PickUpItemsDetailsModule {}
