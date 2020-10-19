import {
  AuthGuard,
  CmsConfig,
  ParamsMapping,
  RoutingConfig,
} from '@spartacus/core';
import { AdminGuard } from '@spartacus/organization/administration/core';
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
import { CostCenterAssignedBudgetListComponent } from './budgets/assigned/cost-center-assigned-budget-list.component';
import { CostCenterBudgetListComponent } from './budgets/cost-center-budget-list.component';
import { CostCenterDetailsComponent } from './details/cost-center-details.component';
import { CostCenterFormComponent } from './form/cost-center-form.component';
import { ActiveCostCenterGuard } from './guards/active-cost-center.guard';
import { ExistCostCenterGuard } from './guards/exist-cost-center.guard';
import { CostCenterItemService } from './services/cost-center-item.service';
import { CostCenterListService } from './services/cost-center-list.service';
import { CostCenterRoutePageMetaResolver } from './services/cost-center-route-page-meta.resolver';

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
      childRoutes: {
        parent: {
          data: {
            cxPageMeta: {
              breadcrumb: 'costCenter.breadcrumbs.list',
              resolver: CostCenterRoutePageMetaResolver,
            },
          },
        },
        children: [
          {
            path: 'create',
            component: CostCenterFormComponent,
          },
          {
            path: `:${ROUTE_PARAMS.costCenterCode}`,
            component: CostCenterDetailsComponent,
            canActivate: [ExistCostCenterGuard],
            data: {
              cxPageMeta: { breadcrumb: 'costCenter.breadcrumbs.details' },
            },
            children: [
              {
                path: 'edit',
                component: CostCenterFormComponent,
                canActivate: [ActiveCostCenterGuard],
              },
              {
                path: 'budgets',
                data: {
                  cxPageMeta: {
                    breadcrumb: 'costCenter.breadcrumbs.budgets',
                  },
                },
                children: [
                  {
                    path: '',
                    component: CostCenterAssignedBudgetListComponent,
                  },
                  {
                    path: 'assign',
                    component: CostCenterBudgetListComponent,
                  },
                ],
              },
            ],
          },
        ],
      },
      guards: [AuthGuard, AdminGuard],
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
        cells: {
          name: {
            dataComponent: ActiveLinkCellComponent,
          },
          active: {
            dataComponent: StatusCellComponent,
          },
          currency: {
            dataComponent: OrganizationCellComponent,
          },
          unit: {
            dataComponent: UnitCellComponent,
          },
        },
      },
    },

    [OrganizationTableType.COST_CENTER_ASSIGNED_BUDGETS]: {
      cells: ['name', 'actions'],
      options: {
        cells: {
          name: {
            linkable: false,
          },
          actions: {
            dataComponent: AssignCellComponent,
          },
        },
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
      },
    },

    [OrganizationTableType.COST_CENTER_BUDGETS]: {
      cells: ['name', 'actions'],
      options: {
        cells: {
          name: {
            linkable: false,
          },
          actions: {
            dataComponent: AssignCellComponent,
          },
        },
      },
    },
  },
};
