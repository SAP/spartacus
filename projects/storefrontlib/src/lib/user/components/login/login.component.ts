import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { tap, map, take, filter } from 'rxjs/operators';

import * as fromStore from './../../store';
import * as fromRouting from '../../../routing/store';
import { UserToken } from '../../models/token-types.model';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';

@Component({
  selector: 'y-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
  user$: Observable<any>;
  username: string;
  rememberMe: boolean;

  subscription: Subscription;

  constructor(
    protected dialog: MatDialog,
    private store: Store<fromStore.UserState>
  ) {}

  ngOnInit() {
    this.user$ = this.store.select(fromStore.getDetails);

    this.store
      .select(fromStore.getUserToken)
      .pipe(
        filter((token: UserToken) => this.username !== token.userId),
        tap((token: UserToken) => {
          if (token.access_token !== undefined) {
            this.username = token.userId;
            this.store.dispatch(new fromStore.LoadUserDetails(token.userId));
            this.store.dispatch(new fromStore.Login());
          } else {
            this.username = '';
          }
        })
      )
      .subscribe();
  }

  openLogin() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      data: {
        username: '',
        password: '',
        rememberMe: ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.rememberMe = result.rememberMe;

      if (result.username !== undefined && result.username !== undefined) {
        this.login(result.username, result.password);
      }
    });
  }

  logout() {
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

  login(username: string, password: string) {
    this.store.dispatch(
      new fromStore.LoadUserToken({
        userId: username,
        password: password
      })
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
