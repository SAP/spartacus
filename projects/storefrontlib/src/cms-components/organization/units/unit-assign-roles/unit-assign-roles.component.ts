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
  selector: 'cx-unit-assign-roles',
  templateUrl: './unit-assign-roles.component.html',
})
export class UnitAssignRolesComponent extends AbstractListingComponent
  implements OnInit {
  code: string;
  cxRoute = 'orgUnitAssignRoles';
  roleId = 'b2bcustomergroup';

  constructor(
    protected routingService: RoutingService,
    protected orgUnitsService: OrgUnitService,
    protected cxDate: CxDatePipe
  ) {
    super(routingService);
  }

  ngOnInit(): void {
    this.code$.pipe(take(1)).subscribe(code => (this.code = code));

    this.data$ = <Observable<ListingModel>>this.queryParams$.pipe(
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
            values: userList.values.map(user => ({
              selected: user.selected,
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

  assign({ row }) {
    this.orgUnitsService.assignRole(this.code, row.email, this.roleId);
  }

  unassign({ row }) {
    this.orgUnitsService.unassignRole(this.code, row.email, this.roleId);
  }
}
