/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RoutingConfig } from '@spartacus/core';

export const defaultServiceOrdersRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      checkoutServiceDetails: { paths: ['checkout/service-details'] },
      rescheduleServiceDetails: {
        paths: ['my-account/order/rescheduleservice/:orderCode'],
        paramsMapping: { orderCode: 'code' },
      },
    },
  },
};
