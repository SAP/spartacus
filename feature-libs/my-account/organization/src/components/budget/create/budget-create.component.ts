import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RoutingService } from '@spartacus/core';
import { map } from 'rxjs/operators';
import { BudgetFormService } from '../form/budget-form.service';
import { Observable } from 'rxjs';
import { BudgetService } from '../../../core/services/budget.service';
import { FormUtils } from '@spartacus/storefront';

@Component({
  selector: 'cx-budget-create',
  templateUrl: './budget-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetCreateComponent {
  // It would be nice to replace this query param approach with a session service that
  // provides a generic approach for session-interests, so that we can autofill forms, without
  // changing the URL. This can keep the current language, currency, parent unit, cost center, cost-center, etc.
  protected parentUnit$: Observable<
    string
  > = this.routingService
    .getRouterState()
    .pipe(map((routingData) => routingData.state.queryParams?.['parentUnit']));

  form$: Observable<FormGroup> = this.parentUnit$.pipe(
    map((parentUnit: string) =>
      this.budgetFormService.getForm({ orgUnit: { uid: parentUnit } })
    )
  );

  constructor(
    protected budgetService: BudgetService,
    protected budgetFormService: BudgetFormService,
    protected routingService: RoutingService
  ) {}

  save(form: FormGroup): void {
    if (form.invalid) {
      form.markAllAsTouched();
      FormUtils.deepUpdateValueAndValidity(form);
    } else {
      form.disable();
      this.budgetService.create(form.value);

      this.routingService.go({
        cxRoute: 'budgetDetails',
        params: form.value,
      });
    }
  }
}
