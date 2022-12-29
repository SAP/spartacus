/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import {
  CardModule,
  IconModule,
  MediaModule,
  OutletModule,
} from '@spartacus/storefront';
import { StoreModule } from '../../presentational/store';
import { CheckoutPickUpInStoreDetailsComponent } from './checkout-pickup-in-store-details.component';
@NgModule({
  imports: [
    CardModule,
    StoreModule,
    CommonModule,
    MediaModule,
    I18nModule,
    IconModule,
    OutletModule,
    RouterModule,
    UrlModule,
    ConfigModule.withConfig({
      cmsComponents: {
        PickupInStoreDetails: {
          component: CheckoutPickUpInStoreDetailsComponent,
        },
      },
    } as CmsConfig),
  ],
  exports: [CheckoutPickUpInStoreDetailsComponent],
  declarations: [CheckoutPickUpInStoreDetailsComponent],
})
export class CheckoutPickUpInStoreDetailsModule {}
