import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';

import {
  PermissionService,
  RoutingService,
  EntitiesModel,
  Permission,
  θshallowEqualObjects as shallowEqualObjects,
} from '@spartacus/core';
import { AbstractListingComponent } from '../../abstract-listing/abstract-listing.component';

@Component({
  selector: 'cx-permission-list',
  templateUrl: './permission-list.component.html',
})
export class PermissionListComponent extends AbstractListingComponent
  implements OnInit {
  constructor(
    protected routingService: RoutingService,
    protected permissionsService: PermissionService
  ) {
    super(routingService);
  }

  cxRoute = 'permissions';
  permissionsList$: Observable<any>;

  ngOnInit(): void {
    this.permissionsList$ = this.queryParams$.pipe(
      map(queryParams => ({
        ...this.defaultQueryParams,
        ...queryParams,
      })),
      distinctUntilChanged(shallowEqualObjects),
      map(this.normalizeQueryParams),
      tap(queryParams => this.permissionsService.loadPermissions(queryParams)),
      switchMap(queryParams =>
        this.permissionsService.getList(queryParams).pipe(
          filter(Boolean),
          map((permissionsList: EntitiesModel<Permission>) => ({
            sorts: permissionsList.sorts,
            pagination: permissionsList.pagination,
            permissionsList: permissionsList.values.map(permission => ({
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
