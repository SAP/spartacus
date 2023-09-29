/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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
import { Customer360Component } from './customer-360/customer-360.component';
import { Customer360ActiveCartModule } from './sections/customer-360-active-cart/customer-360-active-cart.module';
import { Customer360ActivityModule } from './sections/customer-360-activity/customer-360-activity.module';
import { Customer360MapComponentModule } from './sections/customer-360-map/customer-360-map.component.module';
import { Customer360ProductInterestsModule } from './sections/customer-360-product-interests/customer-360-product-interests.module';
import { Customer360ProductReviewsComponentModule } from './sections/customer-360-product-reviews/customer-360-product-reviews.component.module';
import { Customer360ProfileModule } from './sections/customer-360-profile/customer-360-profile.module';
import { Customer360SavedCartModule } from './sections/customer-360-saved-cart/customer-360-saved-cart.module';
import { Customer360SectionComponent } from './sections/customer-360-section/customer-360-section.component';
import { Customer360SupportTicketsComponentModule } from './sections/customer-360-support-tickets/customer-360-support-tickets.component.module';
import { Customer360CouponComponentModule } from './sections/customer-360-coupon/customer-360-coupon.module';
import { Customer360PromotionComponentModule } from './sections/customer-360-promotion/customer-360-promotion.module';
import { Customer360CustomerCouponComponentModule } from './sections/customer-360-customer-coupon/customer-360-customer-coupon.module';
import { defaultCustomer360LayoutConfig } from './default-customer-360-layout.config';

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
    Customer360ActiveCartModule,
    Customer360ProductInterestsModule,
    Customer360SavedCartModule,
    Customer360ProfileModule,
    Customer360ActivityModule,
    Customer360MapComponentModule,
    Customer360ProductReviewsComponentModule,
    Customer360SupportTicketsComponentModule,
    Customer360CouponComponentModule,
    Customer360PromotionComponentModule,
    Customer360CustomerCouponComponentModule,
  ],
  declarations: [Customer360Component, Customer360SectionComponent],
  exports: [Customer360Component],
  providers: [provideDefaultConfig(defaultCustomer360LayoutConfig)],
})
export class Customer360ComponentsModule {}
