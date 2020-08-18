import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core';
import { Budget, BudgetService } from '@spartacus/core';
import { ModalService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { CurrentBudgetService } from '../current-budget.service';

@Component({
  selector: 'cx-budget-details',
  templateUrl: './budget-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetDetailsComponent {
  /**
   * The model of the current budget.
   *
   * It reloads the model when the code of the current budget center changes.
   */
  budget$: Observable<Budget> = this.currentBudgetService.model$;

  // .code$.pipe(
  //   tap((code) => this.budgetService.loadBudget(code)),
  //   switchMap((code) => this.budgetService.get(code)),
  //   shareReplay({ bufferSize: 1, refCount: true }) // we have side effects here, we want the to run only once
  // );

  constructor(
    protected currentBudgetService: CurrentBudgetService,
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
