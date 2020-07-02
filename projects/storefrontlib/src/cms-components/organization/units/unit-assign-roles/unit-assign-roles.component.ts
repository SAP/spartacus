import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import {
  B2BUser,
  B2BUserService,
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
    protected orgUnitsService: OrgUnitService,
    protected b2bUsersService: B2BUserService
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
          map((usersList: EntitiesModel<B2BUser>) => ({
            sorts: usersList.sorts,
            pagination: usersList.pagination,
            values: usersList.values.map((user) => ({
              selected: user.selected,
              email: user.uid,
              name: user.name,
              roles: user.roles,
              parentUnit: user.orgUnit && user.orgUnit.name,
              uid: user.orgUnit && user.orgUnit.uid,
              customerId: user.customerId,
              b2badmingroup: user.roles.includes('b2badmingroup'),
              b2bapprovergroup: user.roles.includes('b2bapprovergroup'),
              b2bcustomergroup: user.roles.includes('b2bcustomergroup'),
              b2bmanagergroup: user.roles.includes('b2bmanagergroup'),
            })),
          }))
        )
      )
    );
  }

  assign(event: any) {
    const oldRoles: string[] = event.row.roles;

    this.b2bUsersService.update(event.row.customerId, {
      email: event.row.email,
      roles: [...oldRoles, event.key],
    });
  }

  unassign(event: any) {
    //copy roles from event
    const roles = Object.assign([], event.row.roles);
    //get the index of the role to be unchecked
    const index = roles.indexOf(event.key);
    //remove the unchecked role from the list of roles
    roles.splice(index, 1);

    //finally update the roles
    this.b2bUsersService.update(event.row.customerId, {
      email: event.row.email,
      roles: roles,
    });
  }

  changeRole({ roleId }: { roleId: string }) {
    this.updateQueryParams({}, { roleId });
  }
}
