import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map, take, withLatestFrom } from 'rxjs/operators';

import { RoutingService } from '@spartacus/core';
import { FormUtils } from '@spartacus/storefront';
import { UnitAddressFormService } from '../form/unit-address-form.service';
import { CurrentUnitAddressService } from '../details/current-unit-address.service';
import { CurrentUnitService } from '../../current-unit.service';
import { OrgUnitService } from '../../../../core/services/org-unit.service';

@Component({
  selector: 'cx-unit-address-edit',
  templateUrl: './unit-address-edit.component.html',
})
export class UnitAddressEditComponent {
  code$ = this.currentUnitService.code$;
  address$ = this.currentUnitAddressService.unitAddress$;

  form$ = this.address$.pipe(
    map((address) => this.unitAddressFormService.getForm(address))
  );

  viewModel$ = this.form$.pipe(
    withLatestFrom(this.address$, this.code$),
    map(([form, address, code]) => ({ form, address, code }))
  );

  constructor(
    protected routingService: RoutingService,
    protected orgUnitsService: OrgUnitService,
    protected unitAddressFormService: UnitAddressFormService,
    protected currentUnitService: CurrentUnitService,
    protected currentUnitAddressService: CurrentUnitAddressService
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
      this.code$.pipe(take(1)).subscribe((code) => {
        this.orgUnitsService.updateAddress(code, form.value.id, form.value);
        this.routingService.go({
          cxRoute: 'orgUnitAddressDetails',
          params: { id: form.value.id, uid: code },
        });
      });
    }
  }
}
