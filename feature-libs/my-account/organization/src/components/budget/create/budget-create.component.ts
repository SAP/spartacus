import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BudgetService } from '@spartacus/core';
import { FormUtils } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrentBudgetService } from '../current-budget.service';
import { BudgetFormService } from '../form/budget-form.service';

@Component({
  selector: 'cx-budget-create',
  templateUrl: './budget-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetCreateComponent {
  protected parentUnit$ = this.currentBudgetService.parentUnit$;

  form$: Observable<FormGroup> = this.parentUnit$.pipe(
    map((parentUnit: string) =>
      this.budgetFormService.getForm({ orgUnit: { uid: parentUnit } })
    )
  );

  constructor(
    protected currentBudgetService: CurrentBudgetService,
    protected budgetService: BudgetService,
    protected budgetFormService: BudgetFormService
  ) {}

  save(form: FormGroup): void {
    if (form.invalid) {
      form.markAllAsTouched();
      FormUtils.deepUpdateValueAndValidity(form);
    } else {
      form.disable();
      this.budgetService.create(form.value);
      this.currentBudgetService.launch(form.value);
    }
  }
}
