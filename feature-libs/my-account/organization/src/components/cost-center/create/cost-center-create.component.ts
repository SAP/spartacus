import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CostCenterService } from '@spartacus/core';
import { FormUtils } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrentCostCenterService } from '../current-cost-center.service';
import { CostCenterFormService } from '../form/cost-center-form.service';

@Component({
  selector: 'cx-cost-center-create',
  templateUrl: './cost-center-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CurrentCostCenterService],
})
export class CostCenterCreateComponent {
  protected parentUnit$ = this.currentCostCenterService.parentUnit$;

  form$: Observable<FormGroup> = this.parentUnit$.pipe(
    map((parentUnit: string) =>
      this.costCenterFormService.getForm({ unit: { uid: parentUnit } })
    )
  );

  constructor(
    protected currentCostCenterService: CurrentCostCenterService,
    protected costCenterService: CostCenterService,
    protected costCenterFormService: CostCenterFormService
  ) {}

  save(form: FormGroup): void {
    if (form.invalid) {
      form.markAllAsTouched();
      FormUtils.deepUpdateValueAndValidity(form);
    } else {
      form.disable();
      this.costCenterService.create(form.value);

      this.currentCostCenterService.launch('costCenterDetails', form.value);
    }
  }
}
