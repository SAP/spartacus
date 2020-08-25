import {
  AuthGuard,
  CmsConfig,
  ParamsMapping,
  RoutingConfig,
} from '@spartacus/core';
import { SplitViewDeactivateGuard, TableConfig } from '@spartacus/storefront';
import { ROUTE_PARAMS } from '../constants';
import { OrganizationTableType } from '../shared/organization.model';
import { OrganizationLinkComponent } from '../shared/property-renderers/organization-link.component';
import { StatusComponent } from '../shared/property-renderers/status/status.component';
import { UnitComponent } from '../shared/property-renderers/unit/unit.component';
import { CostCenterAssignBudgetsComponent } from './budgets/assign/cost-center-assign-budgets.component';
import { CostCenterBudgetListComponent } from './budgets/list/cost-center-budget-list.component';
import { CostCenterCreateComponent } from './create/cost-center-create.component';
import { CostCenterDetailsComponent } from './details/cost-center-details.component';
import { CostCenterEditComponent } from './edit/cost-center-edit.component';
import { CostCenterListComponent } from './list/cost-center-list.component';

// TODO:#my-account-architecture - Number.MAX_VALUE?
const MAX_OCC_INTEGER_VALUE = 2147483647;

const listPath = `organization/cost-centers/:${ROUTE_PARAMS.costCenterCode}`;
const paramsMapping: ParamsMapping = {
  costCenterCode: 'code',
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
        paths: [`${listPath}`],
        paramsMapping,
      },
      costCenterBudgets: {
        paths: [`${listPath}/budgets`],
        paramsMapping,
      },
      costCenterAssignBudgets: {
        paths: [`${listPath}/budgets/assign`],
        paramsMapping,
      },
      costCenterEdit: {
        paths: [`${listPath}/edit`],
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
          path: `:${ROUTE_PARAMS.costCenterCode}`,
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
          path: `:${ROUTE_PARAMS.costCenterCode}/edit`,
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
    [OrganizationTableType.COST_CENTER]: {
      fields: ['name'],
      options: {
        hideHeader: true,
        pagination: {
          sort: 'byName',
        },
        dataRenderer: OrganizationLinkComponent,
        fields: {
          active: {
            dataRenderer: StatusComponent,
          },
          unit: {
            dataRenderer: UnitComponent,
          },
        },
      },
      lg: {
        fields: ['name', 'active', 'currency', 'unit'],
        options: {
          hideHeader: false,
        },
      },
    },
    [OrganizationTableType.COST_CENTER_BUDGETS]: {
      fields: ['summary', 'link', 'unassign'],
      options: {
        hideHeader: true,
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
      },
    },
    [OrganizationTableType.COST_CENTER_ASSIGN_BUDGETS]: {
      xs: {
        fields: ['selected', 'summary', 'link'],
        options: {
          hideHeader: true,
          pagination: {
            sort: 'byName',
          },
        },
      },
      lg: {
        fields: ['name', 'code', 'amount', 'dateRange'],
      },
    },
  },
};
