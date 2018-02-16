import { Component, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { Store } from '@ngrx/store';
import * as fromStore from './../../store';
import { tap } from 'rxjs/operators';
import { UserToken } from './../../models/token-types.model';
import { Subscription } from 'rxjs/Subscription';
import { OccUserService } from '../../../newocc/user/user.service';

@Component({
  selector: 'y-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnDestroy {
  public username: string;
  public password: string;
  public rememberMe: Boolean;

  private subscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private userService: OccUserService,
    private store: Store<fromStore.UserState>
  ) {
    this.username = 'tobiasouwejan@gmail.com';
    this.password = '1234';
  }

  login() {
    this.subscription = this.store
      .select(fromStore.getUserToken)
      .pipe(
        tap((token: UserToken) => {
          if (Object.keys(token).length === 0) {
            this.store.dispatch(
              new fromStore.LoadUserToken({
                username: this.username,
                password: this.password
              })
            );
          }
        })
      )
      .subscribe((token: UserToken) => {
        if (token.access_token) {
          this.dialogRef.close();
        }
      });
  }

  cancel() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
