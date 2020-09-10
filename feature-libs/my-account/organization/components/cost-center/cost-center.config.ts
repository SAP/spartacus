import {
  AuthGuard,
  CmsConfig,
  ParamsMapping,
  RoutingConfig,
} from '@spartacus/core';
import { TableConfig } from '@spartacus/storefront';
import { MAX_OCC_INTEGER_VALUE, ROUTE_PARAMS } from '../constants';
import { OrganizationItemService } from '../shared/organization-item.service';
import { OrganizationListComponent } from '../shared/organization-list/organization-list.component';
import { OrganizationListService } from '../shared/organization-list/organization-list.service';
import { AssignCellComponent } from '../shared/organization-sub-list/assign-cell.component';
import { ActiveLinkCellComponent } from '../shared/organization-table/active-link/active-link-cell.component';
import { OrganizationCellComponent } from '../shared/organization-table/organization-cell.component';
import { StatusCellComponent } from '../shared/organization-table/status/status-cell.component';
import { UnitCellComponent } from '../shared/organization-table/unit/unit-cell.component';
import { OrganizationTableType } from '../shared/organization.model';
import { CostCenterBudgetListComponent } from './budgets';
import { CostCenterAssignedBudgetListComponent } from './budgets/assigned/cost-center-assigned-budget-list.component';
import { CostCenterDetailsComponent } from './details/cost-center-details.component';
import { CostCenterFormComponent } from './form/cost-center-form.component';
import { CostCenterItemService } from './services/cost-center-item.service';
import { CostCenterListService } from './services/cost-center-list.service';

const listPath = `organization/cost-centers/:${ROUTE_PARAMS.costCenterCode}`;
const paramsMapping: ParamsMapping = {
  costCenterCode: 'code',
};

export const costCenterRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
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
      component: OrganizationListComponent,
      providers: [
        {
          provide: OrganizationListService,
          useExisting: CostCenterListService,
        },
        {
          provide: OrganizationItemService,
          useExisting: CostCenterItemService,
        },
      ],
      childRoutes: [
        {
          path: 'create',
          component: CostCenterFormComponent,
        },
        {
          path: `:${ROUTE_PARAMS.costCenterCode}`,
          component: CostCenterDetailsComponent,
          children: [
            {
              path: 'budgets',
              component: CostCenterAssignedBudgetListComponent,
            },
            {
              path: 'budgets/assign',
              component: CostCenterBudgetListComponent,
            },
          ],
        },
        {
          path: `:${ROUTE_PARAMS.costCenterCode}/edit`,
          component: CostCenterFormComponent,
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
      cells: ['name', 'active', 'currency', 'unit'],
      options: {
        dataComponent: OrganizationCellComponent,
        cells: {
          name: {
            dataComponent: ActiveLinkCellComponent,
          },
          active: {
            dataComponent: StatusCellComponent,
          },
          unit: {
            dataComponent: UnitCellComponent,
          },
        },
      },
    },
    [OrganizationTableType.COST_CENTER_BUDGETS]: {
      cells: ['name', 'actions'],
      options: {
        cells: {
          actions: {
            dataComponent: AssignCellComponent,
          },
        },
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
      },
    },
    [OrganizationTableType.COST_CENTER_ASSIGN_BUDGETS]: {
      cells: ['name', 'actions'],
      options: {
        cells: {
          actions: {
            dataComponent: AssignCellComponent,
          },
        },
      },
    },
  },
};
