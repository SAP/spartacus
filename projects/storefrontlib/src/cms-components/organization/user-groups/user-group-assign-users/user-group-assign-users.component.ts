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
  OrgUnitUserGroupService,
  B2BUser,
} from '@spartacus/core';
import {
  AbstractListingComponent,
  ListingModel,
} from '../../abstract-component/abstract-listing.component';

@Component({
  selector: 'cx-user-group-assign-users',
  templateUrl: './user-group-assign-users.component.html',
})
export class UserGroupAssignUsersComponent extends AbstractListingComponent
  implements OnInit {
  cxRoute = 'userGroupAssignUsers';
  code: string;

  constructor(
    protected routingService: RoutingService,
    protected userGroupService: OrgUnitUserGroupService,
    protected cxDate: CxDatePipe
  ) {
    super(routingService);
  }

  ngOnInit(): void {
    this.code$.pipe(take(1)).subscribe(code => (this.code = code));

    this.data$ = <Observable<ListingModel>>this.queryParams$.pipe(
      withLatestFrom(this.code$),
      tap(([queryParams, code]) =>
        this.userGroupService.loadOrgUnitUserGroupAvailableOrgCustomers(
          code,
          queryParams
        )
      ),
      switchMap(([queryParams, code]) =>
        this.userGroupService
          .getOrgUnitUserGroupAvailableOrgCustomers(code, queryParams)
          .pipe(
            filter(Boolean),
            map((usersList: EntitiesModel<B2BUser>) => ({
              sorts: usersList.sorts,
              pagination: usersList.pagination,
              values: usersList.values.map(user => ({
                selected: user.selected,
                email: user.uid,
                name: user.name,
                parentUnit: user.orgUnit && user.orgUnit.name,
                uid: user.orgUnit && user.orgUnit.uid,
              })),
            }))
          )
      )
    );
  }

  assign({ row }) {
    this.userGroupService.assignMember(this.code, row.email);
  }

  unassign({ row }) {
    this.userGroupService.unassignMember(this.code, row.email);
  }

  unassignAll() {
    this.userGroupService.unassignAllMembers(this.code);
  }
}
