import {
  AuthGuard,
  CmsConfig,
  ParamsMapping,
  RoutingConfig,
} from '@spartacus/core';
import { SplitViewDeactivateGuard, TableConfig } from '@spartacus/storefront';
import { ROUTE_PARAMS } from '../constants';
import { OrganizationTableType } from '../shared/organization.model';
import { AmountComponent } from '../shared/property-renderers/amount/amount-value.component';
import { DateRangeComponent } from '../shared/property-renderers/date-range/date-range.component';
import { OrganizationLinkComponent } from '../shared/property-renderers/organization-link.component';
import { StatusComponent } from '../shared/property-renderers/status/status.component';
import { UnitComponent } from '../shared/property-renderers/unit/unit.component';
import { BudgetCostCenterListComponent } from './cost-centers/list/budget-cost-center-list.component';
import { BudgetCreateComponent } from './create/budget-create.component';
import { BudgetDetailsComponent } from './details/budget-details.component';
import { BudgetEditComponent } from './edit/budget-edit.component';
import { BudgetListComponent } from './list/budget-list.component';

// TODO:#my-account-architecture - Number.MAX_VALUE?
const MAX_OCC_INTEGER_VALUE = 2147483647;

const listPath = `organization/budgets/:${ROUTE_PARAMS.budgetCode}`;
const paramsMapping: ParamsMapping = {
  budgetCode: 'code',
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
        paths: [`${listPath}`],
        paramsMapping,
      },
      budgetCostCenters: {
        paths: [`${listPath}/cost-centers`],
        paramsMapping,
      },
      budgetEdit: {
        paths: [`${listPath}/edit`],
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
          path: `:${ROUTE_PARAMS.budgetCode}`,
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
          path: `:${ROUTE_PARAMS.budgetCode}/edit`,
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
    [OrganizationTableType.BUDGET]: {
      fields: ['name'],
      options: {
        hideHeader: true,
        pagination: {
          sort: 'byName',
        },
        dataRenderer: OrganizationLinkComponent,
        fields: {
          amount: {
            dataRenderer: AmountComponent,
          },
          active: {
            dataRenderer: StatusComponent,
          },
          dateRange: {
            dataRenderer: DateRangeComponent,
          },
          unit: {
            dataRenderer: UnitComponent,
          },
        },
      },
      lg: {
        options: {
          hideHeader: false,
        },
        fields: ['name', 'active', 'amount', 'dateRange', 'unit'],
      },
    },

    [OrganizationTableType.BUDGET_COST_CENTERS]: {
      fields: ['summary', 'link'],
      options: {
        hideHeader: true,
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
      },
    },
  },
};
