import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganizationListService } from '../../../shared/organization-list/organization-list.service';
import { CostCenterAssignBudgetListService } from './cost-center-assign-budgets.service';

@Component({
  templateUrl: './cost-center-assign-budgets.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: OrganizationListService,
      useExisting: CostCenterAssignBudgetListService,
    },
  ],
})
export class CostCenterAssignBudgetsComponent {}
