import { AuthGuard, CmsConfig, RoutingConfig } from '@spartacus/core';

import {
  TableConfig,
  BREAKPOINT,
  SplitViewDeactivateGuard,
} from '@spartacus/storefront';
import { CostCenterListComponent } from './list/cost-center-list.component';
import { CostCenterCreateComponent } from './create/cost-center-create.component';
import { CostCenterDetailsComponent } from './details/cost-center-details.component';
import { CostCenterEditComponent } from './edit/cost-center-edit.component';
import { CostCenterAssignBudgetsComponent } from './assign-budgets/cost-center-assign-budgets.component';
import { OrganizationTables } from '../shared/organization.model';

export const costCenterRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      costCenter: {
        paths: ['organization/cost-centers'],
      },
      costCenterDetails: {
        paths: ['organization/cost-centers/:code'],
      },
      costCenterBudgets: {
        paths: ['organization/cost-centers/:code/budgets'],
      },
      costCenterAssignBudgets: {
        paths: ['organization/cost-centers/:code/budgets/assign'],
      },
    },
  },
};

export const costCenterCmsConfig: CmsConfig = {
  cmsComponents: {
    ManageCostCentersListComponent: {
      component: CostCenterListComponent,
      childRoutes: [
        {
          path: 'create',
          component: CostCenterCreateComponent,
        },
        {
          path: ':code',
          component: CostCenterDetailsComponent,
          canDeactivate: [SplitViewDeactivateGuard],
          children: [
            {
              path: 'edit',
              component: CostCenterEditComponent,
            },
            {
              path: 'budgets',
              children: [
                {
                  path: 'assign',
                  component: CostCenterAssignBudgetsComponent,
                },
              ],
            },
            // ],
            // },
          ],
        },
      ],
      guards: [AuthGuard],
    },
  },
};

export const costCenterTableConfig: TableConfig = {
  table: {
    [OrganizationTables.COST_CENTER]: [
      {
        headers: [{ key: 'name' }],
        hideHeader: true,
      },
      {
        breakpoint: BREAKPOINT.md,
        headers: [
          { key: 'name', sortCode: 'byName' },
          { key: 'unit', sortCode: 'byUnit' },
        ],
      },
      {
        breakpoint: BREAKPOINT.lg,
        headers: [
          { key: 'name', sortCode: 'byName' },
          { key: 'code', sortCode: 'byCode' },
          { key: 'currency' },
          { key: 'unit', sortCode: 'byUnit' },
        ],
      },
    ],

    [OrganizationTables.COST_CENTER_BUDGETS]: [
      {
        headers: [{ key: 'name' }],
      },
    ],
  },
};
