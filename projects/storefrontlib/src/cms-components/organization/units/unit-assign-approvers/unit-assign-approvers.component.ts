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
  OrgUnitService,
  B2BUser,
} from '@spartacus/core';
import {
  AbstractListingComponent,
  ListingModel,
} from '../../abstract-component/abstract-listing.component';

@Component({
  selector: 'cx-unit-assign-approvers',
  templateUrl: './unit-assign-approvers.component.html',
})
export class UnitAssignApproversComponent extends AbstractListingComponent
  implements OnInit {
  code: string;
  cxRoute = 'orgUnitAssignApprovers';

  constructor(
    protected routingService: RoutingService,
    protected orgUnitsService: OrgUnitService
  ) {
    super(routingService);
  }

  protected readonly APPROVERS_ROLE_ID = 'b2bapprovergroup';

  ngOnInit(): void {
    this.code$.pipe(take(1)).subscribe((code) => (this.code = code));

    this.data$ = <Observable<ListingModel>>this.queryParams$.pipe(
      withLatestFrom(this.code$),
      tap(([queryParams, code]) =>
        this.orgUnitsService.loadUsers(
          code,
          this.APPROVERS_ROLE_ID,
          queryParams
        )
      ),
      switchMap(([queryParams, code]) =>
        this.orgUnitsService
          .getUsers(code, this.APPROVERS_ROLE_ID, queryParams)
          .pipe(
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
              })),
            }))
          )
      )
    );
  }

  assign({ row }) {
    this.orgUnitsService.assignApprover(
      this.code,
      row.email,
      this.APPROVERS_ROLE_ID
    );
  }

  unassign({ row }) {
    this.orgUnitsService.unassignApprover(
      this.code,
      row.email,
      this.APPROVERS_ROLE_ID
    );
  }
}
