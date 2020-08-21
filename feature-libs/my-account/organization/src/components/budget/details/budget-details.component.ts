import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core';
import { Budget, BudgetService } from '@spartacus/core';
import { ModalService } from '@spartacus/storefront';
import { switchMap, tap } from 'rxjs/operators';
import { CurrentBudgetService } from '../current-budget.service';

@Component({
  selector: 'cx-budget-details',
  templateUrl: './budget-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetDetailsComponent {
  readonly budget$ = this.currentBudgetService.key$.pipe(
    tap((code) => this.budgetService.loadBudget(code)),
    switchMap((code) => this.budgetService.get(code))
  );

  constructor(
    protected currentBudgetService: CurrentBudgetService,
    protected budgetService: BudgetService,
    protected modalService: ModalService
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
