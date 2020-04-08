import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  filter,
  map,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import { B2BAddress, OrgUnitService, RoutingService } from '@spartacus/core';

@Component({
  selector: 'cx-unit-address-details',
  templateUrl: './unit-address-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitAddressDetailsComponent implements OnInit {
  address$: Observable<any>;
  orgUnitCode$: Observable<string> = this.routingService
    .getRouterState()
    .pipe(map(routingData => routingData.state.params['code']));

  addressId$: Observable<string> = this.routingService
    .getRouterState()
    .pipe(map(routingData => routingData.state.params['id']));

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

  deleteAddress() {
    this.address$.pipe(take(1)).subscribe(address => {
      this.orgUnitsService.deleteAddress(address.orgUnitId, address.id);
      this.routingService.go({
        cxRoute: 'orgUnitManageAddresses',
        params: { code: address.orgUnitId },
      });
    });
  }
}
