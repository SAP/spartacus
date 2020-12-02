import { Injectable } from '@angular/core';
import { Address, RoutingService } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/organization/administration/core';
import { Observable, of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { ROUTE_PARAMS } from '../../../../constants';
import { CurrentItemService } from '../../../../shared/current-item.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentUnitAddressService extends CurrentItemService<Address> {
  // override item$ as we need to use the unit code as well
  readonly item$: Observable<Address> = this.b2bUnit$.pipe(
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

  protected getItem(unitUid: string, addressId: string): Observable<Address> {
    return addressId ? this.unitService.getAddress(unitUid, addressId) : of({});
  }

  getError(code: string): Observable<boolean> {
    return this.unitService.getErrorState(code);
  }
}
