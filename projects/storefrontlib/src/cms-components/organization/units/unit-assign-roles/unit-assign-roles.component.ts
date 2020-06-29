import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import {
  B2BUser,
  EntitiesModel,
  OrgUnitService,
  RoutingService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import {
  filter,
  map,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
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

  constructor(
    protected routingService: RoutingService,
    protected orgUnitsService: OrgUnitService
  ) {
    super(routingService);
  }

  role$: Observable<string> = this.params$.pipe(
    map((params: Params) => params['roleId'])
  );

  ngOnInit(): void {
    this.code$.pipe(take(1)).subscribe((code) => (this.code = code));

    this.data$ = <Observable<ListingModel>>combineLatest([
      this.queryParams$,
      this.role$,
    ]).pipe(
      withLatestFrom(this.code$),
      tap(([[queryParams, role], code]) =>
        this.orgUnitsService.loadUsers(code, role, queryParams)
      ),
      switchMap(([[queryParams, role], code]) =>
        this.orgUnitsService.getUsers(code, role, queryParams).pipe(
          filter(Boolean),
          map((userList: EntitiesModel<B2BUser>) => ({
            sorts: userList.sorts,
            pagination: userList.pagination,
            values: userList.values.map((user) => ({
              selected: user.selected,
              email: user.uid,
              name: user.name,
              roles: user.roles,
              parentUnit: user.orgUnit && user.orgUnit.name,
              uid: user.orgUnit && user.orgUnit.uid,
              customerId: user.customerId,
              admin: user.roles.includes('b2badmingroup'),
              approver: user.roles.includes('b2bapprovergroup'),
              customer: user.roles.includes('b2bcustomergroup'),
              manager: user.roles.includes('b2bmanagergroup'),
            })),
          }))
        )
      )
    );
  }

  assign(event: any) {
    this.orgUnitsService.assignRole(
      event.row.customerId,
      this.getRole(event.key)
    );
  }

  unassign(event: any) {
    console.log(event);
    this.orgUnitsService.unassignRole(
      event.row.customerId,
      this.getRole(event.key)
    );
  }

  /*changeRole({ roleId }: { roleId: string }) {
    this.updateQueryParams({}, { roleId });
  }*/

  getRole(key: string): string {
    switch (key) {
      case 'customer':
        return 'b2bcustomergroup';
      case 'manager':
        return 'b2bmanagergroup';
      case 'admin':
        return 'b2badmingroup';
      case 'approver':
        return 'b2bapprovergroup';
    }
  }
}
