import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OrgUnitService } from '@spartacus/core';
import { FormUtils } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { CurrentUnitService } from '../current-unit.service';
import { UnitFormService } from '../form/unit-form.service';

@Component({
  selector: 'cx-unit-edit',
  templateUrl: './unit-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CurrentUnitService],
})
export class UnitEditComponent {
  protected form$: Observable<FormGroup> = this.currentUnitService.model$.pipe(
    map((unit) => this.unitFormService.getForm(unit))
  );

  viewModel$ = this.form$.pipe(
    withLatestFrom(this.currentUnitService.code$),
    map(([form, b2bUnit]) => ({ form, b2bUnit: { uid: b2bUnit } }))
  );

  constructor(
    protected orgUnitsService: OrgUnitService,
    protected unitFormService: UnitFormService,
    protected currentUnitService: CurrentUnitService
  ) {}

  save(orgUnitCode: string, form: FormGroup): void {
    if (form.invalid) {
      form.markAllAsTouched();
      FormUtils.deepUpdateValueAndValidity(form);
    } else {
      form.disable();
      this.orgUnitsService.update(orgUnitCode, form.value);
      this.currentUnitService.launch('orgUnitDetails', form.value);
    }
  }
}
