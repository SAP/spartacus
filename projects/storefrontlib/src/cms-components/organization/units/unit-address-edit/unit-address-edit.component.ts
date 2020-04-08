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

  address$: Observable<B2BAddress | { orgUnitId: string }>;

  constructor(
    protected routingService: RoutingService,
    protected orgUnitsService: OrgUnitService
  ) {}

  ngOnInit(): void {
    this.address$ = this.orgUnitCode$.pipe(
      withLatestFrom(this.addressId$),
      tap(([orgUnitId]) => this.orgUnitsService.loadAddresses(orgUnitId)),
      switchMap(([orgUnitId, id]) =>
        this.orgUnitsService.getAddress(orgUnitId, id).pipe(
          filter(Boolean),
          map((address: B2BAddress) => ({ ...address, orgUnitId }))
        )
      )
    );
  }

  updateAddress(address: B2BAddress) {
    this.orgUnitCode$
      .pipe(withLatestFrom(this.addressId$), take(1))
      .subscribe(([code, id]) => {
        this.orgUnitsService.updateAddress(code, id, address);
        this.routingService.go({
          cxRoute: 'orgUnitAddressDetails',
          params: { id, code },
        });
      });
  }
}
