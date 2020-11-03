import { Injectable } from '@angular/core';
import { Address, RoutingService } from '@spartacus/core';
import {
  OrganizationItemStatus,
  OrgUnitService,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, first, pluck } from 'rxjs/operators';
import { ROUTE_PARAMS } from '../../../../constants';
import { OrganizationItemService } from '../../../../shared/organization-item.service';
import { UnitAddressFormService } from '../form/unit-address-form.service';
import { CurrentUnitAddressService } from './current-unit-address.service';

@Injectable({
  providedIn: 'root',
})
export class UnitAddressItemService extends OrganizationItemService<Address> {
  constructor(
    protected currentItemService: CurrentUnitAddressService,
    protected routingService: RoutingService,
    protected formService: UnitAddressFormService,
    protected unitService: OrgUnitService
  ) {
    super(currentItemService, routingService, formService);
  }

  protected unitRouteParam$ = this.routingService
    .getParams()
    .pipe(pluck(ROUTE_PARAMS.unitCode), distinctUntilChanged());

  load(unitUid: string, addressId: string): Observable<Address> {
    return this.unitService
      .getAddress(unitUid, addressId)
      .pipe(filter((list) => Boolean(list)));
  }

  update(
    addressCode: string,
    address: Address
  ): Observable<OrganizationItemStatus<Address>> {
    this.unitRouteParam$.pipe(first()).subscribe((unitCode) => {
      this.unitService.updateAddress(unitCode, addressCode, address);
    });
    return this.unitService.getAddressLoadingStatus(addressCode);
  }

  protected create(
    value: Address
  ): Observable<OrganizationItemStatus<Address>> {
    this.unitRouteParam$
      .pipe(first())
      .subscribe((unitCode) => this.unitService.createAddress(unitCode, value));
    return this.unitService.getAddressLoadingStatus(null);
  }

  protected getDetailsRoute(): string {
    return this.currentItemService.getDetailsRoute();
  }

  deleteAddress(unitUid: string, addressId: string) {
    this.launchList();
    this.unitService.deleteAddress(unitUid, addressId);
  }

  launchDetails(item: Address): void {
    if (!item.id) {
      // since the ID is generated in the backend
      // we redirect to the list instead.
      this.launchList();
    } else {
      this.unitRouteParam$.pipe(first()).subscribe((unitCode) => {
        this.routingService.go({
          cxRoute: this.getDetailsRoute(),
          params: { ...item, uid: unitCode },
        });
      });
    }
  }

  protected launchList() {
    this.unitRouteParam$.pipe(first()).subscribe((unitCode) => {
      this.routingService.go({
        cxRoute: 'unitAddressList',
        params: { uid: unitCode },
      });
    });
  }
}
