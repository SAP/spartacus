import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Budget, BudgetService, RoutingService } from '@spartacus/core';
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
  protected code$: Observable<string> = this.activatedRoute.parent.params.pipe(
    map((routingData) => routingData['code'])
  );

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
    protected activatedRoute: ActivatedRoute,
    // we can't do without the router as the routingService is unable to
    // resolve the parent routing params. `paramsInheritanceStrategy: 'always'`
    // would actually fix that.
    protected routingService: RoutingService
  ) {}

  save(budgetCode: string, form: FormGroup): void {
    if (form.invalid) {
      form.markAllAsTouched();
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
