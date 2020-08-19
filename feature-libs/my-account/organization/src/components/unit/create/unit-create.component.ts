import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { UnitFormService } from '../form/unit-form.service';
import { CurrentUnitService } from '../current-unit.service';
import { OrgUnitService } from '../../../core/services/org-unit.service';
import { FormUtils } from '@spartacus/storefront';

@Component({
  selector: 'cx-unit-create',
  templateUrl: './unit-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CurrentUnitService],
})
export class UnitCreateComponent {
  parentUnit$ = this.currentUnitService.parentUnit$;

  form$: Observable<FormGroup> = this.parentUnit$.pipe(
    map((parentUnit: string) =>
      this.unitFormService.getForm({ parentOrgUnit: { uid: parentUnit } })
    )
  );

  constructor(
    protected orgUnitService: OrgUnitService,
    protected routingService: RoutingService,
    protected unitFormService: UnitFormService,
    protected currentUnitService: CurrentUnitService
  ) {}

  save(event: any, form: FormGroup): void {
    event.preventDefault();
    if (form.invalid) {
      form.markAllAsTouched();
      FormUtils.deepUpdateValueAndValidity(form);
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
