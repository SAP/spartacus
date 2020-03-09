import { Component, OnInit } from '@angular/core';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { B2BUnitNode, OrgUnitService, RoutingService } from '@spartacus/core';

@Component({
  selector: 'cx-unit-edit',
  templateUrl: './unit-edit.component.html',
})
export class UnitEditComponent implements OnInit {
  orgUnit$: Observable<B2BUnitNode>;
  orgUnitCode$: Observable<string> = this.routingService
    .getRouterState()
    .pipe(map(routingData => routingData.state.params['code']));

  constructor(
    protected routingService: RoutingService,
    protected orgUnitsService: OrgUnitService
  ) {}

  ngOnInit(): void {
    this.orgUnit$ = this.orgUnitCode$.pipe(
      tap(code => this.orgUnitsService.loadOrgUnit(code)),
      switchMap(code => this.orgUnitsService.get(code))
    );
  }

  updateOrgUnit(orgUnit: B2BUnitNode) {
    this.orgUnitCode$
      .pipe(take(1))
      .subscribe(orgUnitCode =>
        this.orgUnitsService.update(orgUnitCode, orgUnit)
      );
    this.routingService.go({
      cxRoute: 'orgUnitDetails',
      params: orgUnit,
    });
  }
}
