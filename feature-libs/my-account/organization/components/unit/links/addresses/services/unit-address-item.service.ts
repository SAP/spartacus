import { Injectable } from '@angular/core';
import { B2BAddress, RoutingService } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { ROUTE_PARAMS } from 'feature-libs/my-account/organization/components/constants';
import { Observable } from 'rxjs';
import { distinctUntilChanged, first, pluck, tap } from 'rxjs/operators';
import { OrganizationItemService } from '../../../../shared/organization-item.service';
import { UnitAddressFormService } from '../form/unit-address-form.service';
import { CurrentUnitAddressService } from './current-unit-address.service';

@Injectable({
  providedIn: 'root',
})
export class UnitAddressItemService extends OrganizationItemService<
  B2BAddress
> {
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

  load(unitUid: string, addressId: string): Observable<B2BAddress> {
    return this.unitService.getAddress(unitUid, addressId);
  }

  update(addressCode: string, address: B2BAddress) {
    this.unitRouteParam$.pipe(first()).subscribe((unitCode) => {
      return this.unitService.updateAddress(unitCode, addressCode, address);
    });
  }

  protected create(value: B2BAddress) {
    this.unitRouteParam$
      .pipe(first(), tap(console.log))
      .subscribe((unitCode) => this.unitService.createAddress(unitCode, value));
  }

  protected getDetailsRoute(): string {
    return this.currentItemService.getDetailsRoute();
  }

  deleteAddress(unitUid: string, addressId: string) {
    this.launchList();
    this.unitService.deleteAddress(unitUid, addressId);
  }

  launchDetails(item: B2BAddress): void {
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
