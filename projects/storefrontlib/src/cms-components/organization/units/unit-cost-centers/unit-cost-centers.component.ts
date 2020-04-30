import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { OrgUnitService, RoutingService, CostCenter } from '@spartacus/core';

@Component({
  selector: 'cx-unit-cost-centers',
  templateUrl: './unit-cost-centers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitCostCentersComponent implements OnInit {
  data$: Observable<CostCenter[]>;
  code$: Observable<string> = this.routingService
    .getRouterState()
    .pipe(map((routingData) => routingData.state.params['code']));

  constructor(
    protected routingService: RoutingService,
    protected orgUnitsService: OrgUnitService
  ) {}

  ngOnInit(): void {
    this.data$ = this.code$.pipe(
      tap((code) => this.orgUnitsService.loadOrgUnit(code)),
      switchMap((code) => this.orgUnitsService.getCostCenters(code))
    );
  }
}
