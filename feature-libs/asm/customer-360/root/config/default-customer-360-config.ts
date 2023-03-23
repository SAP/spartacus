/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Customer360Type } from '../model';
import { Customer360Config } from './customer-360-config';

export const defaultCustomer360Config: Customer360Config = {
  customer360: {
    tabs: [
      {
        i18nNameKey: 'asm.customer360.overviewTab',
        components: [
          {
            component: 'AsmCustomer360SavedCartComponent',
          },
          {
            component: 'AsmCustomer360ActiveCartComponent',
          },
          {
            component: 'AsmCustomer360ProductInterestsComponent',
          },
        ],
      },
      {
        i18nNameKey: 'asm.customer360.profileTab',
        components: [
          {
            component: 'AsmCustomer360ProfileComponent',
          },
        ],
      },
      {
        i18nNameKey: 'asm.customer360.activityTab',
        components: [
          {
            component: 'AsmCustomer360CustomerActivityComponent',
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
        i18nNameKey: 'asm.customer360.mapsTab',
        components: [
          {
            component: 'AsmCustomer360MapComponent',
            requestData: {
              type: Customer360Type.STORE_LOCATION,
            },
            config: {
              // this key should provide from the customer
              // googleMapsApiKey: '',
              storefinderRadius: 10000000,
              pageSize: 10,
            },
          },
        ],
      },
    ],
  },
};
