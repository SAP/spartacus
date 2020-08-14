import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Budget, BudgetService, RoutingService } from '@spartacus/core';
import { FormUtils } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import {
  map,
  shareReplay,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { BudgetFormService } from '../form/budget-form.service';

@Component({
  selector: 'cx-budget-edit',
  templateUrl: './budget-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetEditComponent {
  protected budget$: Observable<Budget> = this.routingService.getParams().pipe(
    map((params) => params['budgetKey']),
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
    withLatestFrom(
      this.budget$,
      this.routingService.getParams().pipe(map((params) => params['budgetKey']))
    ),
    map(([form, budget, code]) => ({ form, code, budget }))
  );

  constructor(
    protected budgetService: BudgetService,
    protected budgetFormService: BudgetFormService,
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
