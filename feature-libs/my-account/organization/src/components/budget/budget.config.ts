import { AuthGuard, CmsConfig, RoutingConfig } from '@spartacus/core';
import {
  BREAKPOINT,
  SplitViewDeactivateGuard,
  TableConfig,
} from '@spartacus/storefront';
import { OrganizationTableType } from '../shared/organization.model';
import { BudgetCreateComponent } from './create/budget-create.component';
import { BudgetDetailsComponent } from './details/budget-details.component';
import { BudgetEditComponent } from './edit/budget-edit.component';
import { BudgetListComponent } from './list/budget-list.component';
import { BudgetCostCenterListComponent } from './cost-centers/list/budget-cost-center-list.component';

// TODO:#my-account-architecture - Number.MAX_VALUE?
const MAX_OCC_INTEGER_VALUE = 2147483647;

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
        paths: ['organization/budgets/:code'],
      },
      budgetEdit: {
        paths: ['organization/budgets/:code/edit'],
      },
      budgetCostCenters: {
        paths: ['organization/budgets/:code/cost-centers'],
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
          path: ':code',
          component: BudgetDetailsComponent,
          canDeactivate: [SplitViewDeactivateGuard],
          children: [
            {
              path: 'edit',
              component: BudgetEditComponent,
              canDeactivate: [SplitViewDeactivateGuard],
            },
            {
              path: 'cost-centers',
              component: BudgetCostCenterListComponent,
              canDeactivate: [SplitViewDeactivateGuard],
            },
          ],
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
          // pageSize: 2,
        },
      },
      {
        breakpoint: BREAKPOINT.xs,
        hideHeader: true,
      },
      {
        breakpoint: BREAKPOINT.lg,
        headers: [
          { key: 'name', sortCode: 'byName' },
          { key: 'code', sortCode: 'byCode' },
          { key: 'amount', sortCode: 'byValue' },
          { key: 'dateRange' },
          { key: 'unit', sortCode: 'byUnit' },
        ],
      },
    ],

    [OrganizationTableType.BUDGET_COST_CENTERS]: [
      {
        headers: [{ key: 'summary' }, { key: 'link' }],
        hideHeader: true,
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
      },
    ],
  },
};
