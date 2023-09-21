/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import // AsmCustomerActiveCartComponent,
//AsmCustomerActivityComponent,
//AsmCustomerCouponComponent,
//AsmCustomerCustomerCouponComponent,
//AsmCustomerMapComponent,
//AsmCustomerProductInterestsComponent,
//AsmCustomerProductReviewsComponent,
//AsmCustomerProfileComponent,
//AsmCustomerPromotionComponent,
//AsmCustomerSavedCartComponent,
//AsmCustomerSupportTicketsComponent,
'@spartacus/asm/customer-360/components';
import { Customer360Config } from './customer-360-config';
import { Customer360Type } from '@spartacus/asm/customer-360/root';
import { AsmCustomerActiveCartComponent } from '@spartacus/asm/customer-360/components';

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
            component: 'AsmCustomerSavedCartComponent',
            requestData: {
              type: Customer360Type.SAVED_CART,
            },
          },
          {
            component: 'AsmCustomerProductInterestsComponent',
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
            component: 'AsmCustomerProfileComponent',
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
            component: 'AsmCustomerActivityComponent',
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
            component: 'AsmCustomerSupportTicketsComponent',
            requestData: {
              type: Customer360Type.SUPPORT_TICKET_LIST,
              additionalRequestParameters: {
                listSize: 10,
              },
            },
            config: { pageSize: 5 },
          },
          {
            component: 'AsmCustomerProductReviewsComponent',
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
            component: 'AsmCustomerCouponComponent',
            requestData: {
              type: Customer360Type.COUPON_LIST,
            },
          },
          {
            component: 'AsmCustomerPromotionComponent',
            requestData: {
              type: Customer360Type.PROMOTION_LIST,
            },
          },
          {
            component: 'AsmCustomerCustomerCouponComponent',
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
            component: 'AsmCustomerMapComponent',
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
