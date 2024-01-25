/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';

export const defaultOccAsmCustomer360Config: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        asmCustomer360:
          '/assistedservicewebservices/${baseSiteId}/users/${userId}/customer360',
      },
    },
  },
};
