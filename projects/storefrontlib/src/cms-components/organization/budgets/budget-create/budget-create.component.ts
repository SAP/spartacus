import { Component } from '@angular/core';
import { BudgetService, UrlCommandRoute } from '@spartacus/core';

@Component({
  selector: 'cx-budget-create',
  templateUrl: './budget-create.component.html',
})
export class BudgetCreateComponent {

  constructor(protected budgetService: BudgetService) {}

  routerBackLink: UrlCommandRoute = {
    cxRoute: 'budgets',
  };

  createBudget(budget) {
    this.budgetService.create(budget);
  }
}
