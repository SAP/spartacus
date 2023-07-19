/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Customer360Type } from '../model';
import { Customer360Config } from './customer-360-config';

export const defaultCustomer360Config: Customer360Config = {
  customer360: {
    dateFormat: 'MM-dd-yyyy',
    dateTimeFormat: 'dd-MM-yy hh:mm a',
    tabs: [
      {
        i18nNameKey: 'customer360.overviewTab',
        components: [
          {
            component: 'AsmCustomer360ActiveCartComponent',
            requestData: {
              type: Customer360Type.ACTIVE_CART,
            },
          },
          {
            component: 'AsmCustomer360SavedCartComponent',
            requestData: {
              type: Customer360Type.SAVED_CART,
            },
          },
          {
            component: 'AsmCustomer360ProductInterestsComponent',
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
            component: 'AsmCustomer360ProfileComponent',
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
            component: 'AsmCustomer360CustomerActivityComponent',
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
            component: 'AsmCustomer360SupportTicketsComponent',
            requestData: {
              type: Customer360Type.SUPPORT_TICKET_LIST,
              additionalRequestParameters: {
                listSize: 10,
              },
            },
            config: { pageSize: 5 },
          },
          {
            component: 'AsmCustomer360ProductReviewsComponent',
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
            component: 'AsmCustomer360CouponComponent',
            requestData: {
              type: Customer360Type.COUPON_LIST,
            },
            config: {
              pageSize: 10,
            },
          },
        ],
      },
      {
        i18nNameKey: 'customer360.mapsTab',
        components: [
          {
            component: 'AsmCustomer360MapComponent',
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
