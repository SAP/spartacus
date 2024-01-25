/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { AsmCustomer360CustomerCouponComponent } from './asm-customer-360-customer-coupon.component';
import { AsmCustomer360PromotionListingModule } from '../../asm-customer-360-promotion-listing/asm-customer-360-promotion-listing.module';
import { IconModule, SearchBoxModule } from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    AsmCustomer360PromotionListingModule,
    I18nModule,
    IconModule,
    SearchBoxModule,
  ],
  declarations: [AsmCustomer360CustomerCouponComponent],
  exports: [AsmCustomer360CustomerCouponComponent],
})
export class AsmCustomer360CustomerCouponComponentModule {}
