/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ArgsModule } from '@spartacus/asm/core';
import {
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import {
  IconModule,
  KeyboardFocusModule,
  MediaModule,
  MessageComponentModule,
  PageComponentModule,
  StarRatingModule,
} from '@spartacus/storefront';
import { Customer360Component } from './customer-360/customer-360.component';
import { AsmCustomerActiveCartModule } from './sections/asm-customer-active-cart/asm-customer-active-cart.module';
import { AsmCustomerActivityModule } from './sections/asm-customer-activity/asm-customer-activity.module';
import { AsmCustomerMapComponentModule } from './sections/asm-customer-map/asm-customer-map.component.module';
import { AsmCustomerProductInterestsModule } from './sections/asm-customer-product-interests/asm-customer-product-interests.module';
import { AsmCustomerProductReviewsComponentModule } from './sections/asm-customer-product-reviews/asm-customer-product-reviews.component.module';
import { AsmCustomerProfileModule } from './sections/asm-customer-profile/asm-customer-profile.module';
import { AsmCustomerSavedCartModule } from './sections/asm-customer-saved-cart/asm-customer-saved-cart.module';
import { AsmCustomerSectionComponent } from './sections/asm-customer-section/asm-customer-section.component';
import { AsmCustomerSupportTicketsComponent } from './sections/asm-customer-support-tickets/asm-customer-support-tickets.component';
import { AsmCustomerSupportTicketsComponentModule } from './sections/asm-customer-support-tickets/asm-customer-support-tickets.component.module';
import {
  AsmCustomerActiveCartComponent,
  AsmCustomerActivityComponent,
  AsmCustomerMapComponent,
  AsmCustomerProductInterestsComponent,
  AsmCustomerProductReviewsComponent,
  AsmCustomerProfileComponent,
  AsmCustomerSavedCartComponent,
} from './sections/components';
import { AsmCustomerCouponComponent } from './sections/asm-customer-coupon/asm-customer-coupon.component';
import { AsmCustomerCouponComponentModule } from './sections/asm-customer-coupon/asm-customer-coupon.module';
import { AsmCustomerPromotionComponent } from './sections/asm-customer-promotion/asm-customer-promotion.component';
import { AsmCustomerPromotionComponentModule } from './sections/asm-customer-promotion/asm-customer-promotion.module';

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
    AsmCustomerActiveCartModule,
    AsmCustomerProductInterestsModule,
    AsmCustomerSavedCartModule,
    AsmCustomerProfileModule,
    AsmCustomerActivityModule,
    AsmCustomerMapComponentModule,
    AsmCustomerProductReviewsComponentModule,
    AsmCustomerSupportTicketsComponentModule,
    AsmCustomerCouponComponentModule,
    AsmCustomerPromotionComponentModule,
    FeaturesConfigModule,
  ],
  declarations: [Customer360Component, AsmCustomerSectionComponent],
  exports: [Customer360Component],
  providers: [
    provideDefaultConfig({
      cmsComponents: {
        AsmCustomer360Component: {
          component: Customer360Component,
        },
        AsmCustomer360ProfileComponent: {
          component: AsmCustomerProfileComponent,
        },
        AsmCustomer360ActiveCartComponent: {
          component: AsmCustomerActiveCartComponent,
        },
        AsmCustomer360ProductInterestsComponent: {
          component: AsmCustomerProductInterestsComponent,
        },
        AsmCustomer360ProductReviewsComponent: {
          component: AsmCustomerProductReviewsComponent,
        },
        AsmCustomer360SupportTicketsComponent: {
          component: AsmCustomerSupportTicketsComponent,
        },
        AsmCustomer360SavedCartComponent: {
          component: AsmCustomerSavedCartComponent,
        },
        AsmCustomer360CustomerActivityComponent: {
          component: AsmCustomerActivityComponent,
        },
        AsmCustomer360MapComponent: {
          component: AsmCustomerMapComponent,
        },
        AsmCustomer360CouponComponent: {
          component: AsmCustomerCouponComponent,
        },
        AsmCustomer360PromotionComponent: {
          component: AsmCustomerPromotionComponent,
        },
      },
    }),
  ],
})
export class Customer360ComponentsModule {}
