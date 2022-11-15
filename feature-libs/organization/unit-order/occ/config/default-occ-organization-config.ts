/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';

export const defaultOccUnitOrderConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        unitLevelOrderHistory: '/orgUsers/${userId}/orgUnits/orders',
      },
    },
  },
};
