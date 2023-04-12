/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { GOOGLE_MAPS_DEVELOPMENT_KEY_CONFIG } from '@spartacus/storefinder/root';
import { Customer360Type } from '../model';
import { Customer360Config } from './customer-360-config';

export const defaultCustomer360Config: Customer360Config = {
  customer360: {
    tabs: [
      {
        i18nNameKey: 'customer360.overviewTab',
        components: [
          {
            component: 'AsmCustomer360SavedCartComponent',
          },
          {
            component: 'AsmCustomer360ActiveCartComponent',
          },
          {
            component: 'AsmCustomer360ProductInterestsComponent',
            //TODO until backend is ready
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
            //TODO until backend is ready
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
            //TODO  until backend is ready
            requestData: {
              type: Customer360Type.SUPPORT_TICKET_LIST,
            },
            config: { pageSize: 5 },
          },
          {
            component: 'AsmCustomer360ProductReviewsComponent',
            requestData: {
              type: Customer360Type.REVIEW_LIST,
            },
            config: { pageSize: 5 },
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
              // For security compliance, by default, google maps does not display.
              // Using special key value 'cx-development' allows google maps to display
              // without a key, for development or demo purposes.
              // (refer from app.module)
              googleMapsApiKey: GOOGLE_MAPS_DEVELOPMENT_KEY_CONFIG,
              storefinderRadius: 10000000,
              pageSize: 10,
            },
          },
        ],
      },
    ],
  },
};
