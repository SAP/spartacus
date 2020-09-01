import {
  AuthGuard,
  CmsConfig,
  ParamsMapping,
  RoutingConfig,
} from '@spartacus/core';
import { SplitViewDeactivateGuard, TableConfig } from '@spartacus/storefront';
import { ROUTE_PARAMS } from '../constants';
import { CurrentOrganizationItemService } from '../shared/current-organization-item.service';
import { OrganizationListComponent } from '../shared/organization-list/organization-list.component';
import { OrganizationListService } from '../shared/organization-list/organization-list.service';
import { ActiveLinkCellComponent } from '../shared/organization-table';
import { AmountCellComponent } from '../shared/organization-table/amount/amount-cell.component';
import { DateRangeCellComponent } from '../shared/organization-table/date-range/date-range-cell.component';
import { StatusCellComponent } from '../shared/organization-table/status/status-cell.component';
import { UnitCellComponent } from '../shared/organization-table/unit/unit-cell.component';
import { OrganizationTableType } from '../shared/organization.model';
import { CellActionsComponent } from './cost-centers/cell-actions/cell-actions.component';
import { BudgetCostCenterListComponent } from './cost-centers/list/budget-cost-center-list.component';
import { BudgetCreateComponent } from './create/budget-create.component';
import { BudgetDetailsComponent } from './details/budget-details.component';
import { BudgetEditComponent } from './edit/budget-edit.component';
import { BudgetListService } from './services';
import { CurrentBudgetService } from './services/current-budget.service';

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
      component: OrganizationListComponent,
      providers: [
        {
          provide: OrganizationListService,
          useExisting: BudgetListService,
        },
        {
          provide: CurrentOrganizationItemService,
          useExisting: CurrentBudgetService,
        },
      ],
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

    [OrganizationTableType.BUDGET_COST_CENTERS]: {
      cells: ['name', 'actions'],
      options: {
        cells: {
          name: {
            dataComponent: ActiveLinkCellComponent,
          },
          actions: {
            dataComponent: CellActionsComponent,
          },
        },
      },
    },
  },
};
