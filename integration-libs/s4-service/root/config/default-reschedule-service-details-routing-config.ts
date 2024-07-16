/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RoutingConfig } from '@spartacus/core';

export const defaultRescheduleServiceDetailsRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      rescheduleServiceDetails: {
        paths: ['my-account/order/rescheduleservice/:orderCode'],
        paramsMapping: { orderCode: 'code' },
       },
    },
  },
};
