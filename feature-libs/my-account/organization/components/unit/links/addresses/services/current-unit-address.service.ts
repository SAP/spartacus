import { Injectable } from '@angular/core';
import { B2BAddress, RoutingService } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { Observable, of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { ROUTE_PARAMS } from '../../../../constants';
import { CurrentOrganizationItemService } from '../../../../shared/current-organization-item.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentUnitAddressService extends CurrentOrganizationItemService<
  B2BAddress
> {
  // override item$ as we need to use the unit code as well
  readonly item$: Observable<B2BAddress> = this.b2bUnit$.pipe(
    filter((unit) => Boolean(unit)),
    switchMap((unit) =>
      this.key$.pipe(switchMap((code: string) => this.getItem(unit, code)))
    )
  );

  constructor(
    protected routingService: RoutingService,
    protected unitService: OrgUnitService
  ) {
    super(routingService);
  }

  getDetailsRoute(): string {
    return 'unitAddressDetails';
  }

  protected getParamKey() {
    return ROUTE_PARAMS.addressCode;
  }

  protected getItem(
    unitUid: string,
    addressId: string
  ): Observable<B2BAddress> {
    return addressId ? this.unitService.getAddress(unitUid, addressId) : of({});
  }
}
