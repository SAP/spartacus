import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { first, shareReplay, switchMap, tap } from 'rxjs/operators';
import { Budget } from '../../../core/model/budget.model';
import { BudgetService } from '../../../core/services/budget.service';
import { OrganizationMessageComponent } from '../../shared/organization-message/organization-message.component';
import { BudgetItemService } from '../services/budget-item.service';

@Component({
  selector: 'cx-budget-details',
  templateUrl: './budget-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetDetailsComponent {
  @ViewChild(OrganizationMessageComponent, {
    read: OrganizationMessageComponent,
  })
  messageBox: OrganizationMessageComponent;

  /**
   * The model of the current budget.
   *
   * It reloads the model when the code of the current budget center changes.
   */
  model$: Observable<Budget> = this.budgetItemService.key$.pipe(
    tap((code) => this.budgetService.loadBudget(code)),
    switchMap((code) => this.budgetService.get(code)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(
    protected budgetService: BudgetService,
    protected budgetItemService: BudgetItemService
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
}
