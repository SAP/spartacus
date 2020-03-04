import { Component } from '@angular/core';
import { OrgUnitService, RoutingService, B2BUnitNode } from '@spartacus/core';

@Component({
  selector: 'cx-unit-create',
  templateUrl: './unit-create.component.html',
})
export class UnitCreateComponent {
  constructor(
    protected orgUnitService: OrgUnitService,
    protected routingService: RoutingService
  ) {}

  createOrgUnit(orgUnit: B2BUnitNode) {
    this.orgUnitService.create(orgUnit);
    this.routingService.go({
      cxRoute: 'orgUnitDetails',
      params: orgUnit,
    });
  }
}
