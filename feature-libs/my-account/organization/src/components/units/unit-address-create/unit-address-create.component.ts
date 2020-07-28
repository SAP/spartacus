import { Component } from '@angular/core';
import { OrgUnitService, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { UnitAddressFormService } from '../unit-address-form/unit-address-form.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cx-unit-address-create',
  templateUrl: './unit-address-create.component.html',
})
export class UnitAddressCreateComponent {
  code$: Observable<string> = this.route.parent.parent.params.pipe(
    map((routingData) => routingData['code'])
  );

  form: FormGroup = this.unitAddressFormService.getForm();

  constructor(
    protected orgUnitService: OrgUnitService,
    protected routingService: RoutingService,
    protected route: ActivatedRoute,
    protected unitAddressFormService: UnitAddressFormService
  ) {}

  save(event: any, form: FormGroup) {
    event.preventDefault();
    if (form.invalid) {
      form.markAllAsTouched();
    } else {
      // disabling form before save causing to refresh form state and adds region field
      // which shouldn't be included when disabled. This might need some change
      // form.disable();
      this.code$.pipe(take(1)).subscribe((orgUnitId) => {
        this.orgUnitService.createAddress(orgUnitId, form.value);
        this.routingService.go({
          cxRoute: 'orgUnitManageAddresses',
          params: { uid: orgUnitId },
        });
      });
    }
  }
}
