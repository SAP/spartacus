import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RoutingService } from '@spartacus/core';
import { FormUtils } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import {
  map,
  shareReplay,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { Budget } from '../../../core/model/budget.model';
import { BudgetService } from '../../../core/services/budget.service';
import { CurrentBudgetService } from '../current-budget.service';
import { BudgetFormService } from '../form/budget-form.service';

@Component({
  selector: 'cx-budget-edit',
  templateUrl: './budget-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CurrentBudgetService],
})
export class BudgetEditComponent {
  protected code$ = this.currentBudgetService.code$;

  protected budget$: Observable<Budget> = this.code$.pipe(
    tap((code) => this.budgetService.loadBudget(code)),
    switchMap((code) => this.budgetService.get(code)),
    shareReplay({ bufferSize: 1, refCount: true }) // we have side effects here, we want the to run only once
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
    protected budgetService: BudgetService,
    protected budgetFormService: BudgetFormService,
    protected currentBudgetService: CurrentBudgetService,
    // we can't do without the router as the routingService is unable to
    // resolve the parent routing params. `paramsInheritanceStrategy: 'always'`
    // would actually fix that.
    protected routingService: RoutingService
  ) {}

  save(budgetCode: string, form: FormGroup): void {
    if (form.invalid) {
      form.markAllAsTouched();
      FormUtils.deepUpdateValueAndValidity(form);
    } else {
      form.disable();
      this.budgetService.update(budgetCode, form.value);

      this.routingService.go({
        cxRoute: 'budgetDetails',
        params: form.value,
      });
    }
  }
}
