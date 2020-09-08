import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RoutingService } from '@spartacus/core';
import { FormUtils } from '@spartacus/storefront';
import { take } from 'rxjs/operators';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { CurrentUnitService } from '../../current-unit.service';
import { UnitAddressFormService } from '../form/unit-address-form.service';

@Component({
  selector: 'cx-unit-address-create',
  templateUrl: './unit-address-create.component.html',
})
export class UnitAddressCreateComponent {
  code$ = this.currentUnitService.key$;
  form = this.unitAddressFormService.getForm();

  constructor(
    protected orgUnitService: OrgUnitService,
    protected routingService: RoutingService,
    protected unitAddressFormService: UnitAddressFormService,
    protected currentUnitService: CurrentUnitService
  ) {}

  save(event: any, form: FormGroup) {
    event.preventDefault();
    if (form.invalid) {
      form.markAllAsTouched();
      FormUtils.deepUpdateValueAndValidity(form);
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
