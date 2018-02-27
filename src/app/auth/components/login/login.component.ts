import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { Store } from '@ngrx/store';
import * as fromStore from './../../store';
import { tap, filter, take } from 'rxjs/operators';
import { PageContext } from '../../../routing/models/page-context.model';
import * as fromRouting from '../../../routing/store';

import * as fromCartStore from './../../../cart/store';
import { Cart } from '../../../cart/models/cart-types.model';
import { UserToken } from '../../models/token-types.model';

@Component({
  selector: 'y-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
  user$ = this.store.select(fromStore.getDetails);
  isLogin = false;

  username: string;
  password: string;
  rememberMe: boolean;

  pageContext: PageContext;
  subscription: Subscription;
  routerSub: Subscription;
  cartSubscription: Subscription;

  cart: Cart; // temporarly, will be removed

  constructor(
    protected dialog: MatDialog,
    private store: Store<fromStore.UserState>,
    private cartStore: Store<fromCartStore.CartState>
  ) {
    this.routerSub = this.store
      .select(fromRouting.getRouterState)
      .filter(routerState => routerState !== undefined)
      .subscribe(routerState => (this.pageContext = routerState.state.context));
  }

  ngOnInit() {}

  openLogin() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      data: {
        username: this.username,
        password: this.password,
        rememberMe: this.rememberMe
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.username = result.username;
      this.password = result.password;
      this.rememberMe = result.rememberMe;

      if (this.username !== undefined && this.password !== undefined) {
        this.login();
      }
    });
  }

  logout() {
    this.isLogin = false;
    if (this.pageContext !== undefined) {
      this.store.dispatch(new fromStore.Logout(this.pageContext));
    }
  }

  login() {
    this.subscription = this.store
      .select(fromStore.getUserToken)
      .pipe(
        tap((token: UserToken) => {
          if (token.access_token === undefined) {
            this.store.dispatch(
              new fromStore.LoadUserToken({
                userId: this.username,
                password: this.password
              })
            );
          } else {
            this.isLogin = true;
            this.store.dispatch(new fromStore.LoadUserDetails(this.username));
            if (this.pageContext !== undefined) {
              this.store.dispatch(new fromStore.Login(this.pageContext));
            }

            this.checkCartStore();
          }
        }),
        filter(() => this.isLogin),
        take(1)
      )
      .subscribe();
  }

  checkCartStore() {
    this.cartSubscription = this.cartStore
      .select(fromCartStore.getCartContentState)
      .pipe(
        tap((cart: Cart) => {
          if (cart.guid === undefined) {
            this.cartStore.dispatch(
              new fromCartStore.CreateCart(this.username)
            );
          }
        })
      )
      .subscribe((cart: Cart) => (this.cart = cart));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
