import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

import { B2BUnit, OrgUnitService, RoutingService } from '@spartacus/core';

@Component({
  selector: 'cx-unit-address-details',
  templateUrl: './unit-address-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitAddressDetailsComponent implements OnInit {
  orgUnit$: Observable<B2BUnit>;
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
      switchMap(code => this.orgUnitsService.get(code)),
      filter(Boolean)
    );
  }

  update(orgUnit: B2BUnit) {
    this.orgUnitCode$
      .pipe(take(1))
      .subscribe(orgUnitCode =>
        this.orgUnitsService.update(orgUnitCode, orgUnit)
      );
  }
}
