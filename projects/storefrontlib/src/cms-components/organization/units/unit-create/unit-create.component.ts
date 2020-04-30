import { Component } from '@angular/core';
import { OrgUnitService, RoutingService, B2BUnitNode } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-unit-create',
  templateUrl: './unit-create.component.html',
})
export class UnitCreateComponent {
  parentUnit$: Observable<string> = this.routingService
    .getRouterState()
    .pipe(map((routingData) => routingData.state.queryParams?.['parentUnit']));

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
