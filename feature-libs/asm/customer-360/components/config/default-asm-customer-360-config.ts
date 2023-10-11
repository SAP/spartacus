/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsmCustomer360ActiveCartComponent } from '../sections/asm-customer-360-active-cart/asm-customer-360-active-cart.component';
import { AsmCustomer360ActivityComponent } from '../sections/asm-customer-360-activity/asm-customer-360-activity.component';
import { AsmCustomer360CouponComponent } from '../sections/asm-customer-360-coupon/asm-customer-360-coupon.component';
import { AsmCustomer360CustomerCouponComponent } from '../sections/asm-customer-360-customer-coupon/asm-customer-360-customer-coupon.component';
import { AsmCustomer360MapComponent } from '../sections/asm-customer-360-map/asm-customer-360-map.component';
import { AsmCustomer360ProductInterestsComponent } from '../sections/asm-customer-360-product-interests/asm-customer-360-product-interests.component';
import { AsmCustomer360ProductReviewsComponent } from '../sections/asm-customer-360-product-reviews/asm-customer-360-product-reviews.component';
import { AsmCustomer360ProfileComponent } from '../sections/asm-customer-360-profile/asm-customer-360-profile.component';
import { AsmCustomer360PromotionComponent } from '../sections/asm-customer-360-promotion/asm-customer-360-promotion.component';
import { AsmCustomer360SavedCartComponent } from '../sections/asm-customer-360-saved-cart/asm-customer-360-saved-cart.component';
import { AsmCustomer360SupportTicketsComponent } from '../sections/asm-customer-360-support-tickets/asm-customer-360-support-tickets.component';
import { AsmCustomer360Config } from './asm-customer-360-config';
import { AsmCustomer360Type } from '@spartacus/asm/customer-360/root';

export const defaultAsmCustomer360Config: AsmCustomer360Config = {
  asmCustomer360: {
    dateFormat: 'MM-dd-yyyy',
    dateTimeFormat: 'dd-MM-yy hh:mm a',
    tabs: [
      {
        i18nNameKey: 'asmCustomer360.overviewTab',
        components: [
          {
            component: AsmCustomer360ActiveCartComponent,
            requestData: {
              type: AsmCustomer360Type.ACTIVE_CART,
            },
          },
          {
            component: AsmCustomer360SavedCartComponent,
            requestData: {
              type: AsmCustomer360Type.SAVED_CART,
            },
          },
          {
            component: AsmCustomer360ProductInterestsComponent,
            requestData: {
              type: AsmCustomer360Type.PRODUCT_INTEREST_LIST,
            },
          },
        ],
      },
      {
        i18nNameKey: 'asmCustomer360.profileTab',
        components: [
          {
            component: AsmCustomer360ProfileComponent,
            requestData: {
              type: AsmCustomer360Type.CUSTOMER_PROFILE,
            },
          },
        ],
      },
      {
        i18nNameKey: 'asmCustomer360.activityTab',
        components: [
          {
            component: AsmCustomer360ActivityComponent,
            requestData: {
              type: AsmCustomer360Type.ACTIVITY_LIST,
              additionalRequestParameters: {
                listSize: 10,
              },
            },
            config: { pageSize: 5 },
          },
        ],
      },
      {
        i18nNameKey: 'asmCustomer360.feedbackTab',
        components: [
          {
            component: AsmCustomer360SupportTicketsComponent,
            requestData: {
              type: AsmCustomer360Type.SUPPORT_TICKET_LIST,
              additionalRequestParameters: {
                listSize: 10,
              },
            },
            config: { pageSize: 5 },
          },
          {
            component: AsmCustomer360ProductReviewsComponent,
            requestData: {
              type: AsmCustomer360Type.REVIEW_LIST,
              additionalRequestParameters: {
                listSize: 10,
              },
            },
            config: { pageSize: 5 },
          },
        ],
      },
      {
        i18nNameKey: 'asmCustomer360.promotionsTab',
        components: [
          {
            component: AsmCustomer360CouponComponent,
            requestData: {
              type: AsmCustomer360Type.COUPON_LIST,
            },
          },
          {
            component: AsmCustomer360PromotionComponent,
            requestData: {
              type: AsmCustomer360Type.PROMOTION_LIST,
            },
          },
          {
            component: AsmCustomer360CustomerCouponComponent,
            requestData: {
              type: AsmCustomer360Type.CUSTOMER_COUPON_LIST,
              additionalRequestParameters: {
                assignable: true,
              },
            },
          },
        ],
      },
      {
        i18nNameKey: 'asmCustomer360.mapsTab',
        components: [
          {
            component: AsmCustomer360MapComponent,
            requestData: {
              type: AsmCustomer360Type.STORE_LOCATION,
            },
            config: {
              pageSize: 10,
            },
          },
        ],
      },
    ],
  },
};
