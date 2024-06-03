/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';

export const defaultOccUnitOrderConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        unitLevelOrderHistory: `/orgUsers/\${userId}/orgUnits/orders`,
        unitLevelOrderDetail: `orgUsers/\${userId}/orgUnits/orders/\${orderId}?fields=FULL`,
      },
    },
  },
};
