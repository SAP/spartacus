import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core';
import { ModalService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { shareReplay, switchMap, tap } from 'rxjs/operators';
import { Budget, BudgetService } from '@spartacus/my-account/organization/core';
import { CurrentBudgetService } from '../current-budget.service';

@Component({
  selector: 'cx-budget-details',
  templateUrl: './budget-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CurrentBudgetService],
})
export class BudgetDetailsComponent {
  /**
   * The model of the current budget.
   *
   * It reloads the model when the code of the current budget center changes.
   */
  budget$: Observable<Budget> = this.currentBudgetService.key$.pipe(
    tap((code) => this.budgetService.loadBudget(code)),
    switchMap((code) => this.budgetService.get(code)),
    shareReplay({ bufferSize: 1, refCount: true }) // we have side effects here, we want the to run only once
  );

  constructor(
    protected budgetService: BudgetService,
    // TODO: consider relying on css only
    protected modalService: ModalService,
    protected currentBudgetService: CurrentBudgetService
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
