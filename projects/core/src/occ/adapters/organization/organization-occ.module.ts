import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BudgetAdapter } from '../../../organization/connectors/budget/budget.adapter';
import { BUDGET_NORMALIZER } from '../../../organization/connectors/budget/converters';
import { OccBudgetAdapter } from './occ-budget.adapter';
import { OccBudgetNormalizer } from './converters/occ-budget-normalizer';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: BudgetAdapter,
      useClass: OccBudgetAdapter,
    },
    { provide: BUDGET_NORMALIZER, useClass: OccBudgetNormalizer, multi: true },
  ],
})
export class OrganizationOccModule {}
