/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ParamsMapping, RoutingConfig } from '@commerce-storefront-toolset/core';
import { ROUTE_PARAMS } from '../route-params';

const listPath = `organization/budgets/:${ROUTE_PARAMS.budgetCode}`;
const paramsMapping: ParamsMapping = {
  budgetCode: 'code',
};

export const defaultBudgetRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      orgBudget: {
        paths: ['organization/budgets'],
      },
      orgBudgetCreate: {
        paths: ['organization/budgets/create'],
      },
      orgBudgetDetails: {
        paths: [`${listPath}`],
        paramsMapping,
      },
      orgBudgetCostCenters: {
        paths: [`${listPath}/cost-centers`],
        paramsMapping,
      },
      orgBudgetEdit: {
        paths: [`${listPath}/edit`],
        paramsMapping,
      },
    },
  },
};
