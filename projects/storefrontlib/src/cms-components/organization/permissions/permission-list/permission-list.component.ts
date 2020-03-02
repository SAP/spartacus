import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import {
  PermissionService,
  RoutingService,
  EntitiesModel,
  Permission,
} from '@spartacus/core';

import {
  AbstractListingComponent,
  ListingModel,
} from '../../abstract-component/abstract-listing.component';

@Component({
  selector: 'cx-permission-list',
  templateUrl: './permission-list.component.html',
})
export class PermissionListComponent extends AbstractListingComponent
  implements OnInit {
  cxRoute = 'permissions';

  constructor(
    protected routingService: RoutingService,
    protected permissionsService: PermissionService
  ) {
    super(routingService);
  }

  ngOnInit(): void {
    this.data$ = <Observable<ListingModel>>this.queryParams$.pipe(
      tap(queryParams => this.permissionsService.loadPermissions(queryParams)),
      switchMap(queryParams =>
        this.permissionsService.getList(queryParams).pipe(
          filter(Boolean),
          map((permissionsList: EntitiesModel<Permission>) => ({
            sorts: permissionsList.sorts,
            pagination: permissionsList.pagination,
            values: permissionsList.values.map(permission => ({
              code: permission.code,
              threshold: `${permission.threshold ||
                ''} ${(permission.currency && permission.currency.symbol) ||
                ''}`,
              orderType:
                permission.orderApprovalPermissionType &&
                permission.orderApprovalPermissionType.name,
              parentUnit: permission.orgUnit && permission.orgUnit.name,
              timePeriod: permission.periodRange,
              orgUnitId: permission.orgUnit && permission.orgUnit.uid,
            })),
          }))
        )
      )
    );
  }
}
