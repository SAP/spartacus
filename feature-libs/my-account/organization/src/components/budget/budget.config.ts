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
import { BudgetCostCenterListComponent } from './cost-centers/list/budget-cost-center-list.component';
import { BudgetCreateComponent } from './create/budget-create.component';
import { BudgetDetailsComponent } from './details/budget-details.component';
import { BudgetEditComponent } from './edit/budget-edit.component';
import { BudgetListComponent } from './list/budget-list.component';

const paramsMapping: ParamsMapping = {
  budgetKey: 'code',
};

// TODO: this doesn't work with lazy loaded feature
export const budgetRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      budget: {
        paths: ['organization/budgets'],
      },
      budgetCreate: {
        paths: ['organization/budgets/create'],
      },
      budgetDetails: {
        paths: ['organization/budgets/:budgetKey'],
        paramsMapping,
      },
      budgetCostCenters: {
        paths: ['organization/budgets/:budgetKey/cost-centers'],
        paramsMapping,
      },
      budgetEdit: {
        paths: ['organization/budgets/:budgetKey/edit'],
        paramsMapping,
      },
    },
  },
};

export const budgetCmsConfig: CmsConfig = {
  cmsComponents: {
    ManageBudgetsListComponent: {
      component: BudgetListComponent,
      childRoutes: [
        {
          path: 'create',
          component: BudgetCreateComponent,
          canDeactivate: [SplitViewDeactivateGuard],
        },
        {
          path: ':budgetKey',
          component: BudgetDetailsComponent,
          canDeactivate: [SplitViewDeactivateGuard],
          children: [
            {
              path: 'cost-centers',
              component: BudgetCostCenterListComponent,
              canDeactivate: [SplitViewDeactivateGuard],
            },
          ],
        },
        {
          path: ':budgetKey/edit',
          component: BudgetEditComponent,
        },
      ],
      guards: [AuthGuard],
    },
  },
};

export function budgetTableConfigFactory(): TableConfig {
  return budgetTableConfig;
}

export const budgetTableConfig: TableConfig = {
  table: {
    [OrganizationTableType.BUDGET]: [
      // TODO: consider cascading from smallest size
      {
        headers: [{ key: 'name' }],
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
          { key: 'amount' },
          { key: 'dateRange' },
          { key: 'unit' },
        ],
      },
    ],

    [OrganizationTableType.BUDGET_COST_CENTERS]: [
      {
        headers: [{ key: 'name' }, { key: 'active' }],
        // hideHeader: true,
        // pagination: {
        //   pageSize: MAX_OCC_INTEGER_VALUE,
        // },
      },
    ],
  },
};
