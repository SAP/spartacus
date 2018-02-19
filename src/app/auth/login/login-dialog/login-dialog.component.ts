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
    if (this.tokenSubscription !== undefined) {
      this.tokenSubscription.unsubscribe();
    }

    // if (this.userSubscription !== undefined) {
    //   this.userSubscription.unsubscribe();
    // }

    this.username = 'tobiasouwejan@gmail.com';
    this.password = '1234';
  }

  saveToken() {
    this.tokenSubscription = this.store
      .select(fromStore.getUserToken)
      .subscribe((token: UserToken) => {
        if (token.access_token === undefined) {
          this.store.dispatch(
            new fromStore.LoadUserToken({
              username: this.username,
              password: this.password
            })
          );
        }
        this.store.dispatch(new fromStore.LoadUserDetails(this.username));
        this.dialogRef.close();
      });
  }

  saveUserDetails() {
    this.userSubscription = this.store
      .select(fromStore.getDetails)
      .subscribe((details: any) => {
        if (details.name === undefined || Object.keys(details).length === 0) {
          this.store.dispatch(new fromStore.LoadUserDetails(this.username));
        }
      });
  }

  login() {
    this.saveToken();
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
