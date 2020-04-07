import { Component, OnInit } from '@angular/core';
import {
  filter,
  map,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { Observable } from 'rxjs';

import { B2BAddress, OrgUnitService, RoutingService } from '@spartacus/core';

@Component({
  selector: 'cx-unit-address-edit',
  templateUrl: './unit-address-edit.component.html',
})
export class UnitAddressEditComponent implements OnInit {
  orgUnitCode$: Observable<string> = this.routingService
    .getRouterState()
    .pipe(map(routingData => routingData.state.params['code']));

  addressId$: Observable<string> = this.routingService
    .getRouterState()
    .pipe(map(routingData => routingData.state.params['id']));

  address$: Observable<B2BAddress>;

  constructor(
    protected routingService: RoutingService,
    protected orgUnitsService: OrgUnitService
  ) {}

  ngOnInit(): void {
    this.address$ = this.orgUnitCode$.pipe(
      withLatestFrom(this.addressId$),
      tap(([code]) => this.orgUnitsService.loadAddresses(code)),
      switchMap(([code, id]) =>
        this.orgUnitsService.getAddress(code, id).pipe(
          filter(Boolean),
          map((address: B2BAddress) => ({ ...address, code }))
        )
      )
    );
  }

  updateAddress(address: B2BAddress) {
    this.orgUnitCode$
      .pipe(withLatestFrom(this.addressId$), take(1))
      .subscribe(([code, addressId]) => {
        this.orgUnitsService.updateAddress(code, addressId, address);
        this.routingService.go({
          cxRoute: 'orgUnitAddressDetails',
          params: { ...address, code },
        });
      });
  }
}
