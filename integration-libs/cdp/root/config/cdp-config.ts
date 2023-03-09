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
      myAccount: {
        paths: ['my-account'],
      },
      orderDetails: {
        paths: ['my-account/order/:orderCode'],
        paramsMapping: { orderCode: 'code' },
      },
      logout: {
        paths: ['logout'],
      },
  }
}
};

