import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RoutingService } from '@spartacus/core';
import { FormUtils } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrgUnitService } from '../../../core/services/org-unit.service';
import { CurrentUnitService } from '../current-unit.service';
import { UnitFormService } from '../form/unit-form.service';

@Component({
  selector: 'cx-unit-create',
  templateUrl: './unit-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CurrentUnitService],
})
export class UnitCreateComponent {
  parentUnit$ = this.currentUnitService.b2bUnit$;

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
