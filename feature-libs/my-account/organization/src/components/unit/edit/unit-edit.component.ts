import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { OrgUnitService, RoutingService } from '@spartacus/core';
import { UnitFormService } from '../form/unit-form.service';
import { FormGroup } from '@angular/forms';
import { CurrentUnitService } from '../current-unit.service';
import { FormUtils } from 'projects/storefrontlib/src/utils';

@Component({
  selector: 'cx-unit-edit',
  templateUrl: './unit-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitEditComponent {
  protected form$: Observable<FormGroup> = this.currentUnitService.unit$.pipe(
    map((unit) => this.unitFormService.getForm(unit))
  );

  viewModel$ = this.form$.pipe(
    withLatestFrom(this.currentUnitService.unit$),
    map(([form, orgUnit]) => ({ form, orgUnit }))
  );

  constructor(
    protected routingService: RoutingService,
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

      this.routingService.go({
        cxRoute: 'orgUnitDetails',
        params: form.value,
      });
    }
  }
}
