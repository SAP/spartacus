import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListService } from '../../shared/list/list.service';
import { BudgetCostCenterListService } from './budget-cost-center-list.service';

@Component({
  selector: 'cx-org-budget-cost-center-list',
  templateUrl: './budget-cost-center-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: ListService,
      useExisting: BudgetCostCenterListService,
    },
  ],
})
export class BudgetCostCenterListComponent {}
