import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalService } from '@spartacus/storefront';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, shareReplay, switchMap, tap } from 'rxjs/operators';
import { Budget } from '../../../core/model/budget.model';
import { BudgetService } from '../../../core/services/budget.service';
import { CurrentBudgetService } from '../services/current-budget.service';

@Component({
  selector: 'cx-budget-details',
  templateUrl: './budget-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetDetailsComponent {
  confirm$ = new BehaviorSubject(null);

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

  toggleConfirm(item: Budget) {
    const confirmObj = {
      message: item.active
        ? 'budget.messages.deactivate'
        : 'budget.messages.activate',
    };
    this.confirm$.next(confirmObj);
  }

  cancelConfirm() {
    this.confirm$.next(null);
  }

  toggleActive(model: Budget) {
    const budget = { ...model };
    budget.active = !budget.active;
    this.cancelConfirm();
    this.budget$
      .pipe(first((update) => update.active === budget.active))
      .subscribe((update) => {
        this.confirm$.next({
          message: update.active ? 'is activated!' : 'is deactivated!',
        });
      });
    this.budgetService.update(budget.code, budget);
  }
}
