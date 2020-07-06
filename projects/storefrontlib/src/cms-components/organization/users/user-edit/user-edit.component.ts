import { Component, OnInit } from '@angular/core';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { B2BUser, B2BUserService, RoutingService } from '@spartacus/core';

@Component({
  selector: 'cx-user-edit',
  templateUrl: './user-edit.component.html',
})
export class B2BUserEditComponent implements OnInit {
  b2bUser$: Observable<B2BUser>;
  b2bUserCode$: Observable<string> = this.routingService
    .getRouterState()
    .pipe(map((routingData) => routingData.state.params['code']));

  constructor(
    protected routingService: RoutingService,
    protected b2bUsersService: B2BUserService
  ) {}

  ngOnInit(): void {
    this.b2bUser$ = this.b2bUserCode$.pipe(
      tap((code) => this.b2bUsersService.loadB2BUser(code)),
      switchMap((code) => this.b2bUsersService.get(code))
    );
  }

  updateB2BUser(b2bUser: B2BUser) {
    this.b2bUserCode$.pipe(take(1)).subscribe((customerId) => {
      this.b2bUsersService.update(customerId, b2bUser);
      this.routingService.go({
        cxRoute: 'userDetails',
        params: { customerId },
      });
    });
  }
}
