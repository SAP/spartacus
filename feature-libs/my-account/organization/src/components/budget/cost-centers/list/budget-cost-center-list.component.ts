import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganizationListService } from '../../../shared/organization-list/organization-list.service';
import { BudgetCostCenterListService } from './budget-cost-center-list.service';

@Component({
  selector: 'cx-budget-cost-center-list',
  templateUrl: './budget-cost-center-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: OrganizationListService,
      useExisting: BudgetCostCenterListService,
    },
  ],
})
export class BudgetCostCenterListComponent {}
