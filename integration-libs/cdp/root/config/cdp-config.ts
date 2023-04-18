/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RoutingConfig } from '@spartacus/core';

export const CdpConfig: RoutingConfig = {
  routing: {
    routes: {
      orders: {
        paths: ['my-account/orders'],
      },
      orderDetails: {
        paths: ['my-account/order/:orderCode'],
        paramsMapping: { orderCode: 'code' },
      },
      personalDetails: {
        paths: ['my-account/update-profile'],
      },
      // signOut: {
      //   paths: ['logout'],
      // },
      passwordDetails: {
        paths: ['my-account/update-password'],
      },
      SettingsAndPrivacy: {
        paths: ['my-account/consents'],
      },
      requests: {
        paths: ['/my-account/support-tickets'],
      },
    }
  }
};
