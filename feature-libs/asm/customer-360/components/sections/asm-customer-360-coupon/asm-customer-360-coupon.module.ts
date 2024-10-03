/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { AsmCustomer360CouponComponent } from './asm-customer-360-coupon.component';
import { AsmCustomer360PromotionListingModule } from '../../asm-customer-360-promotion-listing/asm-customer-360-promotion-listing.module';

@NgModule({
  imports: [CommonModule, AsmCustomer360PromotionListingModule, I18nModule],
  declarations: [AsmCustomer360CouponComponent],
  exports: [AsmCustomer360CouponComponent],
})
export class AsmCustomer360CouponComponentModule {}
