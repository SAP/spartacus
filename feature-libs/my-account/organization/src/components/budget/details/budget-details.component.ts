import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Budget, BudgetService } from '@spartacus/core';
import { ModalService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-budget-details',
  templateUrl: './budget-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetDetailsComponent {
  protected code$: Observable<string> = this.route.params.pipe(
    map((params) => params['code']),
    filter((code) => Boolean(code))
  );

  budget$: Observable<Budget> = this.code$.pipe(
    // TODO: we should do this in the facade
    tap((code) => this.budgetService.loadBudget(code)),
    switchMap((code) => this.budgetService.get(code)),
    filter((budgets) => Boolean(budgets))
  );

  constructor(
    protected route: ActivatedRoute,
    protected budgetService: BudgetService,
    // TODO: consider relying on css only
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
