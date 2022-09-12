/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ParamsMapping, RoutingConfig } from '@commerce-storefront-toolset/core';
import { ROUTE_PARAMS } from '../route-params';

const listPath = `organization/cost-centers/:${ROUTE_PARAMS.costCenterCode}`;
const paramsMapping: ParamsMapping = {
  costCenterCode: 'code',
};

export const defaultCostCenterRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      orgCostCenter: {
        paths: ['organization/cost-centers'],
      },
      orgCostCenterCreate: {
        paths: ['organization/cost-centers/create'],
      },
      orgCostCenterDetails: {
        paths: [`${listPath}`],
        paramsMapping,
      },
      orgCostCenterBudgets: {
        paths: [`${listPath}/budgets`],
        paramsMapping,
      },
      orgCostCenterAssignBudgets: {
        paths: [`${listPath}/budgets/assign`],
        paramsMapping,
      },
      orgCostCenterEdit: {
        paths: [`${listPath}/edit`],
        paramsMapping,
      },
    },
  },
};
