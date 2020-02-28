import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import {
  CostCenterService,
  RoutingService,
  EntitiesModel,
  CostCenter,
} from '@spartacus/core';
import { AbstractListingComponent } from '../../abstract-listing/abstract-listing.component';

@Component({
  selector: 'cx-cost-center-list',
  templateUrl: './cost-center-list.component.html',
})
export class CostCenterListComponent extends AbstractListingComponent
  implements OnInit {
  constructor(
    protected routingService: RoutingService,
    protected costCentersService: CostCenterService
  ) {
    super(routingService);
  }

  cxRoute = 'costCenters';
  costCentersList$: Observable<any>;

  ngOnInit(): void {
    this.costCentersList$ = this.queryParams$.pipe(
      tap(params => this.costCentersService.loadCostCenters(params)),
      switchMap(params =>
        this.costCentersService.getList(params).pipe(
          filter(Boolean),
          map((costCentersList: EntitiesModel<CostCenter>) => ({
            sorts: costCentersList.sorts,
            pagination: costCentersList.pagination,
            costCentersList: costCentersList.values.map(costCenter => ({
              code: costCenter.code,
              name: costCenter.name,
              currency: costCenter.currency && costCenter.currency.isocode,
              parentUnit: costCenter.unit && costCenter.unit.name,
              orgUnitId: costCenter.unit && costCenter.unit.uid,
            })),
          }))
        )
      )
    );
  }
}
