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
  UserGroup,
  B2BUser,
} from '@spartacus/core';
import {
  AbstractListingComponent,
  ListingModel,
} from '../../abstract-component/abstract-listing.component';

@Component({
  selector: 'cx-user-assign-user-groups',
  templateUrl: './user-assign-user-groups.component.html',
})
export class UserAssignUserGroupsComponent extends AbstractListingComponent
  implements OnInit {
  cxRoute = 'userAssignUserGroups';
  code: string;
  uid$: Observable<string>;

  constructor(
    protected routingService: RoutingService,
    protected userService: B2BUserService
  ) {
    super(routingService);
  }

  ngOnInit(): void {
    this.code$.pipe(take(1)).subscribe((code) => (this.code = code));
    this.uid$ = <Observable<string>>(
      this.code$.pipe(
        switchMap((code) =>
          this.userService.get(code).pipe(map((user: B2BUser) => user.uid))
        )
      )
    );
    this.data$ = <Observable<ListingModel>>this.queryParams$.pipe(
      withLatestFrom(this.code$),
      tap(([queryParams, code]) =>
        this.userService.loadB2BUserUserGroups(code, queryParams)
      ),
      switchMap(([queryParams, code]) =>
        this.userService.getB2BUserUserGroups(code, queryParams).pipe(
          filter(Boolean),
          map((userGroupsList: EntitiesModel<UserGroup>) => ({
            sorts: userGroupsList.sorts,
            pagination: userGroupsList.pagination,
            values: userGroupsList.values.map((userGroup: UserGroup) => ({
              selected: userGroup.selected,
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

  assign({ row }) {
    this.userService.assignUserGroup(this.code, row.code);
  }

  unassign({ row }) {
    this.userService.unassignUserGroup(this.code, row.code);
  }
}
