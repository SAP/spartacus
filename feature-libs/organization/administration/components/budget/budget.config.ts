import { AuthGuard, CmsConfig } from '@spartacus/core';
import { AdminGuard } from '@spartacus/organization/administration/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { TableConfig } from '@spartacus/storefront';
import { MAX_OCC_INTEGER_VALUE } from '../constants';
import { CostCenterDetailsCellComponent } from '../cost-center/details-cell/cost-center-details-cell.component';
import { ItemService } from '../shared/item.service';
import { ListComponent } from '../shared/list/list.component';
import { ListService } from '../shared/list/list.service';
import { OrganizationTableType } from '../shared/organization.model';
import { ActiveLinkCellComponent } from '../shared/table';
import { AmountCellComponent } from '../shared/table/amount/amount-cell.component';
import { DateRangeCellComponent } from '../shared/table/date-range/date-range-cell.component';
import { StatusCellComponent } from '../shared/table/status/status-cell.component';
import { UnitCellComponent } from '../shared/table/unit/unit-cell.component';
import { BudgetCostCenterListComponent } from './cost-centers/budget-cost-center-list.component';
import { BudgetDetailsComponent } from './details/budget-details.component';
import { BudgetFormComponent } from './form/budget-form.component';
import { BudgetItemService } from './services/budget-item.service';
import { BudgetListService } from './services/budget-list.service';
import { BudgetRoutePageMetaResolver } from './services/budget-route-page-meta.resolver';

export const budgetCmsConfig: CmsConfig = {
  cmsComponents: {
    ManageBudgetsListComponent: {
      component: ListComponent,
      providers: [
        {
          provide: ListService,
          useExisting: BudgetListService,
        },
        {
          provide: ItemService,
          useExisting: BudgetItemService,
        },
      ],
      childRoutes: {
        parent: {
          data: {
            cxPageMeta: {
              breadcrumb: 'orgBudget.breadcrumbs.list',
              resolver: BudgetRoutePageMetaResolver,
            },
          },
        },
        children: [
          {
            path: 'create',
            component: BudgetFormComponent,
          },
          {
            path: `:${ROUTE_PARAMS.budgetCode}`,
            component: BudgetDetailsComponent,
            data: {
              cxPageMeta: {
                breadcrumb: 'orgBudget.breadcrumbs.details',
              },
            },
            children: [
              {
                path: `edit`,
                component: BudgetFormComponent,
              },
              {
                path: 'cost-centers',
                component: BudgetCostCenterListComponent,
              },
            ],
          },
        ],
      },
      guards: [AuthGuard, AdminGuard],
    },
  },
};

export function budgetTableConfigFactory(): TableConfig {
  return budgetTableConfig;
}

export const budgetTableConfig: TableConfig = {
  table: {
    [OrganizationTableType.BUDGET]: {
      cells: ['name', 'active', 'amount', 'dateRange', 'unit'],
      options: {
        cells: {
          name: {
            dataComponent: ActiveLinkCellComponent,
          },
          active: {
            dataComponent: StatusCellComponent,
          },
          amount: {
            dataComponent: AmountCellComponent,
          },
          dateRange: {
            dataComponent: DateRangeCellComponent,
          },
          unit: {
            dataComponent: UnitCellComponent,
          },
        },
      },
    },

    [OrganizationTableType.BUDGET_ASSIGNED_COST_CENTERS]: {
      cells: ['name'],
      options: {
        cells: {
          name: {
            dataComponent: CostCenterDetailsCellComponent,
          },
        },
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
      },
    },
  },
};
