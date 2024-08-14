/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RoutingConfig } from '@spartacus/core';

export const defaultCommonServiceDetailsRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      checkoutServiceDetails: { paths: ['checkout/service-details'] },
      cancelserviceDetails: {
        paths: ['my-account/order/cancelservice/:orderCode'],
        paramsMapping: { orderCode: 'code' },
      },
    },
  },
};
