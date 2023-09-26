/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsmCustomerActiveCartComponent } from '../sections/asm-customer-active-cart/asm-customer-active-cart.component';
import { AsmCustomerActivityComponent } from '../sections/asm-customer-activity/asm-customer-activity.component';
import { AsmCustomerCouponComponent } from '../sections/asm-customer-coupon/asm-customer-coupon.component';
import { AsmCustomerCustomerCouponComponent } from '../sections/asm-customer-customer-coupon/asm-customer-customer-coupon.component';
import { AsmCustomerMapComponent } from '../sections/asm-customer-map/asm-customer-map.component';
import { AsmCustomerProductInterestsComponent } from '../sections/asm-customer-product-interests/asm-customer-product-interests.component';
import { AsmCustomerProductReviewsComponent } from '../sections/asm-customer-product-reviews/asm-customer-product-reviews.component';
import { AsmCustomerProfileComponent } from '../sections/asm-customer-profile/asm-customer-profile.component';
import { AsmCustomerPromotionComponent } from '../sections/asm-customer-promotion/asm-customer-promotion.component';
import { AsmCustomerSavedCartComponent } from '../sections/asm-customer-saved-cart/asm-customer-saved-cart.component';
import { AsmCustomerSupportTicketsComponent } from '../sections/asm-customer-support-tickets/asm-customer-support-tickets.component';
import { Customer360Config } from './customer-360-config';
import { Customer360Type } from '@spartacus/asm/customer-360/root';

export const defaultCustomer360Config: Customer360Config = {
  customer360: {
    dateFormat: 'MM-dd-yyyy',
    dateTimeFormat: 'dd-MM-yy hh:mm a',
    tabs: [
      {
        i18nNameKey: 'customer360.overviewTab',
        components: [
          {
            component: AsmCustomerActiveCartComponent,
            requestData: {
              type: Customer360Type.ACTIVE_CART,
            },
          },
          {
            component: AsmCustomerSavedCartComponent,
            requestData: {
              type: Customer360Type.SAVED_CART,
            },
          },
          {
            component: AsmCustomerProductInterestsComponent,
            requestData: {
              type: Customer360Type.PRODUCT_INTEREST_LIST,
            },
          },
        ],
      },
      {
        i18nNameKey: 'customer360.profileTab',
        components: [
          {
            component: AsmCustomerProfileComponent,
            requestData: {
              type: Customer360Type.CUSTOMER_PROFILE,
            },
          },
        ],
      },
      {
        i18nNameKey: 'customer360.activityTab',
        components: [
          {
            component: AsmCustomerActivityComponent,
            requestData: {
              type: Customer360Type.ACTIVITY_LIST,
              additionalRequestParameters: {
                listSize: 10,
              },
            },
            config: { pageSize: 5 },
          },
        ],
      },
      {
        i18nNameKey: 'customer360.feedbackTab',
        components: [
          {
            component: AsmCustomerSupportTicketsComponent,
            requestData: {
              type: Customer360Type.SUPPORT_TICKET_LIST,
              additionalRequestParameters: {
                listSize: 10,
              },
            },
            config: { pageSize: 5 },
          },
          {
            component: AsmCustomerProductReviewsComponent,
            requestData: {
              type: Customer360Type.REVIEW_LIST,
              additionalRequestParameters: {
                listSize: 10,
              },
            },
            config: { pageSize: 5 },
          },
        ],
      },
      {
        i18nNameKey: 'customer360.promotionsTab',
        components: [
          {
            component: AsmCustomerCouponComponent,
            requestData: {
              type: Customer360Type.COUPON_LIST,
            },
          },
          {
            component: AsmCustomerPromotionComponent,
            requestData: {
              type: Customer360Type.PROMOTION_LIST,
            },
          },
          {
            component: AsmCustomerCustomerCouponComponent,
            requestData: {
              type: Customer360Type.CUSTOMER_COUPON_LIST,
              additionalRequestParameters: {
                assignable: true,
              },
            },
          },
        ],
      },
      {
        i18nNameKey: 'customer360.mapsTab',
        components: [
          {
            component: AsmCustomerMapComponent,
            requestData: {
              type: Customer360Type.STORE_LOCATION,
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
