import { Component } from '@angular/core';
import { map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { B2BAddress, OrgUnitService, RoutingService } from '@spartacus/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { UnitAddressFormService } from '../unit-address-form/unit-address-form.service';

@Component({
  selector: 'cx-unit-address-edit',
  templateUrl: './unit-address-edit.component.html',
})
export class UnitAddressEditComponent {
  protected code$: Observable<
    string
  > = this.route.parent.parent.parent.params.pipe(
    map((routingData) => routingData['code'])
  );

  protected addressId$: Observable<string> = this.route.parent.params.pipe(
    map((routingData) => routingData['id'])
  );

  protected address$: Observable<B2BAddress> = this.code$.pipe(
    withLatestFrom(this.addressId$),
    switchMap(([orgUnitId, id]) =>
      this.orgUnitsService.getAddress(orgUnitId, id)
    )
  );

  protected form$: Observable<FormGroup> = this.address$.pipe(
    map((address) => this.unitAddressFormService.getForm(address))
  );

  viewModel$ = this.form$.pipe(
    withLatestFrom(this.address$, this.code$),
    map(([form, address, code]) => ({ form, address, code }))
  );

  constructor(
    protected routingService: RoutingService,
    protected orgUnitsService: OrgUnitService,
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
      this.code$
        .pipe(withLatestFrom(this.addressId$), take(1))
        .subscribe(([code, id]) => {
          this.orgUnitsService.updateAddress(code, id, form.value);
          this.routingService.go({
            cxRoute: 'orgUnitAddressDetails',
            params: { id, uid: code },
          });
        });
    }
  }
}
