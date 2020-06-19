import { AuthGuard, CmsConfig, RoutingConfig } from '@spartacus/core';
import { BREAKPOINT } from '../../layout/config/layout-config';
import { CompanyTables } from '../model';
import { OrganizationOutletComponent } from '../shared/organization-outlet/organization-outlet.component';
import { TableConfig } from '../shared/table/config/table.config';
import { CostCenterBudgetComponent } from './cost-center-budget/cost-center-budget.component';
import { CostCenterCreateComponent } from './cost-center-create/cost-center-create.component';
import { CostCenterDetailsComponent } from './cost-center-details/cost-center-details.component';
import { CostCenterEditComponent } from './cost-center-edit/cost-center-edit.component';
import { CostCenterListComponent } from './cost-center-list/cost-center-list.component';

export const costCenterRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      costCenter: {
        paths: ['organization/cost-centers'],
      },
      costCenterDetails: {
        paths: ['organization/cost-centers/:code'],
      },
      costCenterBudget: {
        paths: ['organization/cost-centers/:code/budget/:budgetCode'],
      },
    },
  },
};

export const costCenterCmsConfig: CmsConfig = {
  cmsComponents: {
    ManageCostCentersListComponent: {
      component: OrganizationOutletComponent,
      childRoutes: [
        {
          path: '',
          component: CostCenterListComponent,
          children: [
            {
              path: 'create',
              component: CostCenterCreateComponent,
            },
            {
              path: ':code',
              component: CostCenterDetailsComponent,
              children: [
                {
                  path: 'edit',
                  component: CostCenterEditComponent,
                },
              ],
            },
            {
              path: ':code/budget/:budgetCode',
              component: CostCenterBudgetComponent,
            },
          ],
        },
      ],
      guards: [AuthGuard],
    },
  },
};

export const costCenterTableConfig: TableConfig = {
  table: {
    [CompanyTables.COST_CENTER]: [
      {
        labels: [{ key: 'name' }],
        hideLabels: true,
      },
      {
        breakpoint: BREAKPOINT.md,
        labels: [{ key: 'name' }, { key: 'unit' }],
      },
      {
        breakpoint: BREAKPOINT.lg,
        labels: [
          { key: 'name', sortCode: 'byName' },
          { key: 'code', sortCode: 'byCode' },
          { key: 'currency' },
          { key: 'unit', sortCode: 'byUnit' },
        ],
      },
    ],
  },
};
