/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RoutingConfig } from '@spartacus/core';

const listPath = `organization/account-summary`;

export const defaultAccountSummaryRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      orgAccountSummary: {
        paths: [`${listPath}`],
      },
      orgAccountSummaryDetails: {
        paths: [`${listPath}/details/:orgUnit`],
        paramsMapping: { orgUnit: 'uid' },
      },
    },
  },
};
