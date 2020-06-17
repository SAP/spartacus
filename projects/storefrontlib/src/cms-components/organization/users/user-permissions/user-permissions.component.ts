import { Component, OnInit } from '@angular/core';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs';

import {
  RoutingService,
  EntitiesModel,
  B2BUserService,
  Permission,
  B2BUser,
} from '@spartacus/core';
import {
  AbstractListingComponent,
  ListingModel,
} from '../../abstract-component/abstract-listing.component';

@Component({
  selector: 'cx-user-permissions',
  templateUrl: './user-permissions.component.html',
})
export class UserPermissionsComponent extends AbstractListingComponent
  implements OnInit {
  cxRoute = 'userPermissions';
  uid$: Observable<string>;

  constructor(
    protected routingService: RoutingService,
    protected userService: B2BUserService
  ) {
    super(routingService);
  }

  ngOnInit(): void {
    this.uid$ = <Observable<string>>(
      this.code$.pipe(
        switchMap((code) =>
          this.userService.get(code).pipe(map((user: B2BUser) => user.uid))
        )
      )
    );
    this.data$ = <Observable<ListingModel>>this.queryParamsForAllItems$.pipe(
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
}
