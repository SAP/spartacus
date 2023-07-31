/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { AsmCustomerCustomerCouponComponent } from './asm-customer-customer-coupon.component';
import { AsmCustomerPromotionListingModule } from '../../asm-customer-promotion-listing/asm-customer-promotion-listing.module';

@NgModule({
  imports: [CommonModule, AsmCustomerPromotionListingModule, I18nModule],
  declarations: [AsmCustomerCustomerCouponComponent],
  exports: [AsmCustomerCustomerCouponComponent],
})
export class AsmCustomerCustomerCouponComponentModule {}
