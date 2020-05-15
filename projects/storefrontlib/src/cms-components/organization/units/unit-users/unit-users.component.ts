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
  OrgUnitService,
  B2BUser,
} from '@spartacus/core';
import {
  AbstractListingComponent,
  ListingModel,
} from '../../abstract-component/abstract-listing.component';

@Component({
  selector: 'cx-unit-users',
  templateUrl: './unit-users.component.html',
})
export class UnitUsersComponent extends AbstractListingComponent
  implements OnInit {
  code: string;
  cxRoute = 'orgUnitUsers';
  roleId = 'b2bcustomergroup';

  constructor(
    protected routingService: RoutingService,
    protected orgUnitsService: OrgUnitService,
    protected cxDate: CxDatePipe
  ) {
    super(routingService);
  }

  ngOnInit(): void {
    this.code$.pipe(take(1)).subscribe((code) => (this.code = code));

    this.data$ = <Observable<ListingModel>>this.queryParamsForAllItems$.pipe(
      withLatestFrom(this.code$),
      tap(([queryParams, code]) =>
        this.orgUnitsService.loadUsers(code, this.roleId, queryParams)
      ),
      switchMap(([queryParams, code]) =>
        this.orgUnitsService.getUsers(code, this.roleId, queryParams).pipe(
          filter(Boolean),
          map((userList: EntitiesModel<B2BUser>) => ({
            sorts: userList.sorts,
            pagination: userList.pagination,
            values: userList.values.map((user) => ({
              email: user.uid,
              name: user.name,
              roles: user.roles,
              parentUnit: user.orgUnit && user.orgUnit.name,
              uid: user.orgUnit && user.orgUnit.uid,
            })),
          }))
        )
      )
    );
  }
}
