import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core';
import { Budget, BudgetService, RoutingService } from '@spartacus/core';
import { ModalService } from '@spartacus/storefront';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-budget-details',
  templateUrl: './budget-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetDetailsComponent {
  budget$ = this.routingService.getParams().pipe(
    map((params) => params['budgetKey']),
    tap((code) => this.budgetService.loadBudget(code)),
    switchMap((code) => this.budgetService.get(code))
  );

  constructor(
    protected routingService: RoutingService,
    protected modalService: ModalService,
    protected budgetService: BudgetService
  ) {}

  update(budget: Budget) {
    this.budgetService.update(budget.code, budget);
  }

  openModal(template: TemplateRef<any>): void {
    this.modalService.open(template, {
      centered: true,
    });
  }
}
