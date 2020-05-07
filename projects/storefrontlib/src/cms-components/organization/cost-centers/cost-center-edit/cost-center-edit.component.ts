import { Component, OnInit } from '@angular/core';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { CostCenter, CostCenterService, RoutingService } from '@spartacus/core';

@Component({
  selector: 'cx-cost-center-edit',
  templateUrl: './cost-center-edit.component.html',
})
export class CostCenterEditComponent implements OnInit {
  costCenter$: Observable<CostCenter>;
  costCenterCode$: Observable<
    string
  > = this.routingService
    .getRouterState()
    .pipe(map((routingData) => routingData.state.params['code']));

  constructor(
    protected routingService: RoutingService,
    protected costCentersService: CostCenterService
  ) {}

  ngOnInit(): void {
    this.costCenter$ = this.costCenterCode$.pipe(
      tap((code) => this.costCentersService.loadCostCenter(code)),
      switchMap((code) => this.costCentersService.get(code))
    );
  }

  updateCostCenter(costCenter: CostCenter) {
    this.costCenterCode$
      .pipe(take(1))
      .subscribe((costCenterCode) =>
        this.costCentersService.update(costCenterCode, costCenter)
      );
    this.routingService.go({
      cxRoute: 'costCenterDetails',
      params: costCenter,
    });
  }
}
