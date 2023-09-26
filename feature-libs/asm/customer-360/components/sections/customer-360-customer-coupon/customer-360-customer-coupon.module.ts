/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { Customer360CustomerCouponComponent } from './customer-360-customer-coupon.component';
import { Customer360PromotionListingModule } from '../../customer-360-promotion-listing/customer-360-promotion-listing.module';
import { IconModule, SearchBoxModule } from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    Customer360PromotionListingModule,
    I18nModule,
    IconModule,
    SearchBoxModule,
  ],
  declarations: [Customer360CustomerCouponComponent],
  exports: [Customer360CustomerCouponComponent],
})
export class Customer360CustomerCouponComponentModule {}
