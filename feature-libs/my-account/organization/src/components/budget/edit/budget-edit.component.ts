import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
import { RoutingParamService } from '../../routing-param.service';
import { BudgetFormService } from '../form/budget-form.service';
import { BudgetListService } from '../list/budget-list.service';

@Component({
  selector: 'cx-budget-edit',
  templateUrl: './budget-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetEditComponent {
  protected budget$: Observable<Budget> = this.paramRoutingService.params$.pipe(
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
      this.paramRoutingService.params$.pipe(
        map((params) => params['budgetKey'])
      )
    ),
    map(([form, budget, code]) => ({ form, code, budget }))
  );

  constructor(
    protected budgetListService: BudgetListService,
    protected budgetService: BudgetService,
    protected budgetFormService: BudgetFormService,
    protected activatedRoute: ActivatedRoute,
    // we can't do without the router as the routingService is unable to
    // resolve the parent routing params. `paramsInheritanceStrategy: 'always'`
    // would actually fix that.
    protected routingService: RoutingService,
    protected paramRoutingService: RoutingParamService
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
