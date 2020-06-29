import { ICON_TYPE } from './../../../misc/icon/icon.model';
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
  selector: 'cx-unit-approvers',
  templateUrl: './unit-approvers.component.html',
})
export class UnitApproversComponent extends AbstractListingComponent
  implements OnInit {
  code: string;
  cxRoute = 'orgUnitApprovers';
  ICON_TYPE = ICON_TYPE;

  constructor(
    protected routingService: RoutingService,
    protected orgUnitsService: OrgUnitService
  ) {
    super(routingService);
  }

  protected readonly APPROVERS_ROLE_ID = 'b2bapprovergroup';

  ngOnInit(): void {
    this.code$.pipe(take(1)).subscribe((code) => (this.code = code));

    this.data$ = <Observable<ListingModel>>this.queryParamsForAllItems$.pipe(
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
              values: userList.values
                .filter((user) => user.selected)
                .map((user) => ({
                  email: user.uid,
                  name: user.name,
                  roles: user.roles,
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
        this.orgUnitsService.unassignApprover(
          code,
          row.customerId,
          this.APPROVERS_ROLE_ID
        )
      );
  }
}
