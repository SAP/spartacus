import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import {
  RoutingService,
  EntitiesModel,
  B2BUserService,
  B2BUser,
} from '@spartacus/core';

import {
  AbstractListingComponent,
  ListingModel,
} from '../../abstract-component/abstract-listing.component';

@Component({
  selector: 'cx-user-list',
  templateUrl: './user-list.component.html',
})
export class B2BUserListComponent extends AbstractListingComponent
  implements OnInit {
  cxRoute = 'users';

  constructor(
    protected routingService: RoutingService,
    protected b2bUsersService: B2BUserService
  ) {
    super(routingService);
  }

  ngOnInit(): void {
    this.data$ = <Observable<ListingModel>>this.queryParams$.pipe(
      tap((queryParams) => this.b2bUsersService.loadB2BUsers(queryParams)),
      switchMap((queryParams) =>
        this.b2bUsersService.getList(queryParams).pipe(
          filter(Boolean),
          map((b2bUsersList: EntitiesModel<B2BUser>) => ({
            sorts: b2bUsersList.sorts,
            pagination: b2bUsersList.pagination,
            values: b2bUsersList.values.map((b2bUser) => ({
              code: b2bUser.uid,
              name: b2bUser.name,
              roles: b2bUser.roles,
              parentUnit: b2bUser.orgUnit && b2bUser.orgUnit.name,
              uid: b2bUser.orgUnit && b2bUser.orgUnit.uid,
              customerId: b2bUser.customerId,
            })),
          }))
        )
      )
    );
  }
}
