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
  CxDatePipe,
  EntitiesModel,
  UserGroupService,
  Permission,
} from '@spartacus/core';
import {
  AbstractListingComponent,
  ListingModel,
} from '../../abstract-component/abstract-listing.component';

@Component({
  selector: 'cx-user-group-assign-permissions',
  templateUrl: './user-group-assign-permissions.component.html',
})
export class UserGroupAssignPermissionsComponent
  extends AbstractListingComponent
  implements OnInit {
  cxRoute = 'userGroupAssignPermissions';
  code: string;

  constructor(
    protected routingService: RoutingService,
    protected userGroupService: UserGroupService,
    protected cxDate: CxDatePipe
  ) {
    super(routingService);
  }

  ngOnInit(): void {
    this.code$.pipe(take(1)).subscribe((code) => (this.code = code));

    this.data$ = <Observable<ListingModel>>this.queryParams$.pipe(
      withLatestFrom(this.code$),
      tap(([queryParams, code]) =>
        this.userGroupService.loadAvailableOrderApprovalPermissions(
          code,
          queryParams
        )
      ),
      switchMap(([queryParams, code]) =>
        this.userGroupService
          .getAvailableOrderApprovalPermissions(code, queryParams)
          .pipe(
            filter(Boolean),
            map((permissionsList: EntitiesModel<Permission>) => ({
              sorts: permissionsList.sorts,
              pagination: permissionsList.pagination,
              values: permissionsList.values.map((permission) => ({
                selected: permission.selected,
                code: permission.code,
                threshold: `${permission.threshold || ''} ${
                  (permission.currency && permission.currency.symbol) || ''
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
    this.userGroupService.assignPermission(this.code, row.code);
  }

  unassign({ row }) {
    this.userGroupService.unassignPermission(this.code, row.code);
  }
}
