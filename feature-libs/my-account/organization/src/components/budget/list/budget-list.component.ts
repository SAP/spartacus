import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrganizationListComponent } from '../../shared/organization-list/organization-list.component';
import { CurrentBudgetService } from '../current-budget.service';
import { BudgetListService, BudgetModel } from './budget-list.service';

@Component({
  templateUrl:
    '../../shared/organization-list/organization-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetListComponent extends OrganizationListComponent<
  BudgetModel
> {
  constructor(
    protected currentBudgetService: CurrentBudgetService,
    protected budgetService: BudgetListService
  ) {
    super(budgetService, currentBudgetService);
  }
}
