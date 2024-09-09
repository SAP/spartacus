/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ArgsModule } from '@spartacus/asm/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import {
  IconModule,
  KeyboardFocusModule,
  MediaModule,
  MessageComponentModule,
  PageComponentModule,
  StarRatingModule,
} from '@spartacus/storefront';
import { AsmCustomer360Component } from './asm-customer-360/asm-customer-360.component';

import { AsmCustomer360ActivityModule } from './sections/asm-customer-360-activity/asm-customer-360-activity.module';


import { AsmCustomer360ProductReviewsComponentModule } from './sections/asm-customer-360-product-reviews/asm-customer-360-product-reviews.component.module';


import { AsmCustomer360SectionComponent } from './sections/asm-customer-360-section/asm-customer-360-section.component';
import { AsmCustomer360SupportTicketsComponentModule } from './sections/asm-customer-360-support-tickets/asm-customer-360-support-tickets.component.module';
import { AsmCustomer360CouponComponentModule } from './sections/asm-customer-360-coupon/asm-customer-360-coupon.module';
import { AsmCustomer360PromotionComponentModule } from './sections/asm-customer-360-promotion/asm-customer-360-promotion.module';
import { AsmCustomer360CustomerCouponComponentModule } from './sections/asm-customer-360-customer-coupon/asm-customer-360-customer-coupon.module';
import { defaultAsmCustomer360LayoutConfig } from './default-asm-customer-360-layout.config';

@NgModule({
  imports: [
    CommonModule,
    StarRatingModule,
    I18nModule,
    ArgsModule,
    MediaModule,
    IconModule,
    KeyboardFocusModule,
    PageComponentModule,
    MessageComponentModule,
    AsmCustomer360ActivityModule,
    AsmCustomer360ProductReviewsComponentModule,
    AsmCustomer360SupportTicketsComponentModule,
    AsmCustomer360CouponComponentModule,
    AsmCustomer360PromotionComponentModule,
    AsmCustomer360CustomerCouponComponentModule,
],
  declarations: [AsmCustomer360Component, AsmCustomer360SectionComponent],
  exports: [AsmCustomer360Component],
  providers: [provideDefaultConfig(defaultAsmCustomer360LayoutConfig)],
})
export class AsmCustomer360ComponentsModule {}
