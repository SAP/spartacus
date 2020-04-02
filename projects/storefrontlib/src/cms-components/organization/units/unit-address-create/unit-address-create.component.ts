import { Component } from '@angular/core';
import { OrgUnitService, RoutingService, B2BUnitNode } from '@spartacus/core';

@Component({
  selector: 'cx-unit-address-create',
  templateUrl: './unit-address-create.component.html',
})
export class UnitAddressCreateComponent {
  constructor(
    protected orgUnitService: OrgUnitService,
    protected routingService: RoutingService
  ) {}

  createOrgUnit(orgUnit: B2BUnitNode) {
    this.orgUnitService.create(orgUnit);
    this.routingService.go({
      cxRoute: 'orgUnitAddressDetails',
      params: orgUnit,
    });
  }
}
