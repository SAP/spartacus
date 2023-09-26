/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Customer360ActiveCartComponent } from '../sections/customer-360-active-cart/customer-360-active-cart.component';
import { Customer360ActivityComponent } from '../sections/customer-360-activity/customer-360-activity.component';
import { Customer360CouponComponent } from '../sections/customer-360-coupon/customer-360-coupon.component';
import { Customer360CustomerCouponComponent } from '../sections/customer-360-customer-coupon/customer-360-customer-coupon.component';
import { Customer360MapComponent } from '../sections/customer-360-map/customer-360-map.component';
import { Customer360ProductInterestsComponent } from '../sections/customer-360-product-interests/customer-360-product-interests.component';
import { Customer360ProductReviewsComponent } from '../sections/customer-360-product-reviews/customer-360-product-reviews.component';
import { Customer360ProfileComponent } from '../sections/customer-360-profile/customer-360-profile.component';
import { Customer360PromotionComponent } from '../sections/customer-360-promotion/customer-360-promotion.component';
import { Customer360SavedCartComponent } from '../sections/customer-360-saved-cart/customer-360-saved-cart.component';
import { Customer360SupportTicketsComponent } from '../sections/customer-360-support-tickets/customer-360-support-tickets.component';
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
            component: Customer360ActiveCartComponent,
            requestData: {
              type: Customer360Type.ACTIVE_CART,
            },
          },
          {
            component: Customer360SavedCartComponent,
            requestData: {
              type: Customer360Type.SAVED_CART,
            },
          },
          {
            component: Customer360ProductInterestsComponent,
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
            component: Customer360ProfileComponent,
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
            component: Customer360ActivityComponent,
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
            component: Customer360SupportTicketsComponent,
            requestData: {
              type: Customer360Type.SUPPORT_TICKET_LIST,
              additionalRequestParameters: {
                listSize: 10,
              },
            },
            config: { pageSize: 5 },
          },
          {
            component: Customer360ProductReviewsComponent,
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
            component: Customer360CouponComponent,
            requestData: {
              type: Customer360Type.COUPON_LIST,
            },
          },
          {
            component: Customer360PromotionComponent,
            requestData: {
              type: Customer360Type.PROMOTION_LIST,
            },
          },
          {
            component: Customer360CustomerCouponComponent,
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
            component: Customer360MapComponent,
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
