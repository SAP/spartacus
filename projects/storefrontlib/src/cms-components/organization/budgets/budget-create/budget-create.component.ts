import { Component } from '@angular/core';
import { BudgetService, RoutingService } from '@spartacus/core';

@Component({
  selector: 'cx-budget-create',
  templateUrl: './budget-create.component.html',
})
export class BudgetCreateComponent {
  constructor(
    protected budgetService: BudgetService,
    protected routingService: RoutingService
  ) {}

  createBudget(budget) {
    this.budgetService.create(budget);
    this.routingService.go({
      cxRoute: 'budgetDetails',
      params: budget,
    });
  }
}
