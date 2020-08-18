import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Budget, BudgetService } from '@spartacus/core';
import { FormUtils } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import {
  map,
  shareReplay,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { CurrentBudgetService } from '../current-budget.service';
import { BudgetFormService } from '../form/budget-form.service';

@Component({
  selector: 'cx-budget-edit',
  templateUrl: './budget-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetEditComponent {
  protected code$ = this.currentBudgetService.code$;

  protected budget$: Observable<Budget> = this.currentBudgetService.code$.pipe(
    tap((code) => this.budgetService.loadBudget(code)),
    switchMap(() => this.currentBudgetService.model$),
    // we have side effects here, we want the to run only once
    shareReplay({ bufferSize: 1, refCount: true })
  );

  protected form$: Observable<FormGroup> = this.budget$.pipe(
    map((budget) => this.budgetFormService.getForm(budget))
  );

  // We have to keep all observable values consistent for a view,
  // that's why we are wrapping them into one observable
  viewModel$ = this.form$.pipe(
    withLatestFrom(this.budget$, this.code$),
    map(([form, budget, code]) => ({ form, code, budget }))
  );

  constructor(
    protected currentBudgetService: CurrentBudgetService,
    protected budgetService: BudgetService,
    protected budgetFormService: BudgetFormService
  ) {}

  save(budgetCode: string, form: FormGroup): void {
    if (form.invalid) {
      form.markAllAsTouched();
      FormUtils.deepUpdateValueAndValidity(form);
    } else {
      form.disable();
      this.budgetService.update(budgetCode, form.value);
      this.currentBudgetService.launch('budgetDetails', form.value);
    }
  }
}
