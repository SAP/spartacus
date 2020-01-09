import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BudgetAdapter } from '../../../organization/connectors/budget/budget.adapter';
import {
  BUDGET_NORMALIZER,
  BUDGETS_NORMALIZER,
} from '../../../organization/connectors/budget/converters';
import {
  B2BUNIT_NORMALIZER,
  B2BUNIT_LIST_NORMALIZER,
} from '../../../organization/connectors/org-unit/converters';

import { OccBudgetAdapter } from './occ-budget.adapter';
import { OccBudgetNormalizer } from './converters/occ-budget-normalizer';
import { OrgUnitAdapter } from '../../../organization/connectors/org-unit/org-unit.adapter';
import { OccOrgUnitAdapter } from './occ-org-unit.adapter';
import { OccOrgUnitNormalizer } from './converters/occ-org-unit-normalizer';
import { defaultOccOrganizationConfig } from './default-occ-organization-config';
import { ConfigModule } from '../../../config/config.module';
import { OccBudgetListNormalizer } from './converters/occ-budget-list-normalizer';
import { OccOrgUnitListNormalizer } from './converters/occ-org-unit-list-normalizer';

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
  ],
})
export class OrganizationOccModule {}
