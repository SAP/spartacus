import { Component, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { Store } from '@ngrx/store';
import * as fromStore from './../../store';
import { tap } from 'rxjs/operators';
import { UserToken } from './../../models/token-types.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'y-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnDestroy {
  public username: string;
  public password: string;
  public rememberMe: Boolean;

  private tokenSubscription: Subscription;
  private userSubscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private store: Store<fromStore.UserState>
  ) {
    this.username = 'tobiasouwejan@gmail.com';
    this.password = '1234';
  }

  login() {
    this.tokenSubscription = this.store
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
          this.userSubscription = this.store
            .select(fromStore.getDetails)
            .pipe(
              tap((details: any) => {
                if (Object.keys(details).length === 0) {
                  this.store.dispatch(
                    new fromStore.LoadUserDetails(this.username)
                  );
                }
              })
            )
            .subscribe();
          this.dialogRef.close();
        }
      });
  }

  cancel() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if (this.tokenSubscription) {
      this.tokenSubscription.unsubscribe();
    }

    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
