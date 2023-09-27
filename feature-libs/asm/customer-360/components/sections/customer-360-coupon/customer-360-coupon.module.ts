/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { Customer360CouponComponent } from './customer-360-coupon.component';
import { Customer360PromotionListingModule } from '../../customer-360-promotion-listing/customer-360-promotion-listing.module';

@NgModule({
  imports: [CommonModule, Customer360PromotionListingModule, I18nModule],
  declarations: [Customer360CouponComponent],
  exports: [Customer360CouponComponent],
})
export class Customer360CouponComponentModule {}
