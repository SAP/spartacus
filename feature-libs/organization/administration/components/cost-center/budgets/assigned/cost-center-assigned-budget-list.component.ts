import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganizationListService } from '../../../shared/organization-list/organization-list.service';
import { CostCenterAssignedBudgetListService } from './cost-center-assigned-budget-list.service';

@Component({
  templateUrl: './cost-center-assigned-budget-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: OrganizationListService,
      useExisting: CostCenterAssignedBudgetListService,
    },
  ],
})
export class CostCenterAssignedBudgetListComponent {}
