import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { RoutingService, B2BUser, B2BUserService } from '@spartacus/core';

@Component({
  selector: 'cx-b2b-user-details',
  templateUrl: './b2b-user-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class B2BUserDetailsComponent implements OnInit {
  b2bUser$: Observable<B2BUser>;
  b2bUserCode$: Observable<
    string
  > = this.routingService
    .getRouterState()
    .pipe(map(routingData => routingData.state.params['code']));

  constructor(
    protected routingService: RoutingService,
    protected b2bUsersService: B2BUserService
  ) {}

  ngOnInit(): void {
    this.b2bUser$ = this.b2bUserCode$.pipe(
      tap(code => this.b2bUsersService.loadB2BUser(code)),
      switchMap(code => this.b2bUsersService.get(code)),
      filter(Boolean),
      map((b2bUser: B2BUser) => ({
        ...b2bUser,
        code: b2bUser.uid,
      }))
    );
  }
}
