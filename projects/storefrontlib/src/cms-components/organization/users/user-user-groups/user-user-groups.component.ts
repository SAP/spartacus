import { ICON_TYPE } from './../../../misc/icon/icon.model';
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
  B2BUserService,
  B2BUser,
  UserGroup,
} from '@spartacus/core';
import {
  AbstractListingComponent,
  ListingModel,
} from '../../abstract-component/abstract-listing.component';

@Component({
  selector: 'cx-user-user-groups',
  templateUrl: './user-user-groups.component.html',
})
export class UserUserGroupsComponent extends AbstractListingComponent
  implements OnInit {
  cxRoute = 'userUserGroups';
  uid$: Observable<string>;
  ICON_TYPE = ICON_TYPE;

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
        this.userService.loadB2BUserUserGroups(code, queryParams)
      ),
      switchMap(([queryParams, code]) =>
        this.userService.getB2BUserUserGroups(code, queryParams).pipe(
          filter(Boolean),
          map((userGroupList: EntitiesModel<UserGroup>) => ({
            sorts: userGroupList.sorts,
            pagination: userGroupList.pagination,
            values: userGroupList.values
              .filter((userGroup) => userGroup.selected)
              .map((userGroup: UserGroup) => ({
                code: userGroup.uid,
                name: userGroup.name,
                parentUnit: userGroup.orgUnit && userGroup.orgUnit.name,
                uid: userGroup.orgUnit && userGroup.orgUnit.uid,
              })),
          }))
        )
      )
    );
  }

  unassign({ row }) {
    this.code$
      .pipe(take(1))
      .subscribe((code) => this.userService.unassignUserGroup(code, row.code));
  }
}
