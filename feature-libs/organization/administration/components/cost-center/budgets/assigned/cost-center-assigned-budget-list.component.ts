import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListService } from '../../../shared/list/list.service';
import { CostCenterAssignedBudgetListService } from './cost-center-assigned-budget-list.service';

@Component({
  selector: 'cx-org-cost-center-assigned-budget-list',
  templateUrl: './cost-center-assigned-budget-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: ListService,
      useExisting: CostCenterAssignedBudgetListService,
    },
  ],
})
export class CostCenterAssignedBudgetListComponent {}
