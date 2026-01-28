/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { CardModule, SpinnerModule } from '@spartacus/storefront';
import { AddressFormModule } from '@spartacus/user/profile/components';
import { OpfB2bCheckoutCostCenterModule } from '../opf-b2b-checkout-cost-center';
import { OpfB2bCheckoutDeliveryAddressComponent } from './opf-b2b-checkout-delivery-address.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AddressFormModule,
    CardModule,
    SpinnerModule,
    I18nModule,
    FeaturesConfigModule,
    OpfB2bCheckoutCostCenterModule,
    OpfB2bCheckoutDeliveryAddressComponent,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        OpfCheckoutDeliveryAddress: {
          component: OpfB2bCheckoutDeliveryAddressComponent,
        },
      },
    }),
  ],
  exports: [OpfB2bCheckoutDeliveryAddressComponent],
})
export class OpfB2bCheckoutDeliveryAddressModule {}
