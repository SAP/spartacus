import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganizationListService } from '../../../shared/organization-list/organization-list.service';
import { CostCenterBudgetListService } from './cost-center-budget-list.service';

@Component({
  templateUrl: './cost-center-budget-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: OrganizationListService,
      useExisting: CostCenterBudgetListService,
    },
  ],
})
export class CostCenterBudgetListComponent {}
