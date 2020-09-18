import {
  AuthGuard,
  CmsConfig,
  ParamsMapping,
  RoutingConfig,
} from '@spartacus/core';
import { AdminGuard } from '@spartacus/my-account/organization/core';
import { TableConfig } from '@spartacus/storefront';
import { MAX_OCC_INTEGER_VALUE, ROUTE_PARAMS } from '../constants';
import { OrganizationItemService } from '../shared/organization-item.service';
import { OrganizationListComponent } from '../shared/organization-list/organization-list.component';
import { OrganizationListService } from '../shared/organization-list/organization-list.service';
import { ActiveLinkCellComponent } from '../shared/organization-table';
import { AmountCellComponent } from '../shared/organization-table/amount/amount-cell.component';
import { DateRangeCellComponent } from '../shared/organization-table/date-range/date-range-cell.component';
import { StatusCellComponent } from '../shared/organization-table/status/status-cell.component';
import { UnitCellComponent } from '../shared/organization-table/unit/unit-cell.component';
import { OrganizationTableType } from '../shared/organization.model';
import { BudgetCostCenterListComponent } from './cost-centers/budget-cost-center-list.component';
import { BudgetDetailsComponent } from './details/budget-details.component';
import { BudgetFormComponent } from './form/budget-form.component';
import { ActiveBudgetGuard } from './guards/active-budget.guard';
import { ExistBudgetGuard } from './guards/exist-budget.guard';
import { BudgetItemService } from './services/budget-item.service';
import { BudgetListService } from './services/budget-list.service';

const listPath = `organization/budgets/:${ROUTE_PARAMS.budgetCode}`;
const paramsMapping: ParamsMapping = {
  budgetCode: 'code',
};

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
      component: OrganizationListComponent,
      providers: [
        {
          provide: OrganizationListService,
          useExisting: BudgetListService,
        },
        {
          provide: OrganizationItemService,
          useExisting: BudgetItemService,
        },
      ],
      childRoutes: [
        {
          path: 'create',
          component: BudgetFormComponent,
        },
        {
          path: `:${ROUTE_PARAMS.budgetCode}`,
          component: BudgetDetailsComponent,
          canActivate: [ExistBudgetGuard],
          children: [
            {
              path: `edit`,
              component: BudgetFormComponent,
              canActivate: [ActiveBudgetGuard],
            },
            {
              path: 'cost-centers',
              component: BudgetCostCenterListComponent,
            },
          ],
        },
      ],
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
        pagination: {
          pageSize: MAX_OCC_INTEGER_VALUE,
        },
      },
    },
  },
};
