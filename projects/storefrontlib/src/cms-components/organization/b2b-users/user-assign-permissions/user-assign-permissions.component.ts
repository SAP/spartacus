import { Component, OnInit } from '@angular/core';
import {
  filter,
  map,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { Observable } from 'rxjs';

import {
  RoutingService,
  EntitiesModel,
  B2BUserService,
  Permission,
} from '@spartacus/core';
import {
  AbstractListingComponent,
  ListingModel,
} from '../../abstract-component/abstract-listing.component';

@Component({
  selector: 'cx-user-assign-permissions',
  templateUrl: './user-assign-permissions.component.html',
})
export class UserAssignPermissionsComponent extends AbstractListingComponent
  implements OnInit {
  cxRoute = 'userAssignPermissions';
  code: string;

  constructor(
    protected routingService: RoutingService,
    protected userService: B2BUserService
  ) {
    super(routingService);
  }

  ngOnInit(): void {
    this.code$.pipe(take(1)).subscribe((code) => (this.code = code));

    this.data$ = <Observable<ListingModel>>this.queryParams$.pipe(
      withLatestFrom(this.code$),
      tap(([queryParams, code]) =>
        this.userService.loadB2BUserPermissions(code, queryParams)
      ),
      switchMap(([queryParams, code]) =>
        this.userService.getB2BUserPermissions(code, queryParams).pipe(
          filter(Boolean),
          map((permissionsList: EntitiesModel<Permission>) => ({
            sorts: permissionsList.sorts,
            pagination: permissionsList.pagination,
            values: permissionsList.values.map((permission) => ({
              selected: permission.selected,
              code: permission.code,
              threshold: `${permission.threshold ?? ''} ${
                (permission.currency && permission.currency.symbol) ?? ''
              }`,
              orderType:
                permission.orderApprovalPermissionType &&
                permission.orderApprovalPermissionType.name,
              timePeriod: permission.periodRange,
              parentUnit: permission.orgUnit && permission.orgUnit.name,
              uid: permission.orgUnit && permission.orgUnit.uid,
            })),
          }))
        )
      )
    );
  }

  assign({ row }) {
    this.userService.assignPermission(this.code, row.code);
  }

  unassign({ row }) {
    this.userService.unassignPermission(this.code, row.code);
  }
}
