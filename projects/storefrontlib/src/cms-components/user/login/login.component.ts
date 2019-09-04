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
    private auth: AuthService,
    private userService: UserService,
    private routingService: RoutingService
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

    this.subscription = this.routingService
      .getRouterState()
      .subscribe(routerState => {
        if (routerState.state.context.id.indexOf('/checkout/') !== -1) {
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
