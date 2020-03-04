import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import {
  OrgUnitService,
  RoutingService,
  EntitiesModel,
  B2BUnitNode,
} from '@spartacus/core';

import {
  AbstractListingComponent,
  ListingModel,
} from '../../abstract-component/abstract-listing.component';

@Component({
  selector: 'cx-unit-list',
  templateUrl: './unit-list.component.html',
})
export class ManageUnitsListComponent extends AbstractListingComponent
  implements OnInit {
  cxRoute = 'orgUnits';

  constructor(
    protected routingService: RoutingService,
    protected orgUnitsService: OrgUnitService
  ) {
    super(routingService);
  }

  ngOnInit(): void {
    this.data$ = <Observable<ListingModel>>this.queryParams$.pipe(
      tap(() => this.orgUnitsService.loadOrgUnitNodes()),
      switchMap(() =>
        this.orgUnitsService.getList().pipe(
          tap(console.log),
          filter(Boolean),
          map((orgUnitsList: EntitiesModel<B2BUnitNode>) => ({
            pagination: { totalResults: 1 },
            values: orgUnitsList.values.map(orgUnit => ({
              id: orgUnit.id,
              name: orgUnit.name,
              orgUnitId: orgUnit.id,
              parentUnit: orgUnit.parent,
            })),
          }))
        )
      )
    );
  }
}
