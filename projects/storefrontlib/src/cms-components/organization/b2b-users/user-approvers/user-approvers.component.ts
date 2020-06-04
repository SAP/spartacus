import { Component, OnInit } from '@angular/core';
import {
  B2BUser,
  B2BUserService,
  EntitiesModel,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
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
  selector: 'cx-user-approvers',
  templateUrl: './user-approvers.component.html',
})
export class UserApproversComponent extends AbstractListingComponent
  implements OnInit {
  code: string;
  cxRoute = 'userApprovers';
  //uid$: Observable<string>;

  constructor(
    protected routingService: RoutingService,
    protected userService: B2BUserService
  ) {
    super(routingService);
  }

  ngOnInit(): void {
    this.code$.pipe(take(1)).subscribe((code) => (this.code = code));

    /*this.uid$ = <Observable<string>>(
      this.code$.pipe(
        switchMap((code) =>
          this.userService.get(code).pipe(map((user: B2BUser) => user.uid))
        )
      )
    );*/

    this.data$ = <Observable<ListingModel>>this.queryParamsForAllItems$.pipe(
      withLatestFrom(this.code$),
      tap(([queryParams, code]) =>
        this.userService.loadB2BUserApprovers(code, queryParams)
      ),
      switchMap(([queryParams, code]) =>
        this.userService.getB2BUserApprovers(code, queryParams).pipe(
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
}
