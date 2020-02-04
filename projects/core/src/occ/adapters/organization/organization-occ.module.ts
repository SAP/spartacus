import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ConfigModule } from '../../../config/config.module';
import { BudgetAdapter } from '../../../organization/connectors/budget/budget.adapter';
import { PermissionAdapter } from '../../../organization/connectors/permission/permission.adapter';
import { OrgUnitAdapter } from '../../../organization/connectors/org-unit/org-unit.adapter';
import { CostCenterAdapter } from '../../../organization/connectors/cost-center/cost-center.adapter';
import {
  BUDGET_NORMALIZER,
  BUDGETS_NORMALIZER,
} from '../../../organization/connectors/budget/converters';
import {
  B2BUNIT_NORMALIZER,
  B2BUNIT_LIST_NORMALIZER,
} from '../../../organization/connectors/org-unit/converters';
import {
  PERMISSION_NORMALIZER,
  PERMISSIONS_NORMALIZER,
} from '../../../organization/connectors/permission/converters';
import {
  COST_CENTER_NORMALIZER,
  COST_CENTERS_NORMALIZER,
} from '../../../organization/connectors/cost-center/converters';

import { defaultOccOrganizationConfig } from './default-occ-organization-config';
import { OccBudgetAdapter } from './occ-budget.adapter';
import { OccOrgUnitAdapter } from './occ-org-unit.adapter';
import { OccPermissionAdapter } from './occ-permission.adapter';
import { OccCostCenterAdapter } from './occ-cost-center.adapter';
import {
  OccBudgetNormalizer,
  OccBudgetListNormalizer,
  OccOrgUnitNormalizer,
  OccOrgUnitListNormalizer,
  OccPermissionNormalizer,
  OccPermissionListNormalizer,
  OccCostCenterListNormalizer,
  OccCostCenterNormalizer,
} from './converters/index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ConfigModule.withConfig(defaultOccOrganizationConfig),
  ],
  providers: [
    {
      provide: BudgetAdapter,
      useClass: OccBudgetAdapter,
    },
    { provide: BUDGET_NORMALIZER, useClass: OccBudgetNormalizer, multi: true },
    {
      provide: BUDGETS_NORMALIZER,
      useClass: OccBudgetListNormalizer,
      multi: true,
    },
    {
      provide: OrgUnitAdapter,
      useClass: OccOrgUnitAdapter,
    },
    {
      provide: B2BUNIT_NORMALIZER,
      useClass: OccOrgUnitNormalizer,
      multi: true,
    },
    {
      provide: B2BUNIT_LIST_NORMALIZER,
      useClass: OccOrgUnitListNormalizer,
      multi: true,
    },
    {
      provide: PermissionAdapter,
      useClass: OccPermissionAdapter,
    },
    {
      provide: PERMISSION_NORMALIZER,
      useClass: OccPermissionNormalizer,
      multi: true,
    },
    {
      provide: PERMISSIONS_NORMALIZER,
      useClass: OccPermissionListNormalizer,
      multi: true,
    },
    {
      provide: CostCenterAdapter,
      useClass: OccCostCenterAdapter,
    },
    {
      provide: COST_CENTER_NORMALIZER,
      useClass: OccCostCenterNormalizer,
      multi: true,
    },
    {
      provide: COST_CENTERS_NORMALIZER,
      useClass: OccCostCenterListNormalizer,
      multi: true,
    },
  ],
})
export class OrganizationOccModule {}
