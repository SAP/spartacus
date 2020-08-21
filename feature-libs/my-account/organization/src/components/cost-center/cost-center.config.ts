import {
  AuthGuard,
  CmsConfig,
  ParamsMapping,
  RoutingConfig,
} from '@spartacus/core';
import {
  BREAKPOINT,
  SplitViewDeactivateGuard,
  TableConfig,
} from '@spartacus/storefront';
import { OrganizationTableType } from '../shared/organization.model';
import { CostCenterAssignBudgetsComponent } from './budgets/assign/cost-center-assign-budgets.component';
import { CostCenterBudgetListComponent } from './budgets/list/cost-center-budget-list.component';
import { CostCenterCreateComponent } from './create/cost-center-create.component';
import { CostCenterDetailsComponent } from './details/cost-center-details.component';
import { CostCenterEditComponent } from './edit/cost-center-edit.component';
import { CostCenterListComponent } from './list/cost-center-list.component';

// TODO:#my-account-architecture - Number.MAX_VALUE?
// const MAX_OCC_INTEGER_VALUE = 2147483647;

const paramsMapping: ParamsMapping = {
  costCenterKey: 'code',
};

// TODO: this doesn't work with lazy loaded feature
export const costCenterRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      costCenter: {
        paths: ['organization/cost-centers'],
      },
      costCenterCreate: {
        paths: ['organization/cost-centers/create'],
      },
      costCenterDetails: {
        paths: ['organization/cost-centers/:costCenterKey'],
        paramsMapping,
      },
      costCenterBudgets: {
        paths: ['organization/cost-centers/:costCenterKey/budgets'],
        paramsMapping,
      },
      costCenterAssignBudgets: {
        paths: ['organization/cost-centers/:costCenterKey/budgets/assign'],
        paramsMapping,
      },
      costCenterEdit: {
        paths: ['organization/cost-centers/:costCenterKey/edit'],
        paramsMapping,
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
          canDeactivate: [SplitViewDeactivateGuard],
        },
        {
          path: ':costCenterKey',
          component: CostCenterDetailsComponent,
          canDeactivate: [SplitViewDeactivateGuard],
          children: [
            {
              path: 'budgets',
              component: CostCenterBudgetListComponent,
              canDeactivate: [SplitViewDeactivateGuard],
              children: [
                {
                  path: 'assign',
                  component: CostCenterAssignBudgetsComponent,
                  canDeactivate: [SplitViewDeactivateGuard],
                },
              ],
            },
          ],
        },
        {
          path: ':costCenterKey/edit',
          component: CostCenterEditComponent,
        },
      ],
      guards: [AuthGuard],
    },
  },
};

export function costCenterTableConfigFactory(): TableConfig {
  return costCenterTableConfig;
}

export const costCenterTableConfig: TableConfig = {
  table: {
    [OrganizationTableType.COST_CENTER]: [
      {
        headers: [{ key: 'name' }, { key: 'active' }, { key: 'unit' }],
        pagination: {
          sort: 'byName',
        },
      },
      {
        breakpoint: BREAKPOINT.xs,
        hideHeader: true,
      },
      {
        breakpoint: BREAKPOINT.lg,
        headers: [
          { key: 'name' },
          { key: 'active' },
          { key: 'currency' },
          { key: 'unit' },
        ],
      },
    ],

    [OrganizationTableType.COST_CENTER_BUDGETS]: [
      {
        headers: [{ key: 'name' }, { key: 'status' }],
      },
    ],

    [OrganizationTableType.COST_CENTER_ASSIGN_BUDGETS]: [
      {
        pagination: {
          sort: 'byName',
        },
      },
      {
        breakpoint: BREAKPOINT.xs,
        headers: [{ key: 'selected' }, { key: 'summary' }, { key: 'link' }],
        hideHeader: true,
      },
      {
        breakpoint: BREAKPOINT.lg,
        headers: [
          { key: 'name', sortCode: 'byName' },
          { key: 'code', sortCode: 'byCode' },
          { key: 'amount', sortCode: 'byValue' },
          { key: 'dateRange' },
        ],
      },
    ],
  },
};
