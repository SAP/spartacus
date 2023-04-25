/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';

export const defaultOccCustomer360Config: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        customer360:
          '/assistedservicewebservices/${baseSiteId}/users/${userId}/customer360',
      },
    },
  },
};
