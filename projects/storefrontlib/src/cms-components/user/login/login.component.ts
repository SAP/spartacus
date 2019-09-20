import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import {
  AuthService,
  User,
  UserService,
  RoutingService,
  RoutingConfigService,
} from '@spartacus/core';
import { Observable, of, Subscription, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  user$: Observable<User>;
  hidden: BehaviorSubject<boolean> = new BehaviorSubject(false);

  subscription: Subscription;

  constructor(
    auth: AuthService,
    userService: UserService,
    routingService: RoutingService, // tslint:disable-line
    routingConfigService: RoutingConfigService
  );
  /**
   * @deprecated since 1.x
   * NOTE: check issue:#4155 for more info
   *
   * TODO(issue:#4155) Deprecated since 1.x
   */
  constructor(auth: AuthService, userService: UserService);
  constructor(
    private auth: AuthService,
    private userService: UserService,
    private routingService?: RoutingService,
    private routingConfigService?: RoutingConfigService
  ) {}

  ngOnInit(): void {
    this.user$ = this.auth.getUserToken().pipe(
      switchMap(token => {
        if (token && !!token.access_token) {
          return this.userService.get();
        } else {
          return of(undefined);
        }
      })
    );

    const checkoutPath =
      '/' + this.routingConfigService.getRouteConfig('checkout').paths[0] + '/';

    this.subscription = this.routingService
      .getRouterState()
      .subscribe(routerState => {
        if (routerState.state.context.id.includes(checkoutPath)) {
          this.hidden.next(true);
        } else {
          this.hidden.next(false);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
