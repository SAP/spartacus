import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';

import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { Store } from '@ngrx/store';
import * as fromStore from './../../store';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { UserToken } from '../../models/token-types.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'y-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  user$: Observable<any>;

  private subscription: Subscription;

  constructor(
    protected dialog: MatDialog,
    private store: Store<fromStore.UserState>
  ) {}

  ngOnInit() {
    this.user$ = this.store.select(fromStore.getDetails);
  }

  login(user) {
    this.subscription = this.store
      .select(fromStore.getUserToken)
      .subscribe((token: UserToken) => {
        if (token.access_token === undefined) {
          this.store.dispatch(
            new fromStore.LoadUserToken({
              username: user.name,
              password: user.pass
            })
          );
        } else {
          user.ref.close();
          this.store.dispatch(new fromStore.LoadUserDetails(user.name));
        }
      });
  }

  openLogin() {
    this.dialog.open(LoginDialogComponent);
  }

  logout() {
    this.store.dispatch(new fromStore.Logout());
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
