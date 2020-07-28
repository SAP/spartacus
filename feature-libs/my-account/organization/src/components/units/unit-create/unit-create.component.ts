import { Component } from '@angular/core';
import { OrgUnitService, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { UnitFormService } from '../unit-form/unit-form.service';

@Component({
  selector: 'cx-unit-create',
  templateUrl: './unit-create.component.html',
})
export class UnitCreateComponent {
  parentUnit$: Observable<string> = this.routingService
    .getRouterState()
    .pipe(map((routingData) => routingData.state.queryParams?.['parentUnit']));

  form$: Observable<FormGroup> = this.parentUnit$.pipe(
    map((parentUnit: string) =>
      this.unitFormService.getForm({ parentOrgUnit: { uid: parentUnit } })
    )
  );

  constructor(
    protected orgUnitService: OrgUnitService,
    protected routingService: RoutingService,
    protected unitFormService: UnitFormService
  ) {}

  save(event: any, form: FormGroup): void {
    event.preventDefault();
    if (form.invalid) {
      form.markAllAsTouched();
    } else {
      form.disable();
      this.orgUnitService.create(form.value);

      this.routingService.go({
        cxRoute: 'orgUnitDetails',
        params: form.value,
      });
    }
  }
}
