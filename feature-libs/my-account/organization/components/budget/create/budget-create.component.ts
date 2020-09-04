import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RoutingService } from '@spartacus/core';
import { FormUtils } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BudgetService } from '@spartacus/my-account/organization/core';
import { CurrentBudgetService } from '../current-budget.service';
import { BudgetFormService } from '../form/budget-form.service';

@Component({
  selector: 'cx-budget-create',
  templateUrl: './budget-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetCreateComponent {
  form$: Observable<FormGroup> = this.currentBudgetService.b2bUnit$.pipe(
    map((parentUnit: string) =>
      this.budgetFormService.getForm({ orgUnit: { uid: parentUnit } })
    )
  );

  constructor(
    protected budgetService: BudgetService,
    protected budgetFormService: BudgetFormService,
    protected currentBudgetService: CurrentBudgetService,
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
