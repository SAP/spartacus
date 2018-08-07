import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../store';
import { tap, map, take, filter } from 'rxjs/operators';
import { UserToken } from '../../../models/token-types.model';
import * as fromRouting from '../../../../routing/store';

@Component({
  selector: 'y-login-header-slot',
  templateUrl: './login-header-slot.component.html',
  styleUrls: ['./login-header-slot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginHeaderSlotComponent implements OnInit, OnDestroy {
  user$: Observable<any> = this.store.select(fromStore.getDetails);
  isLogin = false;

  username: string;
  password: string;
  rememberMe: boolean;

  subscription: Subscription;

  constructor(private store: Store<fromStore.UserState>) {}

  ngOnInit() {
    this.subscription = this.store
      .select(fromStore.getUserToken)
      .pipe(
        filter((token: UserToken) => !this.isLogin),
        tap((token: UserToken) => {
          if (token.access_token !== undefined) {
            this.isLogin = true;
            this.store.dispatch(new fromStore.LoadUserDetails(token.userId));
            this.store.dispatch(new fromStore.Login());
          }
        })
      )
      .subscribe();
  }

  logout() {
    this.isLogin = false;
    this.store.dispatch(new fromStore.Logout());

    this.store
      .select(fromRouting.getRouterState)
      .pipe(
        filter(routerState => routerState !== undefined),
        map(routerState => routerState.state.context),
        take(1)
      )
      .subscribe(pageContext => {
        if (pageContext.id === 'multiStepCheckoutSummaryPage') {
          this.store.dispatch(
            new fromRouting.Go({
              path: ['']
            })
          );
        }
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
