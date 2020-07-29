import { Component } from '@angular/core';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { OrgUnitService, RoutingService } from '@spartacus/core';
import { ActivatedRoute } from '@angular/router';
import { UnitFormService } from '../unit-form/unit-form.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cx-unit-edit',
  templateUrl: './unit-edit.component.html',
})
export class UnitEditComponent {
  protected code$: Observable<string> = this.activatedRoute.parent.params.pipe(
    map((routingData) => routingData['code'])
  );

  protected orgUnit$ = this.code$.pipe(
    tap((code) => this.orgUnitsService.load(code)),
    switchMap((code) => this.orgUnitsService.get(code))
  );

  protected form$: Observable<FormGroup> = this.orgUnit$.pipe(
    map((costCenter) => this.unitFormService.getForm(costCenter))
  );

  viewModel$ = this.form$.pipe(
    withLatestFrom(this.orgUnit$, this.code$),
    map(([form, orgUnit, code]) => ({ form, code, orgUnit }))
  );

  constructor(
    protected routingService: RoutingService,
    protected orgUnitsService: OrgUnitService,
    protected unitFormService: UnitFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  save(orgUnitCode: string, form: FormGroup): void {
    if (form.invalid) {
      form.markAllAsTouched();
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
