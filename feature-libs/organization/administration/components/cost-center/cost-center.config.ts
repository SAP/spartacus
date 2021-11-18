import { AuthGuard, CmsConfig } from '@spartacus/core';
import { AdminGuard } from '@spartacus/organization/administration/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { TableConfig } from '@spartacus/storefront';
import { BudgetDetailsCellComponent } from '../budget/details-cell/budget-details-cell.component';
import { MAX_OCC_INTEGER_VALUE } from '../constants';
import { ItemService } from '../shared/item.service';
import { ListComponent } from '../shared/list/list.component';
import { ListService } from '../shared/list/list.service';
import { OrganizationTableType } from '../shared/organization.model';
import { AssignCellComponent } from '../shared/sub-list/assign-cell.component';
import { ActiveLinkCellComponent } from '../shared/table/active-link/active-link-cell.component';
import { CellComponent } from '../shared/table/cell.component';
import { StatusCellComponent } from '../shared/table/status/status-cell.component';
import { UnitCellComponent } from '../shared/table/unit/unit-cell.component';
import { CostCenterAssignedBudgetListComponent } from './budgets/assigned/cost-center-assigned-budget-list.component';
import { CostCenterBudgetListComponent } from './budgets/cost-center-budget-list.component';
import { CostCenterDetailsComponent } from './details/cost-center-details.component';
import { CostCenterFormComponent } from './form/cost-center-form.component';
import { CostCenterItemService } from './services/cost-center-item.service';
import { CostCenterListService } from './services/cost-center-list.service';
import { CostCenterRoutePageMetaResolver } from './services/cost-center-route-page-meta.resolver';

export const costCenterCmsConfig: CmsConfig = {
  cmsComponents: {
    ManageCostCentersListComponent: {
      component: ListComponent,
      providers: [
        {
          provide: ListService,
          useExisting: CostCenterListService,
        },
        {
          provide: ItemService,
          useExisting: CostCenterItemService,
        },
      ],
      childRoutes: {
        parent: {
          data: {
            cxPageMeta: {
              breadcrumb: 'orgCostCenter.breadcrumbs.list',
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
            data: {
              cxPageMeta: { breadcrumb: 'orgCostCenter.breadcrumbs.details' },
            },
            children: [
              {
                path: 'edit',
                component: CostCenterFormComponent,
              },
              {
                path: 'budgets',
                data: {
                  cxPageMeta: {
                    breadcrumb: 'orgCostCenter.breadcrumbs.budgets',
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
            dataComponent: CellComponent,
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
            dataComponent: BudgetDetailsCellComponent,
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
            dataComponent: BudgetDetailsCellComponent,
          },
          actions: {
            dataComponent: AssignCellComponent,
          },
        },
      },
    },
  },
};
