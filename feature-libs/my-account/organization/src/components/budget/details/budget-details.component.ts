import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { first, shareReplay, switchMap, tap } from 'rxjs/operators';
import { Budget } from '../../../core/model/budget.model';
import { BudgetService } from '../../../core/services/budget.service';
import { OrganizationMessageComponent as MsgBox } from '../../shared/organization-message/organization-message.component';
import { CurrentBudgetService } from '../services/current-budget.service';

@Component({
  // selector: 'cx-budget-details',
  templateUrl: './budget-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetDetailsComponent {
  @ViewChild(MsgBox, { read: MsgBox }) messageBox: MsgBox;

  // confirm$ = new BehaviorSubject(null);

  /**
   * The model of the current budget.
   *
   * It reloads the model when the code of the current budget center changes.
   */
  model$: Observable<Budget> = this.currentBudgetService.key$.pipe(
    tap((code) => this.budgetService.loadBudget(code)),
    switchMap((code) => this.budgetService.get(code)),
    shareReplay({ bufferSize: 1, refCount: true }) // we have side effects here, we want the to run only once
  );

  constructor(
    protected budgetService: BudgetService,
    protected currentBudgetService: CurrentBudgetService
  ) {}

  toggleActive(model: Budget) {
    if (model.active) {
      this.messageBox.prompt('budget.messages.deactivate');
    } else {
      this.update(model);
    }
  }

  protected update(model: Budget): void {
    const budget = { ...model, active: !model.active };
    this.budgetService.update(budget.code, budget);
    this.confirmMessage(budget);
  }

  protected confirmMessage(model: Budget): void {
    this.messageBox.close();
    this.model$
      .pipe(first((update) => update.active === model.active))
      .subscribe((update) => {
        this.messageBox.notify(
          update.active
            ? 'budget.messages.confirmEnabled'
            : 'budget.messages.confirmDisabled'
        );
      });
  }

  // toggleConfirm(item: Budget) {
  //   const confirmObj = {
  //     message: item.active
  //       ? 'budget.messages.deactivate'
  //       : 'budget.messages.activate',
  //   };
  //   this.confirm$.next(confirmObj);
  // }

  // cancelConfirm() {
  //   this.confirm$.next(null);
  // }

  // toggleActive(model: Budget) {
  //   const budget = { ...model };
  //   budget.active = !budget.active;
  //   this.cancelConfirm();
  //   this.model$
  //     .pipe(first((update) => update.active === budget.active))
  //     .subscribe((update) => {
  //       this.confirm$.next({
  //         message: update.active ? 'is activated!' : 'is deactivated!',
  //       });
  //     });
  //   this.budgetService.update(budget.code, budget);
  // }
}
