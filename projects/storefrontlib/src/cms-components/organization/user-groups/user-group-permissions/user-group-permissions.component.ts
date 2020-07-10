import { Component, OnInit } from '@angular/core';
import {
  filter,
  map,
  switchMap,
  tap,
  withLatestFrom,
  take,
} from 'rxjs/operators';
import { Observable } from 'rxjs';

import {
  RoutingService,
  EntitiesModel,
  UserGroupService,
  Permission,
} from '@spartacus/core';
import {
  AbstractListingComponent,
  ListingModel,
} from '../../abstract-component/abstract-listing.component';
import { ICON_TYPE } from '../../../misc/icon/icon.model';

@Component({
  selector: 'cx-user-group-permissions',
  templateUrl: './user-group-permissions.component.html',
})
export class UserGroupPermissionsComponent extends AbstractListingComponent
  implements OnInit {
  cxRoute = 'userGroupPermissions';
  ICON_TYPE = ICON_TYPE;

  constructor(
    protected routingService: RoutingService,
    protected userGroupService: UserGroupService
  ) {
    super(routingService);
  }

  ngOnInit(): void {
    this.data$ = <Observable<ListingModel>>this.queryParamsForAllItems$.pipe(
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
              values: permissionsList.values
                .filter((permission) => permission.selected)
                .map((permission) => ({
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

  unassign({ row }) {
    this.code$
      .pipe(take(1))
      .subscribe((code) =>
        this.userGroupService.unassignPermission(code, row.code)
      );
  }
}
