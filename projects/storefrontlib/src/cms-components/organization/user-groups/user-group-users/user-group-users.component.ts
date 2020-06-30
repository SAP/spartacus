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
  B2BUser,
} from '@spartacus/core';
import {
  AbstractListingComponent,
  ListingModel,
} from '../../abstract-component/abstract-listing.component';
import { ICON_TYPE } from './../../../misc/icon/icon.model';

@Component({
  selector: 'cx-user-group-users',
  templateUrl: './user-group-users.component.html',
})
export class UserGroupUsersComponent extends AbstractListingComponent
  implements OnInit {
  cxRoute = 'userGroupUsers';
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
        this.userGroupService.loadAvailableOrgCustomers(code, queryParams)
      ),
      switchMap(([queryParams, code]) =>
        this.userGroupService.getAvailableOrgCustomers(code, queryParams).pipe(
          filter(Boolean),
          map((usersList: EntitiesModel<B2BUser>) => ({
            sorts: usersList.sorts,
            pagination: usersList.pagination,
            values: usersList.values
              .filter((user) => user.selected)
              .map((user) => ({
                email: user.uid,
                name: user.name,
                parentUnit: user.orgUnit && user.orgUnit.name,
                uid: user.orgUnit && user.orgUnit.uid,
                customerId: user.customerId,
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
        this.userGroupService.unassignMember(code, row.customerId)
      );
  }
}
