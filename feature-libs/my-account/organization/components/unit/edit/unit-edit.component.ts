import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RoutingService } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { FormUtils } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { CurrentUnitService } from '../current-unit.service';
import { UnitFormService } from '../form/unit-form.service';

@Component({
  selector: 'cx-unit-edit',
  templateUrl: './unit-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitEditComponent {
  protected form$: Observable<FormGroup> = this.currentUnitService.item$.pipe(
    map((unit) => this.unitFormService.getForm(unit))
  );

  viewModel$ = this.form$.pipe(
    withLatestFrom(this.currentUnitService.item$),
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
