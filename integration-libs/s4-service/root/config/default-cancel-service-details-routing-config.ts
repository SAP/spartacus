/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RoutingConfig } from '@spartacus/core';

export const defaultCancelServiceDetailsRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      cancelserviceDetails: {
        paths: ['my-account/order/cancelservice/:orderCode'],
        paramsMapping: { orderCode: 'code' },
      },
    },
  },
};
