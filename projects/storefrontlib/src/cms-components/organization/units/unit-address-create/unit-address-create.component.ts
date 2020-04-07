import { Component } from '@angular/core';
import { OrgUnitService, RoutingService, B2BAddress } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'cx-unit-address-create',
  templateUrl: './unit-address-create.component.html',
})
export class UnitAddressCreateComponent {
  orgUnitCode$: Observable<string> = this.routingService
    .getRouterState()
    .pipe(map(routingData => routingData.state.params['code']));

  constructor(
    protected orgUnitService: OrgUnitService,
    protected routingService: RoutingService
  ) {}

  createAddress(address: B2BAddress) {
    this.orgUnitCode$.pipe(take(1)).subscribe(code => {
      this.orgUnitService.createAddress(code, address);
      this.routingService.go({
        cxRoute: 'orgUnitAddressDetails',
        params: { ...address, code },
      });
    });
  }
}
